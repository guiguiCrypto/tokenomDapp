import React, { Component } from 'react';
import { Header } from './Header.jsx';
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
            connectionStatus: false,
            intervalId: null
        }
    }

    componentDidMount() {
        this.updateConnectionStatus();

        const intervalId = setInterval(() => {
            this.updateConnectionStatus();
        }, 1000);

        this.setState({
            intervalId: intervalId
        })
    }

    componentWillUnmount() {
        clearInterval(this.state.intervalId);
    }

    updateConnectionStatus() {
        const { ethereum } = window;
                
        this.setState({
            connectionStatus: ethereum ? ((ethereum.selectedAddress !== null) ? 0 : 1) : 2 
        })
    }

    render() {
        return <>

            <header className='header'>
                <Header />
            </header>

            <div className='content overflow-hidden'>
                <Content state={this.state.connectionStatus} />
            </div>



            <footer className='footer bg-black flex'>
                <p className='text-white m-auto'>Made by Guigui</p>
            </footer>
        </>

    }
}

function Content(props) {
    switch (props.state) {
        case 0:
            return (<BrowserRouter>
                <Routes>
                    <Route exact path='/' element={
                        <div className='grid grid-cols-3 p-[1%] '>
                            <div className='h-[80vh] overflow-y-scroll'>
                                <TokenomTeam></TokenomTeam>
                            </div>
                            <div className='col-span-2'>
                                <FindOpponent></FindOpponent>
                            </div>
                        </div>
                    }></Route>
                    <Route path='/fight/:id/:vsId' element={<FightPageFunction />}></Route>
                </Routes>
            </BrowserRouter>)
        case 1:
            return <p>Please connect Metamask to use this Dapp</p>
        case 2:
            return <p>Please install Metamask to use this Dapp</p>
        default:
            return <></>
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