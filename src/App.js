import React from "react";
import { MainPage } from './components/layout/MainPage';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from 'react-router-dom';
import { BattleDataProvider } from "./components/BattleDataContext";


function App() {

  const battleData = {
    selectedAlly: null,
    selectedEnnemy: null,
  }

  return (
    <BattleDataProvider value={battleData}>
      <Router>
        <Routes>
          <Route exact path='/' element={< MainPage />}></Route>
          <Route exact path='/MainPage' element={< MainPage />}></Route>
        </Routes>
      </Router>
    </BattleDataProvider>
  );
}

export default App;
