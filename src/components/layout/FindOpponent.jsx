import React, { Component } from 'react';
import { OpponentList } from '../OpponentList';
import { StartFight } from '../StartFight';



export class FindOpponent extends Component {

    constructor(props) {
        super(props);
        this.state = {
            render: false
        }
    }

    refreshHandler = () => {
        this.setState({
            render: !this.state.render
        })
    }

    render() {
        return (
            <div>
                <section className="layout">
                    <div style={{ display: "block" }}>
                        <button className="refreshButton" onClick={this.refreshHandler}>
                            Refresh
                        </button>
                        <h1>
                            Select an opponent
                        </h1>
                    </div>
                    <div>
                        <OpponentList key={this.state.render}></OpponentList>
                    </div>
                    <div>
                        <StartFight></StartFight>
                    </div>
                </section>
            </div>
        )
    }
}