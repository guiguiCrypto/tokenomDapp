import React, { Component, useCallback } from 'react';
import * as Constants from './Constants.jsx';
import { ethers } from 'ethers';
import BattleDataContext from './BattleDataContext.jsx';

import { Button } from '@mui/material';


export class StartFight extends Component {

    static contextType = BattleDataContext

    constructor(props) {
        super(props);
        this.state = {
            selectedAlly: null,
            selectedEnnemy: null
        }
    }

    getBattleData = async () => {
        const battleData = this.context

        this.setState({
            selectedAlly: battleData.selectedAlly,
            selectedEnnemy: battleData.selectedEnnemy
        })
    }

    componentDidMount() {    
        // set Interval
        this.interval = setInterval(this.getBattleData, 500);
    }
    
    componentWillUnmount() {
        // Clear the interval right before component unmount
        clearInterval(this.interval);
    }

    render () {
        return(
            <Button variant="contained" style={{ backgroundColor: "red", fontSize: "200%" }} className='BattleButton' disabled={!(this.state.selectedAlly !== null && this.state.selectedEnnemy !== null && this.state.selectedAlly !== this.state.selectedEnnemy)}> &#9876; Fight ! &#9876; </Button>
        )
    }
}