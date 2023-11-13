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
                    <a href="/#room">Réservez dès maintenant</a>
                </div>
            </div>

            <section className="header__fleche">
                <a href="/#accueil"><span></span></a>
            </section>
            </div>
           

        </header>
    );
}

export default Header;