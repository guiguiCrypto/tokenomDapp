import React, { Component } from 'react';
import BattleDataContext from './BattleDataContext.jsx';
import * as Constants from './Constants.jsx';
import { ethers } from 'ethers';
import { Link} from 'react-router-dom'

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
        try {
            const { ethereum } = window;

            if (ethereum) {
                const provider = new ethers.providers.Web3Provider(ethereum);
                const signer = provider.getSigner();
                const tokenContract = new ethers.Contract(Constants.TOKENOMADRESS, Constants.TOKENOMABI, signer);

                let tokenTxn = await tokenContract.startBattle(this.state.selectedAlly, this.state.selectedEnnemy);

                console.log("waiting for tx");
                await tokenTxn.wait();

                alert(<p>Battle started, go to the <Link to={"fight/" + this.state.selectedAlly +"/" + this.state.selectedEnnemy}>the Fight page</Link></p>)


            } else {
                console.log("Ethereum object does not exist");
            }

        } catch (err) {
            alert(err.data.message.split("revert")[1]);
        }
    }

    render () {
        return(
            <button className="bg-red-600 w-full h-[10vh] disabled:bg-red-900 hover:bg-red-700" variant="contained" onClick={this.startFight} disabled={!(this.state.selectedAlly !== null && this.state.selectedEnnemy !== null && this.state.selectedAlly !== this.state.selectedEnnemy)}> &#9876; Fight ! &#9876; </button>
        )
    }
}