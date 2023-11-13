import React, { useState, useEffect } from "react";
import Image from "../assets/img/logo.png";
import iconMenu from "../assets/img/imgIcon/icons8-menu-70.png";


function NavBar () {
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [connected, setConnected] = useState();

    useEffect(() => {
        const connected = localStorage.getItem("connected");
        setConnected(connected);

    }
    , []);

    useEffect(() => {
        const handleHashChange = () => {
          if (window.location.hash === "#room") {
            setTimeout(() => {
              const roomSection = document.getElementById("room");
              if (roomSection) {
                roomSection.scrollIntoView({ behavior: "smooth" });
              }
            }, 0);
          }
        };
      
        handleHashChange();
      
        window.addEventListener("hashchange", handleHashChange);
      
        return () => {
          window.removeEventListener("hashchange", handleHashChange);
        };
      }, []);



    useEffect(() => {
        const updateWindowWidth = () => {
            setWindowWidth(window.innerWidth);
        };

        window.addEventListener("resize", updateWindowWidth);

        return () => {
            window.removeEventListener("resize", updateWindowWidth);
        };
    }, []);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    return (
        <>
            <div className="nav-bar__logo">
                <a href="/">
                <img className="nav-bar__img" src={Image} alt="Logo" />
                </a>
            </div>

            {windowWidth < 768 ? ( 
                <div className="nav-bar__icon-menu" onClick={toggleMenu}>
                    <img className="nav-bar__img-icon" src={iconMenu} alt="Icone menu" />
                </div>
            ) : (
                <div className="nav-bar__menu">
                    <ul className="nav-bar__ul">
                        <li className="nav-bar__li"><a className="nav-bar--color__link" href="/">Accueil</a></li>
                        <li className="nav-bar__li"><a className="nav-bar--color__link" href="/#room">Chambres d'hôte</a></li>
                        <li className="nav-bar__li"><a className="nav-bar--color__link" href="/contact">Contact</a></li>
                        {connected === "true" ? ( 
                            <li className="nav-bar__li"><a className="nav-bar--color__link" href="/account">Mon compte</a></li>
                        ) : (
                            <li className="nav-bar__li"><a className="nav-bar--color__link" href="/connexion">Connexion/Inscription</a></li>
                        )}
    
                    </ul>
                </div>
            )}

            {windowWidth < 768 && isMenuOpen && (
                <div className="nav-bar__menu--open">
                    <p className="nav-bar__close-cross" onClick={() => setIsMenuOpen(false)}>X</p>

                            <ul className="nav-bar__ul">
                            <li className="nav-bar__li"><a className="nav-bar__a-menu"  href="/">Accueil</a></li>
                            <li className="nav-bar__li"><a className="nav-bar__a-menu"onClick={() => setIsMenuOpen(false)} href="/#room">Chambres d'hote</a></li>
                            <li className="nav-bar__li"><a className="nav-bar__a-menu" href="/contact">Contact</a></li>
                            {connected === "true" ? ( 
                                <li className="nav-bar__li"><a className="nav-bar__a-menu" href="/account">Mon compte</a></li>
                            ) : (
                                <li className="nav-bar__li"><a className="nav-bar__a-menu" href="/connexion">Connexion/Inscription</a></li>
                            )}
                            
                            </ul>
                </div>
            )}
        </>
    );
}

export default NavBar;

