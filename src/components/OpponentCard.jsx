import React from 'react';



function OpponentCard(props) {

    return (
        <div className={props.selected ? "bg-red-300 shadow-xl h-full flex" : "h-full flex"}>
            <img className='w-[40%] float-left my-auto' alt='tokenom' src={"https://ipfs.io/" + props.tokenom.uri}></img>
            <div className='h-[50%] m-auto'>
                <h1>name : {props.tokenom.name}</h1>
                <p>level : {props.tokenom.level}</p>
                <p>LifePoint : {props.tokenom.maxLifePoint}</p>
            </div>
        </div >
    )
}
export default OpponentCard;