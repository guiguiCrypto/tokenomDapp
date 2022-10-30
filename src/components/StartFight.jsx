import React, { useContext, useEffect, useState } from 'react';
import BattleDataContext from './BattleDataContext.jsx';
import TokenomContractCall from './utils/BlockchainCall.jsx';

function StartFight() {

    const context = useContext(BattleDataContext);

    const [selectedAlly, setSelectedAlly] = useState(null);
    const [selectedEnnemy, setSelectedEnnemy] = useState(null);

    useEffect(() => {
        const getBattleData = async () => {
            const battleData = context

            setSelectedAlly(battleData.selectedAlly)
            setSelectedEnnemy(battleData.selectedEnnemy)
        }
        getBattleData();
    }, [context])

    const startBattle = async () => {
        let tokenTxn = await TokenomContractCall("startBattle", [selectedAlly, selectedEnnemy]);

        await tokenTxn.wait();

        window.location.reload(false);
    }

    return <button className="bg-red-600 w-full h-[10vh] disabled:bg-red-900 hover:bg-red-700" variant="contained" onClick={startBattle} disabled={!(selectedAlly !== null && selectedEnnemy !== null && selectedAlly !== selectedEnnemy)}> &#9876; Fight ! &#9876; </button>
}
export default StartFight;