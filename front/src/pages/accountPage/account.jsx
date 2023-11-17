import NavBar from "../../components/Navbar";
import { useState, useEffect } from "react";
import React from "react";
import IconFleche from "../../assets/img/imgIcon/icons8-flèche-vers-le-bas-50.png";
import { format } from 'date-fns';
import { Link } from "react-router-dom";
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import { disconnectPopup, modifPasswordPopup, modifPasswordErrorPopup, deleteAccountPopup } from "../../components/Popup";

const MySwal = withReactContent(Swal);

function Account() {
    const [blockVisibility, setBlockVisibility] = useState([false, false, false, false]);
    const [account, setAccount] = useState([]);
    const [reservation, setReservation] = useState([]);
    const email = account.email;
    const[newPassword, setNewPassword] = useState("");
    const password = account.password;



    

    const toggleBlockVisibility = (index) => {
      const updatedVisibility = [...blockVisibility];
      updatedVisibility[index] = !updatedVisibility[index];
      setBlockVisibility(updatedVisibility);
    };

    const onClickDisconnect = () => {
        localStorage.clear();
        disconnectPopup()
        setTimeout(() => {
            window.location.href = "/connexion";
        }, 3000);
    }
    
    useEffect(() => {
        const storedToken = localStorage.getItem("token");
        if (storedToken) {
            const headers = {
                "Content-Type": "application/json",
                Authorization: `Bearer ${storedToken}`,
            };
    
            // Récupération des données du client
            fetch('http://localhost:5000/clients/get', {
                method: "GET",
                headers,
            })
            .then((response) => response.json())
            .then((data) => {
                setAccount(data);
            })
            .catch((error) => {
                console.error("Erreur lors de la récupération des données du client", error);
            });
    
            // Récupération des données de réservation
            fetch('http://localhost:5000/clients/getReservation', {
                method: "GET",
                headers,
            })
            .then((response) => response.json())
            .then((data) => {
                setReservation(data.reservationsAvecChambres);
           
            })
            .catch((error) => {
                console.error("Erreur lors de la récupération des données de réservation", error);
            });
        }
    }, []);

    const passwordChange = async (e) => {
        e.preventDefault();



        const formData = new URLSearchParams();
        formData.append("email", email);
        formData.append("password", password);
        formData.append("newPassword", newPassword);

        try {
            const response = await fetch('http://localhost:5000/clients/updatePassword', {
                method: "POST",
                body: formData,
            });
            const data = await response.json();
            if (response.status === 200) {
                modifPasswordPopup();
            }
            else {
                modifPasswordErrorPopup()
                    .then((result) => {
                        if (result.isConfirmed) {
                            window.location.reload();
                        }
                    })
            }
        }   
        catch (error) {
            console.error(error);
        }
    };

    const deleteAccount = (e) => {
        e.preventDefault();

        const storedToken = localStorage.getItem("token");
        if (storedToken) {
            const headers = {
                "Content-Type": "application/json",
                Authorization: `Bearer ${storedToken}`,
            };
            deleteAccountPopup()
                .then(async (result) => {
                    if (result.isConfirmed) {
                        try {
                            const response = await fetch('http://localhost:5000/clients/delete', {
                                method: "POST",
                                headers,
                            });
                            const data = await response.json();
                            if (response.status === 200) {
                                localStorage.clear();
                                window.location.reload();
                                window.location.href = "/connexion";
                            }
                            else {
                                alert(data.Error);
                            }
                        } catch (error) {
                            console.error(error);
                        }
                    }
                }); 
        }           
    };

    
    return (
        <>
            <div className="account-img">
                <div className="nav-bar ">
                    <NavBar />
                </div>
                <section className="account">
            
                    <div className="account__container">
                        <div className="account__client">
                            <div className="account__client--info">
                                <p className="account__client--info-title" >Bonjour {account.prenom} {account.nom} !</p>
                            </div>
                        </div>

                        <div className="account__grid">
                            <div className="account__reservations">
                                <div className="account__div">
                                    <p className="account__title">Mes réservations</p>
                                    <button className="account__button" onClick={() => toggleBlockVisibility(0)}><img src={IconFleche} alt="fleche" className="account__button-img" /></button>
                                </div>
                                {blockVisibility[0] && (
                                    <div className="account__reservations-block account__block">
                                            <ul>
                                            {reservation == null ? ( 
                                                    <p>Aucune réservation trouvée.</p>
                                                ) : (
                                                reservation.map((reservation) => (
                                                    <li key={reservation.id_reservation}>

                                                 
                                              
                                                    <h3 className="account__reservations-block--reservation-title">Chambre {reservation.chambre.nom}</h3>
                                                    <div className="account__reservations-block--reservation-details">
                                                        <div className="account__reservations-block--reservation-details--info">
                                                            <p className="account__reservations-block--reservation-details--info-p">Arrivée : {reservation.date_arrive ? format(new Date(reservation.date_arrive), 'dd/MM/yyyy') : ""}</p>
                                                            <p className="account__reservations-block--reservation-details--info-p">Départ : {reservation.date_depart ? format(new Date(reservation.date_depart), 'dd/MM/yyyy') : ""}</p>
                                                            <p className="account__reservations-block--reservation-details--info-p">Prix : {reservation.chambre.prix} €</p>
                                                            <p className="account__reservations-block--reservation-details--info-p">Personnes : {reservation.nb_personnes}</p>
                                                            <p className="account__reservations-block--reservation-details--info-p">Total : {reservation.prix_total} €</p>
                                                        </div>
                                                        <div className="account__img-container">
                                                        <img
                                                            src={require(`../../assets/img-room/${reservation.chambre.image}.jpg`)}
                                                            alt="chambre"
                                                            className="account__img"
                                                        />

                                                        </div>
                                                        

                                                    </div>
                                                    <span className="account__reservations-block--reservation-span"></span>
                                                </li>
                                                ))
                                            )}

                                            </ul>
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
                                            <p className="account__donnees-block--info-content"> {account.nom}</p>
                                        </div>
                                        <div className="account__donnees-block--info">
                                            <p className="account__donnees-block--info-title">Prénom : </p>
                                            <p className="account__donnees-block--info-content"> {account.prenom}</p>
                                        </div>
                                        <div className="account__donnees-block--info">
                                            <p className="account__donnees-block--info-title">Email : </p>
                                            <p className="account__donnees-block--info-content"> {account.email}</p>
                                        </div>
                                        <div className="account__donnees-block--info">
                                            <p className="account__donnees-block--info-title">Téléphone : </p>
                                            <p className="account__donnees-block--info-content"> {account.telephone}</p>
                                        </div>
                                        <div className="account__donnees-block--info">
                                            <p className="account__donnees-block--info-title">Adresse : </p>
                                            <p className="account__donnees-block--info-content"> {account.adresse}</p>
                                        </div>
                                        <div className="account__donnees-block--info">
                                            <p className="account__donnees-block--info-title">Code postal : </p>
                                            <p className="account__donnees-block--info-content">{account.codePostal}</p>
                                        </div>
                                        <div className="account__donnees-block--info">
                                            <p className="account__donnees-block--info-title">Ville : </p>
                                            <p className="account__donnees-block--info-content"> {account.ville}</p>
                                        </div>
                                    </div>
                                    )}
                            </div>
                            <div className="account__parametres">
                                <div className="account__div">
                                    <p className="account__title">Se déconnecter</p>
                                    <button className="account__button" onClick={() => toggleBlockVisibility(2)}><img src={IconFleche} alt="fleche" className="account__button-img" /></button>
                                </div>
                                    {blockVisibility[2] && (
                                    <div className="account__block account__parametres-block">
                                        <button className="account__parametres-block--button" onClick={onClickDisconnect}>Me déconnecter</button>
                                    </div>
                                    )}
                            </div>
                            <div className="account__connexion">
                                <div className="account__div">
                                    <p className="account__title">Connexion/Sécurité</p>
                                    <button className="account__button" onClick={() => toggleBlockVisibility(3)}><img src={IconFleche} alt="fleche" className="account__button-img" /></button>
                                </div>
                                    {blockVisibility[3] && (
                                    <div className="account__block account__security-block">
                                        <div className="account__security-block--info">
                                            <button className="account__security-block--info-link-button" onClick={() => toggleBlockVisibility(4)}>Modifier mon mot de passe</button>
                                            {blockVisibility[4] && (
                                                <div className="account__security-block--info-block">
                                                    <p className="account__security-block--info-block-title">Veuillez saisir votre nouveau mot de passe :</p>
                                                    <div className="account__security-block--info-link">
                                                        <input type="password" className="account__input" placeholder="Nouveau mot de passe" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} />
                                                        <button className="account__security-block--info-button" onClick={passwordChange}>Valider</button>
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                    )}
                            </div>
                        </div>
                        <div className="account__delete">
                            <button className="account__delete-button" onClick={deleteAccount}>Supprimer mon compte</button>
                        </div>
                    </div>
                </section>  
            </div>
        </>
    );
}

export default Account;