import React, { Component } from 'react';
import * as Constants from './Constants.jsx';
import { ethers } from 'ethers';


export class MintButton extends Component {

    constructor() {
        super();
        this.state = {
            name: ""
        }
    }

    mintNftHandler = async () => {
        try {
            const { ethereum } = window;

            if (ethereum) {
                const provider = new ethers.providers.Web3Provider(ethereum);
                const signer = provider.getSigner();
                const tokenContract = new ethers.Contract(Constants.TOKENOMADRESS, Constants.TOKENOMABI, signer);

                let tokenTxn = await tokenContract.mint(this.state.name);

                console.log("waiting for tx");
                await tokenTxn.wait();

                console.log("tx validated");


            } else {
                console.log("Ethereum object does not exist");
            }

        } catch (err) {
            alert(err.data.message.split("revert")[1]);
        }
    }

    handleChange = (e) => {
        this.setState({ name: e.target.value });
    };

    render() {
        return (
            <div>
                <input
                    type="text"
                    value={this.state.name}
                    onChange={this.handleChange}
                    placeholder="Enter a name"
                />
                <button onClick={this.mintNftHandler} disabled={this.state.name == ""}>Mint TOKENOM</button>
            </div>

        )
    }
}