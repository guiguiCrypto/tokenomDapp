import * as Constants from '../Constants.jsx';
import { ethers } from 'ethers';

const TokenomContractCall = async function (name, args = null){
    try {
        const { ethereum } = window;

        if (ethereum) {
            const provider = new ethers.providers.Web3Provider(ethereum);
            const signer = provider.getSigner();
            const tokenContract = new ethers.Contract(Constants.TOKENOMADRESS, Constants.TOKENOMABI, signer);

            let result;

            if(args === null){
                result = await tokenContract[name]();
            } else result = await tokenContract[name](...args);
            

            //console.log(`waiting for tx : ${name} with args : ${args}`);

            return result;
        } else {
            console.log("Ethereum object does not exist");
        }

    } catch (err) {
        //console.error(err.message)
    }
}

export default TokenomContractCall;