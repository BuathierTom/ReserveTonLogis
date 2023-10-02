import React from "react";
import NavBar from "../components/Navbar";

function Header () {
    return (    
        <header className="header">
            <div className="header__container">
                <div className="nav-bar"> 
                <NavBar />  
                </div>
            <div className="header__content">
                <div className="header__title">
                    <h1 className="header__h1">Le Domaine Des 4 Saisons</h1>
                </div>
                <div className="header__a">
                    <a href="#about">Réservez des maintenant</a>
                </div>
            </div>
            </div>
           

        </header>
    );
}

export default Header;