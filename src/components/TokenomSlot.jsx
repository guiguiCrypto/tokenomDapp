import React, { useEffect, useState } from 'react';
import TokenomContractCall from './utils/BlockchainCall.jsx';
import { Link } from 'react-router-dom';


function TokenomSlot(props) {

    const [tokenom, setTokenom] = useState(null)
    const [uri, setUri] = useState("")

    useEffect(() => {
        const updateTokenomData = async () => {
            let tokenom = await TokenomContractCall("tokenomStats", [props.tokenomId])
            let tokenomURI = await TokenomContractCall("tokenURI", [props.tokenomId])
    
            setTokenom(tokenom);
            setUri(tokenomURI);
        }
        if (props.tokenomId != null) {
            updateTokenomData();
        }
    }, [props.tokenomId])

    return <div className="h-full">
        {(tokenom != null)
            ?
            (<><div className='grid grid-cols-2'>
                <img className='tokenomImage w-[50%] m-auto' alt='tokenom' src={"https://ipfs.io/" + uri}></img>
                <div className='text-left my-auto'>
                    <h1>name : {tokenom.name} </h1>
                    <p>level : {tokenom.level}</p>
                    <p>LifePoint : {tokenom.maxLifePoint}</p>
                </div>
            </div>
                <FightLink tokenom={tokenom} tokenomId={props.tokenomId}></FightLink>
            </>)
            :
            (<>
                <h1>this slot is empty, you can mint a new tokenom</h1>
            </>)
        }
    </div>
}

export default TokenomSlot;

function FightLink(props) {
    const link = <Link className='hover:cursor-crosshair' to={"/fight/" + props.tokenomId + "/" + props.tokenom.versusId}><strong>here</strong></Link>

    const [isTurn, setIsTurn] = useState(false);

    useEffect(() => {
        function updateTurn() {
            TokenomContractCall("attackCooldown", []).then((cooldown) => {
                let secondesSinceLastAttack = (Math.floor(Date.now() / 1000) - props.tokenom.lastAttack)
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