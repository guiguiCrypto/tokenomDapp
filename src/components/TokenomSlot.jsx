import React, { Component } from 'react';
import * as Constants from './Constants.jsx';
import { ethers } from 'ethers';
import tokenom1 from '../images/Tokenom1.png'



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

                let tokenom = await tokenContract.pokemonStats(this.state.tokenomId);
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
            <div>
                {
                    (this.state.tokenomId != null)
                        ?
                        (<>
                            <img className='tokenomImage' src={tokenom1}></img>
                            {/*<image uri={this.state.uri}></image> */}
                            <div>
                                <h1>name : {this.state.name}</h1>
                                <p>level : {this.state.level}</p>
                                <p>LifePoint : {this.state.maxLifePoint}</p>

                            </div>

                        </>)
                        :
                        (<>
                            <h1>this slot is empty, you can mint a new tokenom</h1>
                        </>)

                }
            </div>

        );
    }

}