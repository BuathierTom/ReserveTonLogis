import React from "react";
import NavBar from "../../components/Navbar";
import ReCAPTCHA from "react-google-recaptcha";
import Footer from "../../layout/Footer";
import { useEffect, useState } from "react";





function ConnexionInscription () {
    const [nom, setNom] = useState("");
    const [prenom, setPrenom] = useState("");
    const [email, setEmail] = useState("");
    const [telephone, setTelephone] = useState("");
    const [adresse, setAdresse] = useState("");
    const [ville, setVille] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);

    const handleInscription = async (e) => {
        e.preventDefault();
        
        
        try {
            const response = await fetch("http://localhost:3000/clients/create", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    nom,
                    prenom,
                    email,
                    adresse,
                    telephone,
                    password,
                }),
            });
            console.log(response)
            const data = await response.json();
            console.log(data);
            if (data.error) {
                setError(data.error);
            }
        } catch (error) {
            console.log(error);
            // Gérez l'erreur ici, par exemple, en affichant un message d'erreur approprié.
        }   
             
        console.log(nom, prenom, email, telephone, adresse, ville, password);
    };

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
                            <form className="connexion-inscription__form" onSubmit={handleInscription} method="POST">
                            <div className="connexion-inscription__form-input">
                                <input
                                className="connexion-inscription__input"
                                type="text"
                                placeholder="Nom"
                                name="nom" 
                                value={nom}
                                onChange={(e) => setNom(e.target.value)}
                                />
                            </div>
                            <div className="connexion-inscription__form-input">
                                <input
                                className="connexion-inscription__input"
                                type="text"
                                placeholder="Prénom"
                                name="prenom"
                                value={prenom}
                                onChange={(e) => setPrenom(e.target.value)}
                                />
                            </div>
                            <div className="connexion-inscription__form-input">
                                <input
                                className="connexion-inscription__input"
                                type="email"
                                placeholder="Email"
                                value={email}
                                name="email"
                                onChange={(e) => setEmail(e.target.value)}
                                
                                />
                            </div>
                            <div className="connexion-inscription__form-input">
                                <input
                                className="connexion-inscription__input"
                                type="text"
                                name="telephone"
                                placeholder="Numéro de téléphone"
                                value={telephone}
                                onChange={(e) => setTelephone(e.target.value)}
                                />
                            </div>
                            <div className="connexion-inscription__form-input">
                                <input
                                className="connexion-inscription__input"
                                type="text"
                                placeholder="Adresse"
                                value={adresse}
                                onChange={(e) => setAdresse(e.target.value)}
                                />
                            </div>
                            <div className="connexion-inscription__form-input">
                                <input
                                className="connexion-inscription__input"
                                type="text"
                                placeholder="Ville"
                                value={ville}
                                onChange={(e) => setVille(e.target.value)}
                                />
                            </div>
                            <div className="connexion-inscription__form-input">
                                <input
                                className="connexion-inscription__input"
                                type="password"
                                placeholder="Mot de passe"
                                minLength={8}
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                />
                            </div>
                            {/* Affichez ici un message d'erreur en cas d'échec d'inscription */}
                            {error && <p className="error-message">{error}</p>}
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

