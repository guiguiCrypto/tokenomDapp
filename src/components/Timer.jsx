import React, { useState, useEffect } from 'react';
import fight from '../images/fight.svg';

function Timer(props) {

    const [lastAttack, setLastAttack] = useState(null);
    const [attackReady, setAttackReady] = useState(false);


    useEffect(() => {
        const updateTimer = () => {
            let secondesSinceLastAttack = (Math.floor(Date.now() / 1000) - props.lastAttack)

            if (secondesSinceLastAttack > props.baseCooldown) {
                setAttackReady(true);
                clearInterval(timer);
            }

            setLastAttack(props.baseCooldown - secondesSinceLastAttack);
        }
        const timer = setInterval(updateTimer, 1000);

        return () => clearInterval(timer);
    }, [props.lastAttack, props.baseCooldown])

    return <>
        {(attackReady)
            ?
            <div>
                <img className="w-[10%] inline " src={fight} alt="" /><h1 className='inline'>Attack Ready</h1>
            </div>
            :
            <h1>Attack ready in : {Math.floor(lastAttack / 60)}min : {Math.floor(lastAttack % 60)} sec </h1>
        }
    </>
}

export default Timer;