import React from "react";
import NavBar from "../../components/Navbar";
import Outside from "../../assets/img/outside.jpg";
import InstagramLogo from "../../assets/img/logo_insta.webp";
import FacebookLogo from "../../assets/img/logo_facebook.png";
import TiktokLogo from "../../assets/img/logo_tiktok.webp";


function Contact () {
    return (
        <>
            <NavBar />
            <section className="contact">
                <div className="contact__container">
                    <div className="contact__picture">
                        <img className="contact__icon" src={Outside} alt="" />
                    </div>
                    <div className="contact__content">
                        <form className="contact__form">
                            <div className="contact__form-input">
                                <input className="contact__input" type="text" placeholder="Nom" />
                            </div>
                            <div className="contact__form-input">
                                <input className="contact__input" type="text" placeholder="Prénom" />
                            </div>
                            <div className="contact__form-input">
                                <input className="contact__input" type="email" placeholder="Email" />
                            </div>
                            <div className="contact__form-input">
                                <textarea className="contact__input-area" type="text" placeholder="Message" />
                            </div>
                            <div className="contact__button">
                                <input className="contact__input-submit" type="submit" value="Envoyer" />
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
                        <a href="https://www.facebook.com/">
                            <img className="reseaux__icon" src={FacebookLogo} alt="" />
                        </a>
                    </div>
                    <div className="reseaux__content">
                        <a href="https://www.instagram.com/">
                            <img className="reseaux__icon" src={InstagramLogo} alt="" />
                        </a>
                    </div>
                    <div className="reseaux__content">
                        <a href="https://www.tiktok.com/fr">
                            <img className="reseaux__icon" src={TiktokLogo} alt="" />
                        </a>
                    </div>
                </div>

            </section>
        </>
    );
}
export default Contact;

