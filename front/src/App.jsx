import React from 'react';
import Home from  '././pages/homePage/Home';
import Contact from '././pages/contactPage/Contact';
import ConnexionInscription from '././pages/connexionPage/ConnexionInscription';
import Account from './pages/accountPage/account';
import "./styles/main.scss";
import {  Route, Routes } from 'react-router-dom';


function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/connexion" element={<ConnexionInscription />} />
        <Route path="/account" element={<Account />} />
      </Routes>

    </div>
  );
}

export default App;
