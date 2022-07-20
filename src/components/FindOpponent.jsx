import React, { Component } from 'react';
import { OpponentList } from './OpponentList';


export class FindOpponent extends Component {


    render() {
        return (
            <div>
                <section className="layout">
                    <div style={{ display: "block" }}>
                        <button className="refreshButton">
                            Refresh
                        </button>
                        <h1>
                            Select an oponent
                        </h1>
                    </div>
                    <div>
                        <OpponentList></OpponentList>
                    </div>
                    <div>3</div>
                </section>
            </div>
        )
    }
}