import React, { useContext, useEffect, useState } from 'react';
import TokenomContractCall from './utils/BlockchainCall.jsx'

import OpponentCard from './OpponentCard.jsx';
import BattleDataContext from './BattleDataContext.jsx';


function OpponentList() {

    const context = useContext(BattleDataContext);

    const [potentialsOpponentsList, setPotentialsOpponentsList] = useState([])
    const [selectedOpponent, setSelectedOpponent] = useState(null)

    useEffect(() => {
        const findPotentialsOpponents = async () => {

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
            setPotentialsOpponentsList(potentialsOpponentsStats)
        }
        findPotentialsOpponents();
    }, [])



    const selectTokenomHandler = async (id) => {
        const { setSelectedEnnemy } = context;

        setSelectedEnnemy(potentialsOpponentsList[id].tokenomId);
        if (id === selectedOpponent) {
            id = null;
            setSelectedEnnemy(null);
        }

        setSelectedOpponent(id);
    }
    return <div className='h-full grid grid-rows-3 grid-flow-col gap-4 p-5'>
            {potentialsOpponentsList.map((opponent, i) => (
                <button key={opponent.tokenomId} className='card rounded' onClick={() => selectTokenomHandler(i)}>
                    <OpponentCard key={i} tokenom={opponent} selected={selectedOpponent === i ? true : false}></OpponentCard>
                </button>
            ))}
        </div>
    
}
export default OpponentList;