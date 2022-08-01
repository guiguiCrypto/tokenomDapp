import React from "react";
import { MainPage } from './components/layout/MainPage';
import { BattleDataProvider } from "./components/BattleDataContext";


function App() {

  const battleData = {
    selectedAlly: null,
    selectedEnnemy: null,
  }

  return (
    <BattleDataProvider value={battleData}>
      <MainPage></MainPage>
    </BattleDataProvider>
  );
}

export default App;
