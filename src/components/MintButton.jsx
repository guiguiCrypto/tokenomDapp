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

    handleChange = (e) => {
        this.setState({ name: e.target.value });
    };

    render() {
        return (
            <div className='mb-5'>
                <input
                    type="text"
                    value={this.state.name}
                    onChange={this.handleChange}
                    placeholder="Enter a name"
                    className='border border-gray-300 shadow-inner focus:shadow-outline'
                />
                <button className='ml-6 p-3 bg-blue-500 text-back rounded disabled:bg-blue-300' onClick={ () => this.props.mintNftHandler(this.state.name)} disabled={this.state.name == ""}>Mint TOKENOM</button>
            </div>

        )
    }
}