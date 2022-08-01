import React, { Component } from 'react';
import { Header } from './Header.jsx'
import { Grid } from '@mui/material';
import { TokenomTeam } from '../TokenomTeam.jsx';
import { FindOpponent } from './FindOpponent.jsx';
import {
    BrowserRouter,
    Routes,
    Route,
} from "react-router-dom";
import { FightPage } from './FightPage.jsx';
import { useParams } from 'react-router-dom';

export class MainPage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            currentAccount: null,
            connected: true
        }
    }

    render() {
        return <>

            <header className='header'>
                <Header />
            </header>

            <div className='content overflow-hidden'>
                <BrowserRouter>
                    <Routes>
                        <Route exact path='/' element={
                            <div className='grid grid-cols-3 p-[1%] '>
                                <div className='h-[80vh] overflow-scroll'>
                                    <TokenomTeam></TokenomTeam>
                                </div>
                                <div className='col-span-2'>
                                    <FindOpponent></FindOpponent>
                                </div>
                            </div>
                        }></Route>
                        <Route path='/fight/:id/:vsId' element={<FightPageFunction />}></Route>
                    </Routes>
                </BrowserRouter>

            </div>



            <footer className='footer bg-black flex'>
                <p className='text-white m-auto'>Made by Guigui</p>
            </footer>
        </>

    }
}



function FightPageFunction() {
    // Get the userId param from the URL.
    let { id, vsId } = useParams();

    return (
        <div className="h-full" >
            <FightPage id={id} vsId={vsId}></FightPage>
        </div>
    );
}