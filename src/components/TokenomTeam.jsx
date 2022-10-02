import React, { Component } from 'react';
import * as Constants from './Constants.jsx';
import { ethers } from 'ethers';
import { Grid, Stack } from '@mui/material';
import { TokenomSlot } from './TokenomSlot.jsx';
import { MintButton } from './MintButton.jsx';
import { Card, CardContent } from '@mui/material';
import "../App.css";
import BattleDataContext from './BattleDataContext.jsx';


export class TokenomTeam extends Component {

    static contextType = BattleDataContext


    constructor() {
        super();
        this.state = {
            ids: [],
            activeTokenom: null
        }
    }


    componentDidMount = () => {
        this.updateTokenomTeamData();
    }

    updateTokenomTeamData = async () => {
        try {
            const { ethereum } = window;

            if (ethereum) {
                const provider = new ethers.providers.Web3Provider(ethereum);
                const signer = provider.getSigner();
                const tokenContract = new ethers.Contract(Constants.TOKENOMADRESS, Constants.TOKENOMABI, signer);

                let address = await signer.getAddress()
                let tokenomIds = await tokenContract.getTokenIds(address);

                let normalTokenomIds = [...tokenomIds]
                for (let i = 0; i < tokenomIds.length; i++) {
                    normalTokenomIds[i] = normalTokenomIds[i].toNumber();
                }

                this.setState({
                    ids: normalTokenomIds,
                });

            } else {
                console.log("Ethereum object does not exist");
            }

        } catch (err) {
            console.log(err);
        }
    }

    selectTokenomHandler = async (id) => {
        const { setSelectedAlly } = this.context

        setSelectedAlly(this.state.ids[id]);
        if (id === this.state.activeTokenom) {
            id = null;
            setSelectedAlly(null);
        }

        this.setState({
            activeTokenom: id
        })
    }

    render() {



        return (
            <>
                <h1 className='text-xl mb-5'>Select your Tokenom</h1>
                <div className='grid grid-rows-6 gap-4 pt-5'>


                    {
                        (this.state.ids[0] != null)
                            ?
                            <button className='h-full card mx-5' onClick={() => this.selectTokenomHandler(0)} >
                                <div className={this.state.activeTokenom === 0 ? "bg-green-300 shadow-xl h-full" : "h-full"} >
                                    <TokenomSlot tokenomId={this.state.ids[0]} ></TokenomSlot>
                                </div>
                            </button>
                            :
                            <div className="card h-full flex mx-5" >
                                <div className='my-auto ml-10'>
                                    <h3 className='my-3'>this slot is empty, you can mint a new tokenom</h3>
                                    <MintButton></MintButton>
                                </div>
                            </div>
                    }
                    {
                        (this.state.ids[1] != null)
                            ?
                            <button className='h-full card mx-5' onClick={() => this.selectTokenomHandler(1)} >
                                <div className={this.state.activeTokenom === 1 ? "bg-green-300 shadow-xl h-full" : "h-full"} >
                                    <TokenomSlot tokenomId={this.state.ids[1]} ></TokenomSlot>
                                </div>
                            </button>
                            :
                            <div className="card h-full flex mx-5" >
                                <div className='my-auto ml-10'>
                                    <h3 className='my-3'>this slot is empty, you can mint a new tokenom</h3>
                                    <MintButton></MintButton>
                                </div>
                            </div>
                    }
                    {
                        (this.state.ids[2] != null)
                            ?
                            <button className='h-full card mx-5' onClick={() => this.selectTokenomHandler(2)} >
                                <div className={this.state.activeTokenom === 2 ? "bg-green-300 shadow-xl h-full" : "h-full"} >
                                    <TokenomSlot tokenomId={this.state.ids[2]} ></TokenomSlot>
                                </div>
                            </button>
                            :
                            <div className="card h-full flex mx-5" >
                                <div className='my-auto ml-10'>
                                    <h3 className='my-3'>this slot is empty, you can mint a new tokenom</h3>
                                    <MintButton></MintButton>
                                </div>
                            </div>
                    }
                    {
                        (this.state.ids[3] != null)
                            ?
                            <button className='h-full card mx-5' onClick={() => this.selectTokenomHandler(3)} >
                                <div className={this.state.activeTokenom === 3 ? "bg-green-300 shadow-xl h-full" : "h-full"} >
                                    <TokenomSlot tokenomId={this.state.ids[3]} ></TokenomSlot>
                                </div>
                            </button>
                            :
                            <div className="card h-full flex mx-5" >
                                <div className='my-auto ml-10'>
                                    <h3 className='my-3'>this slot is empty, you can mint a new tokenom</h3>
                                    <MintButton></MintButton>
                                </div>
                            </div>
                    }
                    {
                        (this.state.ids[4] != null)
                            ?
                            <button className='h-full card mx-5' onClick={() => this.selectTokenomHandler(4)} >
                                <div className={this.state.activeTokenom === 4 ? "bg-green-300 shadow-xl h-full" : "h-full"} >
                                    <TokenomSlot tokenomId={this.state.ids[4]} ></TokenomSlot>
                                </div>
                            </button>
                            :
                            <div className="card h-full flex mx-5" >
                                <div className='my-auto ml-10'>
                                    <h3 className='my-3'>this slot is empty, you can mint a new tokenom</h3>
                                    <MintButton></MintButton>
                                </div>
                            </div>
                    }

                    {
                        (this.state.ids[5] != null)
                            ?
                            <button className='h-full card mx-5' onClick={() => this.selectTokenomHandler(5)} >
                                <div className={this.state.activeTokenom === 5 ? "bg-green-300 shadow-xl h-full" : "h-full"} >
                                    <TokenomSlot tokenomId={this.state.ids[5]} ></TokenomSlot>
                                </div>
                            </button>
                            :
                            <div className="card h-full flex mx-5" >
                                <div className='my-auto ml-10'>
                                    <h3 className='my-3'>this slot is empty, you can mint a new tokenom</h3>
                                    <MintButton></MintButton>
                                </div>
                            </div>
                    }
                </div>
            </>
        )
    }


}