import React from "react";
import { useState } from "react";
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

const MySwal = withReactContent(Swal);


function Inscription () {
    // intialized state
    const [nom, setNom] = useState("");
    const [prenom, setPrenom] = useState("");
    const [email, setEmail] = useState("");
    const [telephone, setTelephone] = useState("");
    const [adresse, setAdresse] = useState("");
    const [ville, setVille] = useState("");
    const [codePostal, setCodePostal] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);

    
    const handleInscription = async (e) => {
        e.preventDefault();
        
        // creation of formData
        const formData = new URLSearchParams();
        formData.append("nom", nom);
        formData.append("prenom", prenom);
        formData.append("email", email);
        formData.append("adresse", adresse);
        formData.append("ville", ville);
        formData.append("codePostal", codePostal);
        formData.append("telephone", telephone);
        formData.append("password", password);

        
        // fetch request to the server
        try {
          const response = await fetch('http://localhost:5000/clients/create', {
            method: "POST",
            body: formData,
          });
            const data = await response.json();
  

            if (response.status === 200) {
                MySwal.fire({
                    icon: 'success',
                    title: 'Votre compte a bien été créé, vous pouvez vous connecter !',
                    showConfirmButton: false,
                    timer: 3000
                })
                setTimeout(() => {
                    window.location.href = "/connexion";
                }, 3000);
            }
            else {
                MySwal.fire({
                    icon: 'error',
                    title: 'Erreur...',
                    text: 'Une erreur s\'est produite, veuillez réessayer',
                })
            }
   
            
        } 
        catch (error) {
            console.error(error);
            setError("Une erreur s'est produite");
            console.log("ok")
        }    
    };

    return (
        <div className="connexion-inscription__inscription">
                            <p className="connexion-inscription__title">Nouveau Client ?</p>
                            <p className="connexion-inscription__text">Créer votre compte client</p>
                            <form className="connexion-inscription__form" onSubmit={handleInscription} method="POST">
                            <div className="connexion-inscription__form-line">
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
                            </div>
                            <div className="connexion-inscription__form-input">
                                <input required 
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
                            <div className="connexion-inscription__form-line">
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
                                    type="text"
                                    placeholder="Code Postal"
                                    value={codePostal}
                                    onChange={(e) => setCodePostal(e.target.value)}
                                    />
                                </div>
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


                            {error && (
                                <div className="connexion-inscription__error">
                                <p>{error}</p>
                                </div>

                            )}
                            
                            <div className="connexion-inscription__button">
                                <input className="connexion-inscription__input-submit" type="submit" value="S'inscrire" />
                            </div>
                            </form>

                        </div>
    )

}

export default Inscription;