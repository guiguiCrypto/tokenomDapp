import React, { Component } from 'react';
import TokenomContractCall from './utils/BlockchainCall.jsx'

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

        let supply = await TokenomContractCall("totalSupply", []);

        let potentialsOpponentsIds = [];

        while (potentialsOpponentsIds.length < 9 && potentialsOpponentsIds.length < supply) {
            let value = Math.floor(Math.random() * supply + 1);
            if (potentialsOpponentsIds.find(element => element === value) === undefined) {
                potentialsOpponentsIds.push(value);
            }
        }

        let potentialsOpponentsStats = [];
        for (const id of potentialsOpponentsIds) {
            let tokenomStats = await TokenomContractCall("tokenomStats", [id]);
            let tokenomURI = await TokenomContractCall("tokenURI", [id]);
            tokenomStats = Object.assign({}, tokenomStats, { uri: tokenomURI })
            const tokenomStatsWithId = Object.assign({ tokenomId: id }, tokenomStats);
            potentialsOpponentsStats.push(tokenomStatsWithId);
        }

        this.setState({
            potentialsOpponentsIds: potentialsOpponentsIds,
            potentialsOpponentsList: potentialsOpponentsStats
        });

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