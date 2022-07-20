import React, { Component } from 'react';
import * as Constants from './Constants.jsx';
import { ethers, BigNumber } from 'ethers';
import { Grid, Stack } from '@mui/material';
import { TokenomSlot } from './TokenomSlot.jsx';
import { MintButton } from './MintButton.jsx';
import { Card, CardContent } from '@mui/material';
import "../App.css";



export class TokenomTeam extends Component {

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
                console.log(normalTokenomIds);

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
        if (id === this.state.activeTokenom){
            id = null;
        }

        this.setState({
            activeTokenom: id
        })
    }

    render() {
        return (
            <Grid item xs={4}>
                <Stack spacing={2}>
                    {
                        (this.state.ids[0] != null)
                            ?
                            (<>
                                <button className='invisibleButton' onClick={() => this.selectTokenomHandler(0)} >
                                    <Card className="tokenomSlot" style={{ height: "100%", display: "flex", boxShadow: this.state.activeTokenom == 0 ? "10px 5px 5px black" : ""}}>
                                        <CardContent className={this.state.activeTokenom == 0 ? "selected" : ""} style={{ flexGrow: "1" }}>
                                            <TokenomSlot tokenomId={this.state.ids[0]} ></TokenomSlot>
                                        </CardContent>
                                    </Card>
                                </button>
                            </>)
                            :
                            (<>
                                <h3>this slot is empty, you can mint a new tokenom</h3>
                                <MintButton></MintButton>
                            </>)
                    }
                    {
                        (this.state.ids[1] != null)
                            ?
                            (<>
                                <button className='invisibleButton' onClick={() => this.selectTokenomHandler(1)}>
                                <Card className="tokenomSlot" style={{ height: "100%", display: "flex", boxShadow: this.state.activeTokenom == 1 ? "10px 5px 5px black" : ""}}>
                                        <CardContent className={this.state.activeTokenom == 1 ? "selected" : ""} style={{ flexGrow: "1" }}>
                                            <TokenomSlot tokenomId={this.state.ids[1]} ></TokenomSlot>
                                        </CardContent>
                                    </Card>
                                </button>
                            </>)
                            :
                            (<>
                                <div>
                                    <Card className="tokenomSlot" >
                                        <CardContent>
                                            <h3>this slot is empty, you can mint a new tokenom</h3>
                                            <MintButton></MintButton>
                                        </CardContent>
                                    </Card>
                                </div>

                            </>)
                    }
                    {
                        (this.state.ids[2] != null)
                            ?
                            (<>
                                <button className='invisibleButton' onClick={() => this.selectTokenomHandler(2)}>
                                <Card className="tokenomSlot" style={{ height: "100%", display: "flex", boxShadow: this.state.activeTokenom == 2 ? "10px 5px 5px black" : ""}}>
                                        <CardContent className={this.state.activeTokenom == 2 ? "selected" : ""} style={{ flexGrow: "1" }}>
                                            <TokenomSlot tokenomId={this.state.ids[2]} ></TokenomSlot>
                                        </CardContent>
                                    </Card>
                                </button>
                            </>)
                            :
                            (<>
                                <div>
                                    <Card className="tokenomSlot" >
                                        <CardContent>
                                            <h3>this slot is empty, you can mint a new tokenom</h3>
                                            <MintButton></MintButton>
                                        </CardContent>

                                    </Card>
                                </div>
                            </>)
                    }
                    {
                        (this.state.ids[3] != null)
                            ?
                            (<>
                                <button className='invisibleButton' onClick={() => this.selectTokenomHandler(3)}>
                                <Card className="tokenomSlot" style={{ height: "100%", display: "flex", boxShadow: this.state.activeTokenom == 3 ? "10px 5px 5px black" : ""}}>
                                        <CardContent className={this.state.activeTokenom == 3 ? "selected" : ""} style={{ flexGrow: "1" }}>
                                            <TokenomSlot tokenomId={this.state.ids[3]} ></TokenomSlot>
                                        </CardContent>
                                    </Card>
                                </button>
                            </>)
                            :
                            (<>
                                <div>
                                    <Card className="tokenomSlot" >
                                        <CardContent>
                                            <h3>this slot is empty, you can mint a new tokenom</h3>
                                            <MintButton></MintButton>
                                        </CardContent>

                                    </Card>
                                </div>
                            </>)
                    }
                    {
                        (this.state.ids[4] != null)
                            ?
                            (<>
                                <button className='invisibleButton' onClick={() => this.selectTokenomHandler(4)}>
                                <Card className="tokenomSlot" style={{ height: "100%", display: "flex", boxShadow: this.state.activeTokenom == 4 ? "10px 5px 5px black" : ""}}>
                                        <CardContent className={this.state.activeTokenom == 4 ? "selected" : ""} style={{ flexGrow: "1" }}>
                                            <TokenomSlot tokenomId={this.state.ids[4]} ></TokenomSlot>
                                        </CardContent>
                                    </Card>
                                </button>
                            </>)
                            :
                            (<>
                                <div>
                                    <Card className="tokenomSlot" >
                                        <CardContent>
                                            <h3>this slot is empty, you can mint a new tokenom</h3>
                                            <MintButton></MintButton>
                                        </CardContent>

                                    </Card>
                                </div>
                            </>)
                    }

                    {
                        (this.state.ids[5] != null)
                            ?
                            (<>
                                <button className='invisibleButton' onClick={() => this.selectTokenomHandler(5)}>
                                <Card className="tokenomSlot" style={{ height: "100%", display: "flex", boxShadow: this.state.activeTokenom == 5 ? "10px 5px 5px black" : ""}}>
                                        <CardContent className={this.state.activeTokenom == 5 ? "selected" : ""} style={{ flexGrow: "1" }}>
                                            <TokenomSlot tokenomId={this.state.ids[5]} ></TokenomSlot>
                                        </CardContent>
                                    </Card>
                                </button>
                            </>)
                            :
                            (<>
                                <div>
                                    <Card className="tokenomSlot" >
                                        <CardContent>
                                            <h3>this slot is empty, you can mint a new tokenom</h3>
                                            <MintButton></MintButton>
                                        </CardContent>

                                    </Card>
                                </div>
                            </>)
                    }
                </Stack>
            </Grid >
        )
    }


}