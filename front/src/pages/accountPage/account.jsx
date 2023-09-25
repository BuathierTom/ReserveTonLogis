import React from "react";
import NavBar from "../../components/Navbar";

function Account() {
    return (
        <>
            <div className="account-img">
                <NavBar />
                <section className="account">
                    <div calssName="account__container">
                        <div className="account__grid">
                            <div className="account__reservations">
                                <p className="account__title">Mes réservations</p>
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

