import React, { Component } from 'react';
import * as Constants from './Constants.jsx';
import { ethers } from 'ethers';



export class AttackButton extends Component {

    constructor(props) {
        super(props);
        this.state = {
            attackData: null,
        }
    }

    componentDidMount = () => {
        this.retrieveAttackData();
    }

    retrieveAttackData = async () => {
        try {
            const { ethereum } = window;

            if (ethereum) {
                const provider = new ethers.providers.Web3Provider(ethereum);
                const signer = provider.getSigner();
                const tokenContract = new ethers.Contract(Constants.TOKENOMADRESS, Constants.TOKENOMABI, signer);

                let attackData = await tokenContract.getTokenomAttack(this.props.tokenomId, this.props.attackId);
                console.log(attackData)

                this.setState({
                    attackData: attackData
                })
            } else {
                console.log("Ethereum object does not exist");
            }

        } catch (err) {

            console.log(err.reason);
        }
    }

    throwAttack = async () => {
        try {
            const { ethereum } = window;

            if (ethereum) {
                const provider = new ethers.providers.Web3Provider(ethereum);
                const signer = provider.getSigner();
                const tokenContract = new ethers.Contract(Constants.TOKENOMADRESS, Constants.TOKENOMABI, signer);

                await tokenContract.attack(this.props.tokenomId, this.props.attackId);

            } else {
                console.log("Ethereum object does not exist");
            }

        } catch (err) {

            alert(err.reason);
        }
    }



    render() {
        return (
            <>
                {(this.state.attackData != null)
                    ?
                    <button className='attackButton' disabled={this.props.disabled} onClick={this.throwAttack}>
                        name : {this.state.attackData.name}
                        <br/>
                        dmg: {this.state.attackData.damage.toNumber()}
                        <br/>
                        precision: {this.state.attackData.precision.toNumber()} %
                    </button>
                    :
                    < button className='attackButton' disabled >
                        Not learned yet
                    </button>
                }
            </>

        )
    }
}