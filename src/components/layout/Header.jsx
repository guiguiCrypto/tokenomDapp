import React, { Component } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
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

        this.connectWalletHandler()
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
            <div>
                <Box sx={{ flexGrow: 1}} style={{maxHeight: "20%"}}>
                    <AppBar position="static" color='primary' sx={{opacity:0.75}}>
                        <Toolbar>
                            <Typography align="left" variant="h6" component="div" sx={{ flexGrow: 1 }}>
                                <img className='logo' src={logo} alt="Logo" />
                            </Typography>

                            <span className="badge bg-secondary">
                                {this.state.currentAccount}
                            </span>
                            
                            <button onClick={this.connectWalletHandler} className='cta-button mint-nft-button'>
                                Connect Wallet
                            </button>
                        </Toolbar>
                    </AppBar>
                </Box>
            </div >

        )
    }
}
