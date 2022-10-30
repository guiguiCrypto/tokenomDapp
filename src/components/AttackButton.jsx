import React, { useEffect, useState } from 'react';
import TokenomContractCall from './utils/BlockchainCall.jsx'



function AttackButton(props) {

    const [attackData, setAttackData] = useState(null);

    useEffect(() => {
        const retrieveAttackData = async () => {
            let attackData = await TokenomContractCall("getTokenomAttack", [props.tokenomId, props.attackId]);
    
            setAttackData(attackData);
        }
        retrieveAttackData();
    }, [props.tokenomId, props.attackId]);

    const throwAttack = async () => {
        let tokenTxn = await TokenomContractCall("attack", [props.tokenomId, props.attackId]);

        await tokenTxn.wait();
        window.location.reload(false);
    }

    return (
        <>
            {(attackData != null)
                ?
                <button className='attackButton' disabled={props.disabled} onClick={throwAttack}>
                    name : {attackData.name}
                    <br />
                    dmg: {attackData.damage.toNumber()}
                    <br />
                    precision: {attackData.precision.toNumber()} %
                </button>
                :
                < button className='attackButton' disabled >
                    Not learned yet
                </button>
            }
        </>

    )
}

export default AttackButton;