import React, { useState, useEffect } from 'react';
import TokenomContractCall from '../utils/BlockchainCall.jsx';
import AllyFightingCard from '../AllyFightingCard.jsx';
import Alert from '@mui/material/Alert';

function FightPage(props) {

    const [allyTokenom, setAllyTokenom] = useState(null);
    const [ennemyTokenom, setEnnemyTokenom] = useState(null);

    useEffect(() => {
        const retrieveAllyTokenomData = async () => {
            let allyData = await TokenomContractCall("tokenomStats", [props.id]);

            setAllyTokenom(allyData);
        }
        const retrieveEnnemyTokenomData = async () => {
            let ennemyData = await TokenomContractCall("tokenomStats", [props.vsId]);

            setEnnemyTokenom(ennemyData);
        }
        retrieveAllyTokenomData();
        retrieveEnnemyTokenomData();
    }, [props.id, props.vsId]);

    return <>
        {(allyTokenom != null && !allyTokenom.isFighting)
            ?
            <Alert variant="filled" severity="warning">Your Tokenom is not in a fight - Click here to find an <a href={'/'}><strong>opponent</strong></a></Alert>
            :
            (allyTokenom != null && allyTokenom.versusId.toNumber() !== parseInt(props.vsId))
                ?
                <Alert variant="filled" severity="warning">Your tokenom is fighting another tokenom - Click here to go the good <a href={'/fight/' + props.id + '/' + allyTokenom.versusId} ><strong>Fight</strong></a></Alert>
                :
                <></>
        }
        <div className='fightGrid h-full p-2'>
            <div className='p-3' >
                {(allyTokenom != null)
                        ?
                        (<>
                            <AllyFightingCard tokenom={allyTokenom} tokenomId={props.id} ally={true}></AllyFightingCard>
                        </>)
                        :
                        (<>
                            <h1>loading</h1>
                        </>)
                }
            </div>
            <div className='p-3'>
                {(ennemyTokenom != null)
                        ?
                        (<>
                            <AllyFightingCard tokenom={ennemyTokenom} tokenomId={props.vsId} ally={false}></AllyFightingCard>
                        </>)
                        :
                        (<>
                            <h1>loading</h1>
                        </>)
                }
            </div>
        </div>
    </>
}
export default FightPage;