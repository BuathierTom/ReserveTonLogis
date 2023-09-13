import React from "react";
import Image from "../assets/img/logo.png";

function Header () {
    return (    
        <header className="header">
            <div className="nav-bar--transparent">
                <div className="nav-bar__logo">
                    <img src={Image} alt="Logo" />
                </div>
                <div className="nav-bar__menu">
                    <ul>
                        <li><a href="#home">Accueil</a></li>
                        <li><a href="#about">Chambres d'hote</a></li>
                        <li><a href="#services">Contact</a></li>
                        <li> <a href="#contact">Mon compte</a></li>
                    </ul>
                </div>
            </div>
            <div className="header__content">
                <div className="header__title">
                    <h1>Le Domaine Des 4 Saisons</h1>
                </div>
                <div className="header__a">
                    <a href="#about">Réservez des maintenant</a>
                </div>
            </div>

        </header>
    );
}

export default Header;