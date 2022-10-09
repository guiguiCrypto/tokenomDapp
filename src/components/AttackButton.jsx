import React, { Component } from 'react';
import TokenomContractCall from './utils/BlockchainCall.jsx'




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

        let attackData = await TokenomContractCall("getTokenomAttack", [this.props.tokenomId, this.props.attackId]);

        this.setState({
            attackData: attackData
        })
    }

    throwAttack = async () => {
        let tokenTxn = await TokenomContractCall("attack", [this.props.tokenomId, this.props.attackId]);

        await tokenTxn.wait();

        window.location.reload(false);
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