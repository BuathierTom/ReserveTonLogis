import NavBar from "../../components/Navbar";
import { useState, useEffect } from "react";
import React from "react";
import IconFleche from "../../assets/img/imgIcon/icons8-flèche-vers-le-bas-50.png";
import ApiCallCustomer from "../../api/ApiCallCustomer";
import ApiCallReservation from "../../api/ApiCallReservation";

function Account() {
    const [blockVisibility, setBlockVisibility] = useState([false, false, false, false]);
    const [account, setAccount] = useState([]);
    const [reservation, setReservation] = useState([]);
    

    const toggleBlockVisibility = (index) => {
      const updatedVisibility = [...blockVisibility];
      updatedVisibility[index] = !updatedVisibility[index];
      setBlockVisibility(updatedVisibility);
    };

    useEffect(() => {
        ApiCallCustomer().then(data => {
            setAccount(data);
        })
    },

    useEffect(() => {
        ApiCallReservation().then(data => {
            setReservation(data);
        })
    }, []));



    
    

    return (
        <>
            <div className="account-img">
                <div className="nav-bar ">
                    <NavBar />
                </div>

                {account.map((account) => (
                    <div className="account-img__container" key={account.id}>
                        <div className="account-img__container--text">
                            <p className="account-img__container--text-title">Bonjour {account.prenom} {account.nom}</p>
                            <p className="account-img__container--text-content">Bienvenue sur votre espace client</p>
                        </div>
                    </div>
                ))}

                <section className="account">
                    <div className="account__container">
                        <div className="account__grid">
                            {reservation.map((reservation) => (
                                <div className="account__reservations">
                                    <div className="account__div">
                                        <p className="account__title">Mes réservations</p>
                                        <button className="account__button" onClick={() => toggleBlockVisibility(0)}><img src={IconFleche} alt="fleche" className="account__button-img" /></button>
                                    </div>
                                    {blockVisibility[0] && (
                                        <div className="account__reservations-block">
                                            <div className="account__reservations-block--reservation">
                                                <p className="account__reservations-block--reservation-title">{reservation.nom}</p> 
                                                <p className="account__reservations-block--reservation-date"> Du {reservation.date_arrive} au {reservation.date_depart}</p> 
                                                <p className="account__reservations-block--reservation-price">Prix : {reservation.prix_total} €</p>
                                            </div>    

                                        </div>
                                    )}
                                </div>
                            ))}
                            {account.map((account) => (
                            <div className="account__donnees">
                                <div className="account__div">
                                    <p className="account__title">Données personnelles</p>
                                    <button className="account__button" onClick={() => toggleBlockVisibility(1)}><img src={IconFleche} alt="fleche" className="account__button-img" /></button>
                                </div>
                                    {blockVisibility[1] && (
                                    <div className="account__donnees-block">
                                        <div className="account__donnees-block--info">
                                            <p className="account__donnees-block--info-title">Nom : </p>
                                            <p className="account__donnees-block--info-content"> {account.nom}</p>
                                        </div>
                                        <div className="account__donnees-block--info">
                                            <p className="account__donnees-block--info-title">Prénom : </p>
                                            <p className="account__donnees-block--info-content"> {account.prenom}</p>
                                        </div>
                                        <div className="account__donnees-block--info">
                                            <p className="account__donnees-block--info-title">Email : </p>
                                            <p className="account__donnees-block--info-content">{account.email}</p>
                                        </div>
                                        <div className="account__donnees-block--info">
                                            <p className="account__donnees-block--info-title">Téléphone : </p>
                                            <p className="account__donnees-block--info-content">{account.telephone}</p>
                                        </div>
                                        <div className="account__donnees-block--info">
                                            <p className="account__donnees-block--info-title">Adresse : </p>
                                            <p className="account__donnees-block--info-content">{account.adresse}</p>
                                        </div>
                                    </div>
                                    )}
                            </div>
                            ))}
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

