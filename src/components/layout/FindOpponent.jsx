import React, {useState} from 'react';
import OpponentList from '../OpponentList';
import StartFight from '../StartFight';
import refresh from '../../images/refresh.svg'

function FindOpponent() {

    const [render, setRender] = useState(false);

    return <div>
        <section className="layout">
            <div className='h-20' style={{ display: "block" }}>
                <button className="float-right" onClick={() => setRender(!render)}>
                    <img className='w-[5vh] m-[2vh] hover:w-[7vh] hover:m-[1vh]' src={refresh} alt="refreshButton"></img>
                </button>
                <h1 className='text-xl mb-5 ml-5'>
                    Select an opponent
                </h1>
            </div>
            <div>
                <OpponentList key={render}></OpponentList>
            </div>
            <div className='px-5'>
                <StartFight></StartFight>
            </div>
        </section>
    </div>

}
 export default FindOpponent;