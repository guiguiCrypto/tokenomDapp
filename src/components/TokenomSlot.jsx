import React, { Component } from 'react';
import * as Constants from './Constants.jsx';
import { ethers } from 'ethers';



export class TokenomSlot extends Component {

    constructor(props) {
        super(props);
        this.state = {
            tokenomId: props.tokenomId,
            name: "",
            level: null,
            maxLifePoint: 0,
            uri: ""
        }
    }

    componentDidMount = () => {
        if (this.state.tokenomId != null) {
            this.updateTokenomData();
        }
    }

    updateTokenomData = async () => {
        try {
            const { ethereum } = window;

            if (ethereum) {
                const provider = new ethers.providers.Web3Provider(ethereum);
                const signer = provider.getSigner();
                const tokenContract = new ethers.Contract(Constants.TOKENOMADRESS, Constants.TOKENOMABI, signer);

                let tokenom = await tokenContract.tokenomStats(this.state.tokenomId);
                let tokenomURI = await tokenContract.tokenURI(this.state.tokenomId)

                this.setState({
                    name: tokenom.name,
                    level: tokenom.level,
                    maxLifePoint: tokenom.maxLifePoint,
                    uri: tokenomURI
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
            <div className="h-full">
                {
                    (this.state.tokenomId != null)
                        ?
                        (<div className='grid grid-cols-2'>
                            <img className='tokenomImage w-[50%] m-auto' alt='tokenom' src={"https://ipfs.io/" + this.state.uri}></img>
                            <div className='text-left my-auto'>
                                <h1>name : {this.state.name}</h1>
                                <p>level : {this.state.level}</p>
                                <p>LifePoint : {this.state.maxLifePoint}</p>

                            </div>
                        </div>)
                        :
                        (<>
                            <h1>this slot is empty, you can mint a new tokenom</h1>
                        </>)

                }
            </div>

        );
    }

}