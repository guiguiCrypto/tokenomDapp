import React, { useEffect, useState, useContext } from 'react';
import TokenomContractCall from './utils/BlockchainCall.jsx';
import { ethers } from 'ethers';
import TokenomSlot from './TokenomSlot.jsx';
import MintButton from './MintButton.jsx';
import "../App.css";
import BattleDataContext from './BattleDataContext.jsx';


function TokenomTeam() {

    const context = useContext(BattleDataContext);


    const [ids, setIds] = useState([]);
    const [activeTokenom, setActiveTokenom] = useState(null);

    useEffect(() => {
        updateTokenomTeamData();
    }, [])

    const updateTokenomTeamData = async () => {
        const { ethereum } = window;

        if (ethereum) {
            let address = new ethers.providers.Web3Provider(ethereum).getSigner().getAddress();

            let tokenomIds = await TokenomContractCall("getTokenIds", [address])

            let normalTokenomIds = [...tokenomIds]
            for (let i = 0; i < tokenomIds.length; i++) {
                normalTokenomIds[i] = normalTokenomIds[i].toNumber();
            }

            while (normalTokenomIds.length < 6) {
                normalTokenomIds.push(null);
            }

            setIds(normalTokenomIds);
        }
    }

    const mintNftHandler = async (name) => {
        let tokenTxn = await TokenomContractCall("mint", [name]);

        await tokenTxn.wait();

        updateTokenomTeamData();
    }

    const selectTokenomHandler = async (id) => {
        const { setSelectedAlly } = context

        setSelectedAlly(ids[id]);
        if (id === activeTokenom) {
            id = null;
            setSelectedAlly(null);
        }

        setActiveTokenom(id);
    }

    return <>
        <h1 className='text-xl mb-5'>Select your Tokenom</h1>
        <div className='grid grid-rows-6 gap-4 pt-5'>
            {ids.map((id, index) => (
                (id != null)
                    ?
                    <button key={index} className='h-full card mx-5' onClick={() => selectTokenomHandler(index)} >
                        <div className={activeTokenom === index ? "bg-green-300 shadow-xl h-full" : "h-full"} >
                            <TokenomSlot tokenomId={id} ></TokenomSlot>
                        </div>
                    </button>
                    :
                    <div key={index} className="card h-full flex mx-5" >
                        <div className='my-auto ml-10'>
                            <h3 className='my-3'>this slot is empty, you can mint a new tokenom</h3>
                            <MintButton mintNftHandler={mintNftHandler}></MintButton>
                        </div>
                    </div>
            ))}
        </div>
    </>
}

export default TokenomTeam;