import React, { Component } from 'react';
import fight from '../images/fight.svg';
import TokenomContractCall from './utils/BlockchainCall.jsx';



export class Timer extends Component {


    constructor(props) {
        super(props);
        this.state = {
            lastAttack: null,
            attackReady: false,
            baseCooldown: 3600
        }
    }


    componentDidMount = () => {
        this.timer = setInterval(
            this.updateTimer,
            1000,
        );

        TokenomContractCall("attackCooldown", []).then((result) => {
            this.setState({ baseCooldown : result})
        });
    }

    updateTimer = () => {

        let secondesSinceLastAttack = (Math.floor(Date.now() / 1000) - this.props.lastAttack)


        if (secondesSinceLastAttack > this.state.baseCooldown) {
            this.setState({ attackReady: true })
            clearInterval(this.timer);
        }

        this.setState({
            lastAttack: this.state.baseCooldown - secondesSinceLastAttack
        })
    }

    componentWillUnmount = () => {
        clearInterval(this.timer);
    }


    render() {
        return (
            <>
                {(this.state.attackReady)
                    ?
                    <>
                        <img className="w-[10%] inline " src={fight} alt="" /><h1 className='inline'>Attack Ready</h1>
                    </>

                    :
                    <h1>Attack ready in : {Math.floor(this.state.lastAttack / 60)}min : {Math.floor(this.state.lastAttack % 60)} sec </h1>
                }
            </>

        )
    }
}
