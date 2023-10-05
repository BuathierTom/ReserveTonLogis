import React, { useState, useEffect } from "react";
import Image from "../assets/img/logo.png";
import iconMenu from "../assets/img/imgIcon/icons8-menu-50.png";

function NavBar () {
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    useEffect(() => {
        // Fonction de rappel pour mettre à jour la largeur de la fenêtre
        const updateWindowWidth = () => {
            setWindowWidth(window.innerWidth);
        };

        // Ajoute un écouteur d'événement pour suivre la largeur de la fenêtre
        window.addEventListener("resize", updateWindowWidth);

        // Nettoie l'écouteur d'événement lors du démontage du composant
        return () => {
            window.removeEventListener("resize", updateWindowWidth);
        };
    }, []);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    return (
        <div className="nav-bar nav-bar--transparent">
            <div className="nav-bar__logo">
                <img className="nav-bar__img" src={Image} alt="Logo" />
            </div>

            {windowWidth < 768 ? ( 
                <div className="nav-bar__icon-menu" onClick={toggleMenu}>
                    <img className="nav-bar__img-icon" src={iconMenu} alt="Icone menu" />
                </div>
            ) : (
                <div className="nav-bar__menu">
                    <ul className="nav-bar__ul">
                        <li className="nav-bar__li"><a href="/">Accueil</a></li>
                        <li className="nav-bar__li"><a href="#about">Chambres d'hote</a></li>
                        <li className="nav-bar__li"><a href="/contact">Contact</a></li>
                        <li className="nav-bar__li"> <a href="/account">Mon compte</a></li>
                    </ul>
                </div>
            )}

            {windowWidth < 768 && isMenuOpen && (
                <div className="nav-bar__menu--open">
                    <p className="nav-bar__close-cross" onClick={() => setIsMenuOpen(false)}>X</p>

                            <ul className="nav-bar__ul">
                            <li className="nav-bar__li"><a href="#home">Accueil</a></li>
                            <li className="nav-bar__li"><a href="#about">Chambres d'hote</a></li>
                            <li className="nav-bar__li"><a href="#services">Contact</a></li>
                            <li className="nav-bar__li"> <a href="#contact">Mon compte</a></li>
                            </ul>
                </div>
            )}
        </div>
    );
}

export default NavBar;

