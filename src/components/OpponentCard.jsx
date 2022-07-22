import React, { Component } from 'react';
import tokenom1 from '../images/Tokenom1.png';
import { Paper } from '@mui/material';



export class OpponentCard extends Component {

    constructor(props) {
        super(props);
        this.state = {
            tokenom: this.props.tokenom
        }
    }


    render() {
        return (
                <Paper style={{ height: "100%", margin: "3%", boxShadow: this.props.selected ? "10px 5px 5px black" : "", backgroundColor: this.props.selected ? "#ffcccb" : "" }} elevation={3} >
                    <img style={{
                        width: "35%",
                        float: "left"
                    }} src={tokenom1}></img>
                    {/*<image uri={this.state.uri}></image> */}
                    <div style={{ height: "50%" }}>
                        <h1>name : {this.state.tokenom.name}</h1>
                        <p>level : {this.state.tokenom.level}</p>
                        <p>LifePoint : {this.state.tokenom.maxLifePoint}</p>
                    </div>
                </Paper >
        )
    }
}