import React from "react";
import NavBar from "../../components/Navbar";
import ReCAPTCHA from "react-google-recaptcha";
import Footer from "../../layout/Footer";
import { useEffect } from "react";




function ConnexionInscription () {
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

    return (
        <>
            <div className="container-img">
                <div className="nav-bar">
                <NavBar />
                </div>
                <section className="connexion-inscription">
                    <div className="connexion-inscription__container">
                        <div className="connexion-inscription__connexion">
                            <p className="connexion-inscription__title">Déjà client ?</p>
                            <p className="connexion-inscription__text">Connexion à votre compte</p>
                            <form className="connexion-inscription__form-connexion">
                                <div className="connexion-inscription__form-input">
                                    <input className="connexion-inscription__input" type="text" placeholder="Email" />
                                </div>
                                <div className="connexion-inscription__form-input">
                                    <input className="connexion-inscription__input" type="password" placeholder="Mot de passe" />
                                </div>
                                {/* <ReCAPTCHA
                                    sitekey="6LcEeTUoAAAAABjZLGe1StYkQ4gIAGg2C4T_GugF"
                                /> */}
                                <div className="connexion-inscription__button">
                                    <input className="connexion-inscription__input-submit" type="submit" value="Se connecter" />
                                </div>
                                <div className="connexion-inscription__link">
                                    <a className="connexion-inscription__link" href="#">Mot de passe oublié ?</a>
                                    <a className="connexion-inscription__link" href="#">Besoin d'aide</a>
                                </div>
                            </form>


                        </div>
                        <div className="connexion-inscription__inscription">
                            <p className="connexion-inscription__title">Nouveau Client ?</p>
                            <p className="connexion-inscription__text">Créer votre compte client</p>
                            <form className="connexion-inscription__form">
                                <div className="connexion-inscription__form-line">
                                    <div className="connexion-inscription__form-input">
                                        <input className="connexion-inscription__input" type="text" placeholder="Nom" />
                                    </div>
                                    <div className="connexion-inscription__form-input">
                                        <input className="connexion-inscription__input" type="text" placeholder="Prénom" />
                                    </div>
                                </div>
                                <div className="connexion-inscription__form-input">
                                    <input className="connexion-inscription__input" type="email" placeholder="Email" />
                                </div>
                                <div className="connexion-inscription__form-input">
                                    <input className="connexion-inscription__input" type="text" placeholder="Numéro de téléphone" />
                                </div>
                                <div className="connexion-inscription__form-input">
                                    <input className="connexion-inscription__input" type="text" placeholder="Adresse" />
                                </div>
                                <div className="connexion-inscription__form-line">
                                    <div className="connexion-inscription__form-input">
                                        <input className="connexion-inscription__input" type="text" placeholder="Code postal" />
                                    </div>
                                    <div className="connexion-inscription__form-input">
                                        <input className="connexion-inscription__input" type="text" placeholder="Ville" />
                                    </div>
                                </div>
                                <div className="connexion-inscription__form-input">
                                    <input className="connexion-inscription__input" type="password" placeholder="Mot de passe" minLength={8} />
                                </div>
                                {/* <ReCAPTCHA
                                    sitekey="6LcEeTUoAAAAABjZLGe1StYkQ4gIAGg2C4T_GugF"
                                /> */}
                                <div className="connexion-inscription__button">
                                    <input className="connexion-inscription__input-submit" type="submit" value="S'inscrire" />
                                </div>
                            </form>
                        </div>
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

