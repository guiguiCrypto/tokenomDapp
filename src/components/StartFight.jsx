import React, { Component } from 'react';
import BattleDataContext from './BattleDataContext.jsx';
import TokenomContractCall from './utils/BlockchainCall.jsx';

export class StartFight extends Component {

    static contextType = BattleDataContext

    constructor(props) {
        super(props);
        this.state = {
            selectedAlly: null,
            selectedEnnemy: null
        }
    }

    getBattleData = async () => {
        const battleData = this.context

        this.setState({
            selectedAlly: battleData.selectedAlly,
            selectedEnnemy: battleData.selectedEnnemy
        })
    }

    componentDidMount() {
        // set Interval
        this.interval = setInterval(this.getBattleData, 500);
    }

    componentWillUnmount() {
        // Clear the interval right before component unmount
        clearInterval(this.interval);
    }

    startFight = async () => {
        let tokenTxn = await TokenomContractCall("startBattle", [this.state.selectedAlly, this.state.selectedEnnemy]);

        await tokenTxn.wait();

        window.location.reload(false);
    }

render() {
    return (
        <button className="bg-red-600 w-full h-[10vh] disabled:bg-red-900 hover:bg-red-700" variant="contained" onClick={this.startFight} disabled={!(this.state.selectedAlly !== null && this.state.selectedEnnemy !== null && this.state.selectedAlly !== this.state.selectedEnnemy)}> &#9876; Fight ! &#9876; </button>
    )
}
}