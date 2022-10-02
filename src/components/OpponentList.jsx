import React, { Component } from 'react';
import * as Constants from './Constants.jsx';
import { ethers } from 'ethers';
import { OpponentCard } from './OpponentCard.jsx';
import BattleDataContext from './BattleDataContext.jsx';


export class OpponentList extends Component {

    static contextType = BattleDataContext

    constructor(props) {
        super(props);
        this.state = {
            potentialsOpponentsList: [],
            selectedOpponent: null,
            potentialsOpponentsIds: []
        }
    }



    componentDidMount = () => {
        this.findPotentialsOpponents();
    }

    findPotentialsOpponents = async () => {
        try {
            const { ethereum } = window;

            if (ethereum) {
                const provider = new ethers.providers.Web3Provider(ethereum);
                const signer = provider.getSigner();
                const tokenContract = new ethers.Contract(Constants.TOKENOMADRESS, Constants.TOKENOMABI, signer);

                let supply = await tokenContract.totalSupply();

                let potentialsOpponentsIds = [];

                while (potentialsOpponentsIds.length < 9 && potentialsOpponentsIds.length < supply) {
                    let value = Math.floor(Math.random() * supply + 1);
                    if (potentialsOpponentsIds.find(element => element === value) === undefined) {
                        potentialsOpponentsIds.push(value);
                    }
                }

                let potentialsOpponentsStats = [];
                for (const id of potentialsOpponentsIds) {
                    let tokenomStats = await tokenContract.tokenomStats(id);
                    let tokenomURI = await tokenContract.tokenURI(id);
                    tokenomStats = Object.assign({}, tokenomStats, {uri: tokenomURI})
                    const tokenomStatsWithId = Object.assign({ tokenomId: id }, tokenomStats);
                    potentialsOpponentsStats.push(tokenomStatsWithId);
                }

                this.setState({
                    potentialsOpponentsIds: potentialsOpponentsIds,
                    potentialsOpponentsList: potentialsOpponentsStats
                });

            } else {
                console.log("Ethereum object does not exist");
            }

        } catch (err) {
            console.log(err);
        }
    }

    selectTokenomHandler = async (id) => {
        const { setSelectedEnnemy } = this.context

        setSelectedEnnemy(this.state.potentialsOpponentsList[id].tokenomId);
        if (id === this.state.selectedOpponent) {
            id = null;
            setSelectedEnnemy(null);
        }

        this.setState({
            selectedOpponent: id
        })
    }

    render() {
        return (
            <div className='h-full grid grid-rows-3 grid-flow-col gap-4'>
                    {this.state.potentialsOpponentsList.map((opponent, i) => (
                        <button key={opponent.tokenomId} className='card rounded' onClick={() => this.selectTokenomHandler(i)}>
                            <OpponentCard key={i} tokenom={opponent} selected={this.state.selectedOpponent === i ? true : false}></OpponentCard>
                        </button>
                    ))}
            </div>
        )
    }
}