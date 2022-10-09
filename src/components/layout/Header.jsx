import React, { Component } from 'react';
import logo from '../../images/logo.png';
import "../../App.css";
import { ConnectButton } from '@rainbow-me/rainbowkit';

export class Header extends Component {
    render() {
        return (
            <div className='h-full bg-blue-500 flex justify-between'>
                <img className='logo my-auto ml-5' src={logo} alt="Logo" />
                
                <div className='my-auto mr-10 h-2/4'>
                    <ConnectButton />
                </div>
            </div >

        )
    }
}
