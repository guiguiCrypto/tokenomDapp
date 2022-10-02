import React, { Component } from 'react';
import logo from '../../images/logo.png';
import "../../App.css";

export class Header extends Component {

    constructor(props) {
        super(props);
        this.state = {
            currentAccount: null,
            anchorEl: null
        }
    }

    componentDidMount = () => {
        const { ethereum } = window;

        ethereum.on('accountsChanged', (accounts) => {
            this.setState({
                currentAccount: accounts[0]
            })
        });

        ethereum.on('chainChanged', (chainId) => {
            window.location.reload();
        });

    }



    connectWalletHandler = async () => {
        const { ethereum } = window;

        if (!ethereum) {
            alert("please install Metamask!")

        }

        try {
            const accounts = await ethereum.request({ method: 'eth_requestAccounts' });
            console.log("Found an account! Adress :", accounts[0]);
            this.setState({
                currentAccount: accounts[0]
            });
        } catch (err) {
            console.log(err);
        }
    }

    handleChange = (event) => {
        this.setState({
            auth: event.target.checked
        });
    };

    handleClose = () => {
        this.setState({
            anchorEl: null
        });
    };

    render() {
        return (
            <div className='h-full bg-blue-500 flex justify-between'>
                <img className='logo my-auto ml-5' src={logo} alt="Logo" />

                {(this.state.currentAccount == null)

                    ?
                    <>
                        <button onClick={this.connectWalletHandler} className='rounded-lg bg-white hover:bg-orange-700 border-double border-2 border-indigo-600 my-auto mr-10 h-2/4'>
                            &nbsp; &nbsp; Connect Wallet &nbsp; &nbsp;
                        </button>
                    </>
                    :
                    <>
                        <span className="inline-block my-auto">
                            {this.state.currentAccount}
                        </span>
                    </>}
            </div >

        )
    }
}
