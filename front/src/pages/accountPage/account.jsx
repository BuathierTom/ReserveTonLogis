import NavBar from "../../components/Navbar";
import { useState } from "react";
import React from "react";
import IconFleche from "../../assets/img/imgIcon/icons8-flèche-vers-le-bas-50.png";


function Account() {

    const [blockVisibility, setBlockVisibility] = useState([false, false, false, false]);

    const toggleBlockVisibility = (index) => {
      const updatedVisibility = [...blockVisibility];
      updatedVisibility[index] = !updatedVisibility[index];
      setBlockVisibility(updatedVisibility);
    };


    return (
        <>
            <div className="account-img">
                <div className="nav-bar ">
                    <NavBar />
                </div>
                <section className="account">
                    <div className="account__container">
                        <div className="account__grid">
                            <div className="account__reservations">
                                <div className="account__div">
                                    <p className="account__title">Mes réservations</p>
                                    <button className="account__button" onClick={() => toggleBlockVisibility(0)}><img src={IconFleche} alt="fleche" className="account__button-img" /></button>
                                </div>
                                {blockVisibility[0] && (
                                    <div className="account__reservations-block">
                                        <div className="account__reservations-block--reservation">
                                            <p className="account__reservations-block--reservation-title">Les Marguerites</p>
                                            <p className="account__reservations-block--reservation-date">Du 12/12/2021 au 19/12/2021</p>
                                            <p className="account__reservations-block--reservation-price">Prix : 500€</p>
                                        </div>    

                                    </div>
                                 )}
                            </div>
                            <div className="account__donnees">
                                <div className="account__div">
                                    <p className="account__title">Données personnelles</p>
                                    <button className="account__button" onClick={() => toggleBlockVisibility(1)}><img src={IconFleche} alt="fleche" className="account__button-img" /></button>
                                </div>
                                    {blockVisibility[1] && (
                                    <div className="account__donnees-block">
                                        <div className="account__donnees-block--info">
                                            <p className="account__donnees-block--info-title">Nom : </p>
                                            <p className="account__donnees-block--info-content"> Dupont</p>
                                        </div>
                                        <div className="account__donnees-block--info">
                                            <p className="account__donnees-block--info-title">Prénom : </p>
                                            <p className="account__donnees-block--info-content"> Jean</p>
                                        </div>
                                        <div className="account__donnees-block--info">
                                            <p className="account__donnees-block--info-title">Email : </p>
                                            <p className="account__donnees-block--info-content"></p>
                                        </div>
                                        <div className="account__donnees-block--info">
                                            <p className="account__donnees-block--info-title">Téléphone : </p>
                                            <p className="account__donnees-block--info-content"></p>
                                        </div>
                                        <div className="account__donnees-block--info">
                                            <p className="account__donnees-block--info-title">Adresse : </p>
                                            <p className="account__donnees-block--info-content"></p>
                                        </div>
                                        <div className="account__donnees-block--info">
                                            <p className="account__donnees-block--info-title">Code postal : </p>
                                            <p className="account__donnees-block--info-content"></p>
                                        </div>
                                        <div className="account__donnees-block--info">
                                            <p className="account__donnees-block--info-title">Ville : </p>
                                            <p className="account__donnees-block--info-content"></p>
                                        </div>
                                    </div>
                                    )}
                            </div>
                            <div className="account__parametres">
                                <div className="account__div">
                                    <p className="account__title">Paramètres</p>
                                    <button className="account__button" onClick={() => toggleBlockVisibility(2)}><img src={IconFleche} alt="fleche" className="account__button-img" /></button>
                                </div>
                                    {blockVisibility[2] && (
                                    <div className="account__parametres-block">
                                        Contenu des paramètres
                                    </div>
                                    )}
                            </div>
                            <div className="account__connexion">
                                <div className="account__div">
                                    <p className="account__title">Connexion/Sécurité</p>
                                    <button className="account__button" onClick={() => toggleBlockVisibility(3)}><img src={IconFleche} alt="fleche" className="account__button-img" /></button>
                                </div>
                                    {blockVisibility[3] && (
                                    <div className="account__security-block">
                                        <div className="account__security-block--info">
                                            <a href="#" className="account__security-block--info-link">Modifier mon mot de passe</a>
                                        </div>
                                    </div>
                                    )}
                            </div>
                        </div>
                        <div className="account__delete">
                                <button className="account__delete-button">Supprimer mon compte</button>
                        </div>
                    </div>
                </section>  
            </div>
        </>
    );
}

export default Account;

