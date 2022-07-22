import React, { Component } from 'react';

const BattleDataContext = React.createContext()


class BattleDataProvider extends Component {
    // Context state

    state = {
        selectedAlly: null,
        selectedEnnemy: null,
    }

    // Method to update state
    setSelectedAlly = (id) => {

        this.setState({
            selectedAlly : id
        })
    }

    setSelectedEnnemy = (id) => {
        this.setState({
            selectedEnnemy : id
        })
    }

    render() {
        const { children } = this.props
        const { selectedAlly } = this.state
        const { selectedEnnemy } = this.state
        const { setSelectedAlly } = this
        const { setSelectedEnnemy } = this

        return (
            <BattleDataContext.Provider
                value={{
                    selectedAlly,
                    selectedEnnemy,
                    setSelectedAlly,
                    setSelectedEnnemy
                }}
            >
                {children}
            </BattleDataContext.Provider>
        )
    }
}

export default BattleDataContext

export { BattleDataProvider }