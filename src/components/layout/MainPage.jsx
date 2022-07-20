import React, { Component } from 'react';
import { Header } from './Header.jsx'
import { Grid, Stack } from '@mui/material';
import { MintButton } from '../MintButton.jsx';
import { TokenomTeam } from '../TokenomTeam.jsx';
import { FindOpponent } from '../FindOpponent.jsx';


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

            <header className='header-section is-sticky'>
                <Header />
            </header>

            <body>
                <Grid container spacing={2}>

                    <TokenomTeam></TokenomTeam>
                    <Grid item xs={8}>
                        <FindOpponent></FindOpponent>
                    </Grid>
                </Grid>
            </body>



            <footer>
                {/* <Footer /> */}
            </footer>
        </>

    }
}