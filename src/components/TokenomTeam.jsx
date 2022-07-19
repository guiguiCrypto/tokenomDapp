import React, { Component } from 'react';
import * as Constants from './Constants.jsx';
import { ethers, BigNumber } from 'ethers';
import { Grid, Stack } from '@mui/material';
import { TokenomSlot } from './TokenomSlot.jsx';
import { MintButton } from './MintButton.jsx';


export class TokenomTeam extends Component {

    constructor() {
        super();
        this.state = {
            ids: []
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

    render() {
        return (
            <Grid item xs={4}>
                <Stack spacing={2}>
                    {
                        (this.state.ids[0] != null)
                            ?
                            (<>
                                <TokenomSlot tokenomId={this.state.ids[0]} ></TokenomSlot>
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
                                <TokenomSlot tokenomId={this.state.ids[1]} ></TokenomSlot>
                            </>)
                            :
                            (<>
                            <h3>this slot is empty, you can mint a new tokenom</h3>
                                <MintButton></MintButton>
                            </>)
                    }
                    {
                        (this.state.ids[2] != null)
                            ?
                            (<>
                                <TokenomSlot tokenomId={this.state.ids[2]} ></TokenomSlot>
                            </>)
                            :
                            (<>
                            <h3>this slot is empty, you can mint a new tokenom</h3>
                                <MintButton></MintButton>
                            </>)
                    }
                    {
                        (this.state.ids[3] != null)
                            ?
                            (<>
                                <TokenomSlot tokenomId={this.state.ids[3]} ></TokenomSlot>
                            </>)
                            :
                            (<>
                            <h3>this slot is empty, you can mint a new tokenom</h3>
                                <MintButton></MintButton>
                            </>)
                    }
                    {
                        (this.state.ids[4] != null)
                            ?
                            (<>
                                <TokenomSlot tokenomId={this.state.ids[4]} ></TokenomSlot>
                            </>)
                            :
                            (<>
                            <h3>this slot is empty, you can mint a new tokenom</h3>
                                <MintButton></MintButton>
                            </>)
                    }

                    {
                        (this.state.ids[5] != null)
                            ?
                            (<>
                                <TokenomSlot tokenomId={this.state.ids[5]} ></TokenomSlot>
                            </>)
                            :
                            (<>
                            <h3>this slot is empty, you can mint a new tokenom</h3>
                                <MintButton></MintButton>
                            </>)
                    }
                </Stack>
            </Grid>
        )
    }


}