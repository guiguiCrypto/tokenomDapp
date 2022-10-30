import React, { useState, useEffect } from 'react';
import { LinearProgress } from '@mui/material';
import Timer from './Timer.jsx'
import AttackButton from './AttackButton';
import TokenomContractCall from './utils/BlockchainCall.jsx';


function FightingCard(props) {

    const [url, setUrl] = useState("");
    const [attackCooldown, setAttackCooldown] = useState(3600);

    useEffect(() => {
        const updateAttackCoolown = async () => {
            const baseCooldown = await TokenomContractCall("attackCooldown", []);
    
            setAttackCooldown(baseCooldown);
        }
        const updateTokenomUrl = async () => {
            const tokenomURI = await TokenomContractCall("tokenURI", [props.tokenomId])
    
            setUrl(tokenomURI);
        }
        updateTokenomUrl();
        updateAttackCoolown();
    }, [props.tokenomId]);

    return (
        <div className={props.ally ? "bg-green-200 h-full p-[2%] grid grid-rows-2 grid-flow-col gap-4"  : "bg-red-200 h-full p-[2%] grid grid-rows-2 grid-flow-col gap-4"}>
            <div className='grid-cols-2'>
                <img src={"https://ipfs.io/" + url} style={{ transform: props.ally ? "scaleX(-1)" : "" }} alt='tokenom' className={props.ally ? "w-[40%] float-left" : "w-[40%] float-right"}></img>
                <div >
                    <h1 className='font-medium text-4xl'>Name :  {props.tokenom.name}</h1>
                </div>
                <div>
                    <h1 className='font-medium text-4xl my-[2%]'>Level :  {props.tokenom.level}</h1>
                </div>
                {
                    props.ally ?
                        <div className='mt-20'>
                            <Timer lastAttack={props.tokenom.lastAttack} baseCooldown={attackCooldown}></Timer>
                        </div>
                        :
                        <></>
                }

            </div>

            <div className="">
                <p className="text-right">{props.tokenom.lifePoint} / {props.tokenom.maxLifePoint} LP</p>
                <RenderSwitch percentageHp={(props.tokenom.lifePoint / props.tokenom.maxLifePoint * 100)} />

                <div className="grid grid-rows-2 grid-flow-col gap-2 pt-[10%] h-[90%]" >
                    <div className="attackColumn">
                        <AttackButton tokenomId={props.tokenomId} attackId={0} disabled={!props.ally}></AttackButton>
                        <AttackButton tokenomId={props.tokenomId} attackId={1} disabled={!props.ally}></AttackButton>
                    </div>
                    <div className="attackColumn">
                        <AttackButton tokenomId={props.tokenomId} attackId={2} disabled={!props.ally}></AttackButton>
                        <AttackButton tokenomId={props.tokenomId} attackId={3} disabled={!props.ally}></AttackButton>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default FightingCard;

function RenderSwitch(props) {
    if (props.percentageHp > 50) {
        return <LinearProgress variant="determinate" color="success" sx={{ height: "5%" }} value={props.percentageHp} />;
    }
    else if (props.percentageHp > 20) {
        return <LinearProgress variant="determinate" color="warning" sx={{ height: "5%" }} value={props.percentageHp} />;
    }
    else return <LinearProgress variant="determinate" color="error" sx={{ height: "5%" }} value={props.percentageHp} />;
}