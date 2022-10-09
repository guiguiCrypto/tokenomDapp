import React, { Component, useEffect, useState } from 'react';
import TokenomContractCall from './utils/BlockchainCall.jsx';
import { Link } from 'react-router-dom';


export class TokenomSlot extends Component {

    constructor(props) {
        super(props);
        this.state = {
            tokenomId: props.tokenomId,
            tokenom: null,
            uri: ""
        }
    }

    componentDidMount = () => {
        if (this.state.tokenomId != null) {
            this.updateTokenomData();
        }
    }

    updateTokenomData = async () => {
        let tokenom = await TokenomContractCall("tokenomStats", [this.state.tokenomId])
        let tokenomURI = await TokenomContractCall("tokenURI", [this.state.tokenomId])

        this.setState({
            tokenom: tokenom,
            uri: tokenomURI
        });
    }

    render() {
        return (
            <div className="h-full">
                {
                    (this.state.tokenom != null)
                        ?
                        (<><div className='grid grid-cols-2'>
                            <img className='tokenomImage w-[50%] m-auto' alt='tokenom' src={"https://ipfs.io/" + this.state.uri}></img>
                            <div className='text-left my-auto'>
                                <h1>name : {this.state.tokenom.name} </h1>
                                <p>level : {this.state.tokenom.level}</p>
                                <p>LifePoint : {this.state.tokenom.maxLifePoint}</p>
                            </div>
                        </div>
                            <FightLink tokenom={this.state.tokenom} tokenomId={this.state.tokenomId}></FightLink>
                        </>)
                        :
                        (<>
                            <h1>this slot is empty, you can mint a new tokenom</h1>
                        </>)

                }
            </div>

        );
    }

}

function FightLink(props) {
    const link = <Link className='hover:cursor-crosshair' to={"/fight/" + props.tokenomId + "/" + props.tokenom.versusId}><strong>here</strong></Link>

    const [isTurn, setIsTurn] = useState(false);

    useEffect(() => {
        function updateTurn () {
            TokenomContractCall("attackCooldown", []).then((cooldown) => {
                let secondesSinceLastAttack = (Math.floor(Date.now() / 1000) - props.tokenom.lastAttack)
                console.log(secondesSinceLastAttack)
                if (!props.tokenom.cooldown) {
                    setIsTurn(true);
                }
                else setIsTurn(secondesSinceLastAttack > cooldown.toNumber());
            })
        }
        updateTurn();

        const timer = setTimeout(() => {
            updateTurn();
        }, 60000);
        return () => clearTimeout(timer);
    }, [props])


    if (props.tokenom.isFighting) {

        if (!isTurn) {
            return <p>Currently fighting but attack in cooldown : see fight {link}</p>
        }
        else return <p>Currently fighting and its your turn to attack : see fight {link}</p>
    }
    return <></>
}