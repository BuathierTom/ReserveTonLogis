import React from "react";
import Connexion from "../../components/connection/Connexion";
import Inscription from "../../components/connection/Inscription";
import NavBar from "../../components/Navbar";
import Footer from "../../layout/Footer";
import { useEffect } from "react";


function ConnexionInscription () {

    // function to add a class to the navbar when the screen is resized 
    useEffect(() => {
        function handleResize() {
          const divElement = document.querySelector(".nav-bar");
          if (window.innerWidth > 769) {
            divElement.classList.add("nav-bar--color");
          } else {
            divElement.classList.remove("nav-bar--color");
          }
        }
        window.addEventListener("resize", handleResize);
        handleResize();   
        return () => {
          window.removeEventListener("resize", handleResize);
        };
      }, []);

    return (
        <>
            <div className="container-img">
                <div className="nav-bar">
                <NavBar />
                </div>
                <section className="connexion-inscription">
                    <div className="connexion-inscription__container">
                    <Connexion />
                    <Inscription />    
                    </div>
                </section>

                <footer className="footer">
                    <Footer />
                </footer>
            </div>




        </>
    );
}

export default ConnexionInscription;

