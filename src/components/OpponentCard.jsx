import React, { Component } from 'react';



export class OpponentCard extends Component {

    constructor(props) {
        super(props);
        this.state = {
            tokenom: this.props.tokenom
        }
    }

    render() {
        return (
            <div className={this.props.selected ? "bg-red-300 shadow-xl h-full flex" : "h-full flex"}>
                <img className='w-[40%] float-left my-auto' alt='tokenom' src={"https://ipfs.io/" + this.state.tokenom.uri}></img>
                <div className='h-[50%] m-auto'>
                    <h1>name : {this.state.tokenom.name}</h1>
                    <p>level : {this.state.tokenom.level}</p>
                    <p>LifePoint : {this.state.tokenom.maxLifePoint}</p>
                </div>
            </div >
        )
    }
}