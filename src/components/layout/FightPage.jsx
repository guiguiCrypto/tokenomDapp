import React, { Component } from 'react';
import * as Constants from '../Constants.jsx';
import { ethers } from 'ethers';
import { AllyFightingCard } from '../AllyFightingCard.jsx';
import Alert from '@mui/material/Alert';
import { EnnemyFightingCard } from '../EnnemyFightingCard.jsx';

export class FightPage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            allyTokenom: null,
            ennemyTokenom: null
        }
    }

    componentDidMount = () => {
        this.retrieveAllyTokenomData();
        this.retrieveEnnemyTokenomData();
    }


    retrieveAllyTokenomData = async () => {
        try {
            const { ethereum } = window;

            if (ethereum) {
                const provider = new ethers.providers.Web3Provider(ethereum);
                const signer = provider.getSigner();
                const tokenContract = new ethers.Contract(Constants.TOKENOMADRESS, Constants.TOKENOMABI, signer);

                let allyData = await tokenContract.tokenomStats(this.props.id);
                console.log(allyData)

                this.setState({
                    allyTokenom: allyData
                })
            } else {
                console.log("Ethereum object does not exist");
            }

        } catch (err) {
            console.log(err);
        }
    }

    retrieveEnnemyTokenomData = async () => {
        try {
            const { ethereum } = window;

            if (ethereum) {
                const provider = new ethers.providers.Web3Provider(ethereum);
                const signer = provider.getSigner();
                const tokenContract = new ethers.Contract(Constants.TOKENOMADRESS, Constants.TOKENOMABI, signer);

                let ennemyData = await tokenContract.tokenomStats(this.props.vsId);

                this.setState({
                    ennemyTokenom: ennemyData
                })
            } else {
                console.log("Ethereum object does not exist");
            }

        } catch (err) {
            console.log(err);
        }
    }

    render() {
        return (
            <>

                {(this.state.allyTokenom != null && !this.state.allyTokenom.isFighting)
                    ?
                    <Alert variant="filled" severity="warning">Your Tokenom is not in a fight - Click here to find an <a href={'/'}><strong>opponent</strong></a></Alert>
                    :
                    (this.state.allyTokenom != null && this.state.allyTokenom.versusId !== this.props.vsId)
                        ?
                        <Alert variant="filled" severity="warning">Your tokenom is fighting another tokenom - Click here to go the good <a href={'/fight/'+ this.props.id + '/' + this.state.allyTokenom.versusId} ><strong>Fight</strong></a></Alert>
                        :
                        <></>
                }

                <div className='fightGrid h-full p-2'>


                    <div className='p-3' >
                        {
                            (this.state.allyTokenom != null)

                                ?
                                (<>
                                    <AllyFightingCard tokenom={this.state.allyTokenom} tokenomId={this.props.id}></AllyFightingCard>
                                </>)
                                :
                                (<>
                                    <h1>loading</h1>
                                </>)
                        }
                    </div>
                    <div className='p-3'>
                        {
                            (this.state.ennemyTokenom != null)

                                ?
                                (<>
                                    <EnnemyFightingCard tokenom={this.state.ennemyTokenom} tokenomId={this.props.vsId}></EnnemyFightingCard>
                                </>)
                                :
                                (<>
                                    <h1>loading</h1>
                                </>)
                        }
                    </div>
                </div>

            </>
        )
    }
}