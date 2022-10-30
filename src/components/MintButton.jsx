import React, { useState } from 'react';


function MintButton() {

    const [name, setName] = useState("");
    return <div className='mb-5'>
        <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter a name"
            className='border border-gray-300 shadow-inner focus:shadow-outline'
        />
        <button className='ml-6 p-3 bg-blue-500 text-back rounded disabled:bg-blue-300' onClick={() => this.props.mintNftHandler(this.state.name)} disabled={this.state.name === ""}>Mint TOKENOM</button>
    </div>
}

export default MintButton;