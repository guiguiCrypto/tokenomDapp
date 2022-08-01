import React, { Component } from 'react';
import { Paper } from '@mui/material';
import tokenom1 from '../images/Tokenom1.png'
import { LinearProgress } from '@mui/material';
import { Timer } from './Timer.jsx'
import { AttackButton } from './AttackButton';



export class AllyFightingCard extends Component {

    constructor(props) {
        super(props);
        this.state = {
            tokenom: this.props.tokenom,
        }
    }

    renderSwitch(param) {
        if (param > 50) {
            return <LinearProgress variant="determinate" color="success" sx={{ height: "5%" }} value={param} />;
        }
        else if (param > 20) {
            return <LinearProgress variant="determinate" color="warning" sx={{ height: "5%" }} value={param} />;
        }
        else return <LinearProgress variant="determinate" color="error" sx={{ height: "5%" }} value={param} />;
    }


    render() {
        return (
            <div className="bg-green-200 h-full p-[2%] grid grid-rows-2 grid-flow-col gap-4  ">
                <div className='grid-cols-2'>
                    <img src={tokenom1} className="w-[40%] float-left"></img>
                    <div >
                        <h1 className='font-medium text-4xl '>Name :  {this.state.tokenom.name}</h1>
                    </div>
                    <div>
                        <h1 className='font-medium text-4xl my-[2%]'>Level :  {this.state.tokenom.level}</h1>
                    </div>
                    <div className='mt-20'>
                        <Timer lastAttack={this.state.tokenom.lastAttack}></Timer>
                    </div>

                </div>

                <div className="">
                    <p className="text-right">{this.state.tokenom.lifePoint} / {this.state.tokenom.maxLifePoint} LP</p>
                    {this.renderSwitch(this.state.tokenom.lifePoint / this.state.tokenom.maxLifePoint * 100)}

                    <div className="grid grid-rows-2 grid-flow-col gap-2 pt-[10%] h-[90%]" >
                        <div className="attackColumn">

                            <AttackButton tokenomId={this.props.tokenomId} attackId={0}></AttackButton>
                            <AttackButton tokenomId={this.props.tokenomId} attackId={1}></AttackButton>
                        </div>
                        <div className="attackColumn">
                            <AttackButton tokenomId={this.props.tokenomId} attackId={2}></AttackButton>
                            <AttackButton tokenomId={this.props.tokenomId} attackId={3}></AttackButton>
                        </div>

                    </div>


                </div>


            </div>






            /*
                <Paper elevation={3} className="parent" >
                    <div class="div2" style={{
                        display: "flex",
                        flexWrap: "wrap",
                        justifyContent: "center",
                    }}>
                        <img src={tokenom1} className="AllyFightCardImage"></img>
                    </div>

                    <h2>{this.state.tokenom.name}</h2>
                </Paper >
                */
        )
    }

}