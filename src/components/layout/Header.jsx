import React from 'react';
import { Link } from 'react-router-dom';

import logo from '../../images/logo.png';
import "../../App.css";
import { ConnectButton } from '@rainbow-me/rainbowkit';

function Header() {

    return (
        <div className='h-full bg-blue-500 flex justify-between'>
            <Link className='h-[80%] my-auto ml-5' to={"/"}>
                <img className='h-full my-auto ml-5' src={logo} alt="Logo" />
            </Link>

            <div className='my-auto mr-10 h-2/4'>
                <ConnectButton />
            </div>
        </div >

    )
}
 export default Header;
