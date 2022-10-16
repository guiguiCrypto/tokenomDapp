import React from "react";
import { MainPage } from './components/layout/MainPage';
import { BattleDataProvider } from "./components/BattleDataContext";
import '@rainbow-me/rainbowkit/styles.css';
import {
  getDefaultWallets,
  RainbowKitProvider,
} from '@rainbow-me/rainbowkit';
import {
  chain,
  configureChains,
  createClient,
  WagmiConfig,
} from 'wagmi';
import { alchemyProvider } from 'wagmi/providers/alchemy';
import { publicProvider } from 'wagmi/providers/public';


const { chains, provider } = configureChains(
  [chain.hardhat, chain.goerli],
  [
    alchemyProvider({ apiKey: process.env.ALCHEMY_ID }),
    publicProvider()
  ]
);

const { connectors } = getDefaultWallets({
  appName: 'My RainbowKit App',
  chains
});

const wagmiClient = createClient({
  autoConnect: true,
  connectors,
  provider
})

function App() {

  const battleData = {
    selectedAlly: null,
    selectedEnnemy: null,
  }

  return (
    <WagmiConfig client={wagmiClient}>
      <RainbowKitProvider chains={chains}>
        <BattleDataProvider value={battleData}>
          <MainPage></MainPage>
        </BattleDataProvider>
      </RainbowKitProvider>
    </WagmiConfig >
  );
}

export default App;
