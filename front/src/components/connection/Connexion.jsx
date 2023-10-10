import React from 'react';
import {useState,useEffect } from 'react';

 

function Connexion() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [connected, setConnected] = useState(false);
    const [id, setId] = useState(0);
    console.log(connected);

    useEffect(() => {  
       localStorage.setItem("connected", connected);
       localStorage.setItem("id", id);
    }, [connected, id]);


    console.log(connected);
    const handleInscription = async (e) => {
        e.preventDefault();

        const formData = new URLSearchParams();
        formData.append("email", email);
        formData.append("password", password);

        try {
            const response = await fetch("http://localhost:3000/clients/connect", {
                method: "POST",
                body: formData,
            });
            const data = await response.json();

            if (response.status === 200) {
                alert("Vous êtes connecté");
                window.location.href = "/account"  
                setConnected(true);
                setId(data.id);

            }
            else {
                alert(data.Error);
            }
        }   

        catch (error) {
            console.error(error);
        }

    };

    
    return (
        <div className="connexion-inscription__connexion">
                            <p className="connexion-inscription__title">Déjà client ?</p>
                            <p className="connexion-inscription__text">Connexion à votre compte</p>
                            <form className="connexion-inscription__form-connexion" onSubmit={handleInscription} method="POST">
                                <div className="connexion-inscription__form-input">
                                    <input className="connexion-inscription__input" type="text" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
                                </div>
                                <div className="connexion-inscription__form-input">
                                    <input className="connexion-inscription__input" type="password" placeholder="Mot de passe"  value={password} onChange={ (e) => setPassword(e.target.value)} />
                                </div>
                                {/* <ReCAPTCHA
                                    sitekey="6LcEeTUoAAAAABjZLGe1StYkQ4gIAGg2C4T_GugF"
                                /> */}
                                <div className="connexion-inscription__button">
                                    <input className="connexion-inscription__input-submit" type="submit" value="Se connecter" />
                                </div>
                                <div className="connexion-inscription__link">
                                    <a className="connexion-inscription__link" href="/">Mot de passe oublié ?</a>
                                    <a className="connexion-inscription__link" href="/">Besoin d'aide</a>
                                </div>
                            </form>
                        </div>
    );
}

export default Connexion;