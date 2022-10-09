import React, { Component } from 'react';
import TokenomContractCall from '../utils/BlockchainCall.jsx';
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
        let allyData = await TokenomContractCall("tokenomStats", [this.props.id]);

        this.setState({
            allyTokenom: allyData
        })
    }

    retrieveEnnemyTokenomData = async () => {
        let ennemyData = await TokenomContractCall("tokenomStats", [this.props.vsId]);

        this.setState({
            ennemyTokenom: ennemyData
        })
    }

    render() {
        return (
            <>

                {(this.state.allyTokenom != null && !this.state.allyTokenom.isFighting)
                    ?
                    <Alert variant="filled" severity="warning">Your Tokenom is not in a fight - Click here to find an <a href={'/'}><strong>opponent</strong></a></Alert>
                    :
                    // eslint-disable-next-line
                    (this.state.allyTokenom != null && this.state.allyTokenom.versusId.toNumber() != this.props.vsId)
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