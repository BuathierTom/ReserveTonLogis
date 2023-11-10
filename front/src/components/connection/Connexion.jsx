import React from 'react';
import {useState,useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

const MySwal = withReactContent(Swal);


function Connexion() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [connected, setConnected] = useState();
    const navigate = useNavigate();


    useEffect(() => {  
       localStorage.setItem("connected", connected);
       
    }, [connected]);

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            localStorage.setItem("connected", true);
            navigate("/account");

        }
    }, []);

    const handleInscription = async (e) => {
        e.preventDefault();

        const formData = new URLSearchParams();
        formData.append("email", email);
        formData.append("password", password);

        try {
            const response = await fetch('http://localhost:5000/clients/connect', {
                method: "POST",
                body: formData,
            });
            const data = await response.json();

            if (response.status === 200) {
                const { token } = data;
                console.log(token);
                setConnected(true);
                localStorage.setItem("token", token); // Stockez le JWT dans localStorage
                MySwal.fire({
                    icon: 'success',
                    title: 'Vous êtes connecté !',
                    showConfirmButton: false,
                    timer: 3000
                })
                setTimeout(() => {
                    window.location.href = "/account";
                }, 3000);

            }
            else {
                MySwal.fire({
                    icon: 'error',
                    title: 'Erreur...',
                    text: 'Email ou mot de passe incorrect !',
                })
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