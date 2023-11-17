import React from "react";
import NavBar from "../../components/Navbar";
import Outside from "../../assets/img/outside.jpg";
import InstagramLogo from "../../assets/img/logo_insta.webp";
import FacebookLogo from "../../assets/img/logo_facebook.png";
import TiktokLogo from "../../assets/img/logo_tiktok.webp";
import Footer from "../../layout/Footer";

import { useEffect } from "react";
import { useState } from "react";

import { contactPopup, contactErrorPopup } from "../../components/Popup";





function Contact () {

    const [email, setEmail] = useState("");
    const [nom, setNom] = useState("");
    const [prenom, setPrenom] = useState("");
    const [message, setMessage] = useState("");

    useEffect(() => {
        function handleResize() {
          const divElement = document.querySelector(".nav-bar");
          if (window.innerWidth > 769) {
            divElement.classList.add("nav-bar--color");
          } else {
            divElement.classList.remove("nav-bar--color");
          }
        }
    
        // Ajoutez un gestionnaire d'événements de redimensionnement lors du montage du composant
        window.addEventListener("resize", handleResize);
    
        // Appelez handleResize une fois pour définir la classe initiale en fonction de la largeur initiale
        handleResize();
    
        // Supprimez le gestionnaire d'événements lorsque le composant est démonté
        return () => {
          window.removeEventListener("resize", handleResize);
        };
    }, []);

    const contactmessage = async (e) => {
        e.preventDefault();

        const formData = new URLSearchParams();
        formData.append("nom", nom);
        formData.append("prenom", prenom);
        formData.append("email", email);
        formData.append("message", message);

    
        try{
            const response = await fetch("http://localhost:5000/clients/clientContact", {
                method: "POST",
                body: formData,
            });

            if (response.status === 200) {
                contactPopup()
                setTimeout(() => {
                    window.location.reload();
                }, 3000);
            }
            else {
                contactErrorPopup()
                window.location.reload();

            }
        }
        catch (error) {
            return console.error("Erreur lors de la création d'un message", error);
        }
    };



    

    return (
        <>
            <div className="nav-bar">
            <NavBar />

            </div>
            <section className="contact">
                <div className="contact__container">
                    <div className="contact__title">
                        <span className="contact__span">Contactez-nous</span>
                    </div>
                    <div className="contact__picture">
                        <img className="contact__icon" src={Outside} alt="" />
                    </div>
                    <div className="contact__content">
                        <div className="contact__text contact__span">
                            <span>Contactez-nous</span>
                        </div>

                        <form className="contact__form">
                            <div className="contact__form-input">
                                <input className="contact__input" type="text" placeholder="Nom" value={nom} onChange={(e) => setNom(e.target.value)} required/>
                            </div>
                            <div className="contact__form-input">
                                <input className="contact__input" type="text" placeholder="Prénom" value={prenom} onChange={(e) => setPrenom(e.target.value)} required/>
                            </div>
                            <div className="contact__form-input">
                                <input className="contact__input" type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required/>
                            </div>
                            <div className="contact__form-input">
                                <textarea className="contact__input-area" type="text" placeholder="Message" value={message} onChange={(e) => setMessage(e.target.value)} required />
                            </div>
                            <div className="contact__button">
                                <button onClick={contactmessage} className="contact__input-submit">Valider</button>
                            </div>
                        </form>
                    </div>
                </div>
            </section>
            <section className="reseaux">
                <div className="reseaux__title">
                    <span className="reseaux__span">Retrouvez-nous</span>
                </div>
                <span className="reseaux__barre"></span>
                <div className="reseaux__container">
                    <div className="reseaux__content">
                        <a href="https://www.facebook.com/profile.php?id=61552125573882&sk=about_family_and_relationships">
                            <img className="reseaux__icon" src={FacebookLogo} alt="" />
                        </a>
                    </div>
                    <div className="reseaux__content">
                        <a href="https://www.instagram.com/reservetonlogis/">
                            <img className="reseaux__icon" src={InstagramLogo} alt="" />
                        </a>
                    </div>
                    <div className="reseaux__content">
                        <a href="https://www.tiktok.com/@reservetonlogis?_t=8gMlVWNYHHV&_r=1">
                            <img className="reseaux__icon" src={TiktokLogo} alt="" />
                        </a>
                    </div>
                </div>

            </section>

            <footer className="footer">
                <Footer />

            </footer>
        </>
    );
}
export default Contact;

