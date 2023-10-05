import NavBar from "../../components/Navbar";
import { useState } from "react";
import React from "react";


function Account() {

    const [isBlockVisible, setIsBlockVisible] = useState(false);

    const toggleBlockVisibility = () => {
      setIsBlockVisible(!isBlockVisible);
    };

    return (
        <>
            <div className="account-img">
                <NavBar />
                <section className="account">
                    <div className="account__container">
                        <div className="account__grid">
                            <div className="account__reservations">
                                <div className="account__div">
                                    <p className="account__title">Mes réservations</p>
                                    <button className="account__button" onClick={toggleBlockVisibility}>V</button>
                                </div>
                                        {isBlockVisible && (
                                        <div className="account__reservations-block">
                                            Contenu des réservations
                                        </div>
                                    )}
                            </div>
                            <div className="account__donnees">
                                <p className="account__title">Données personnelles</p>
                            </div>
                            <div className="account__parametres">
                                <p className="account__title">Mes paramètres</p>
                            </div>
                            <div className="account__connexion">
                                <p className="account__title">Connexion/Sécurité</p>
                            </div>
                        </div>
                    </div>
                </section>  
                    
            </div>
        </>
    );
}

export default Account;

