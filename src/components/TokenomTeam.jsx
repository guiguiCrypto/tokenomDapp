import React, { Component } from 'react';
import TokenomContractCall from './utils/BlockchainCall.jsx';
import { ethers } from 'ethers';
import { TokenomSlot } from './TokenomSlot.jsx';
import { MintButton } from './MintButton.jsx';
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

        const { ethereum } = window;

        if (ethereum) {
            let address = new ethers.providers.Web3Provider(ethereum).getSigner().getAddress();

            let tokenomIds = await TokenomContractCall("getTokenIds", [address])

            let normalTokenomIds = [...tokenomIds]
            for (let i = 0; i < tokenomIds.length; i++) {
                normalTokenomIds[i] = normalTokenomIds[i].toNumber();
            }

            while (normalTokenomIds.length < 6) {
                normalTokenomIds.push(null);
            }

            this.setState({
                ids: normalTokenomIds,
            });
        }
    }

    mintNftHandler = async (name) => {

        let tokenTxn = await TokenomContractCall("mint", [name]);

        await tokenTxn.wait();

        this.updateTokenomTeamData();
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
                    {this.state.ids.map((id, index) => (
                        (id != null)
                            ?
                            <button key={index} className='h-full card mx-5' onClick={() => this.selectTokenomHandler(index)} >
                                <div className={this.state.activeTokenom === index ? "bg-green-300 shadow-xl h-full" : "h-full"} >
                                    <TokenomSlot tokenomId={id} ></TokenomSlot>
                                </div>
                            </button>
                            :
                            <div key={index} className="card h-full flex mx-5" >
                                <div className='my-auto ml-10'>
                                    <h3 className='my-3'>this slot is empty, you can mint a new tokenom</h3>
                                    <MintButton mintNftHandler={this.mintNftHandler}></MintButton>
                                </div>
                            </div>
                    ))}
                </div>
            </>
        )
    }


}