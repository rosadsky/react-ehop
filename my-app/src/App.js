import React from 'react';
import './App.css';
import Home from './components/Home'
import Admin from './components/Admin'
import NavBar from './components/NavBar'
import Objednavka from './components/Objednavka';
import Podakovanie from './components/Podakovanie'
import {Route,Routes} from "react-router-dom"

// ******************************//
//    Please read README.md      //
//                               //
//        Roman Osadský          //
// ******************************//

function App() {
  return( 
  <div className="App">
    <NavBar />
    <Routes>
      <Route exact path="/" element={<Home />} />
      <Route exact path="/admin" element={<Admin />} />
      <Route exact path="/objednavka" element={<Objednavka />} />
      <Route exact path="/podakovanie" element={<Podakovanie />} />
  </Routes>  
  </div>
  );
} 
 
export default App;
 