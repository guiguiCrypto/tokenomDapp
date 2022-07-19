import React, { useEffect, useState } from "react";
import { MainPage } from './components/layout/MainPage';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from 'react-router-dom';


function App() {



  return (
    <Router>
      <Routes>
        <Route exact path='/' element={< MainPage />}></Route>
        <Route exact path='/MainPage' element={< MainPage />}></Route>
      </Routes>


    </Router>
  );
}

export default App;
