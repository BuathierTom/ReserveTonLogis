import React, { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import { reservationPopup, reservationConnectPopup } from './Popup';
import { BeatLoader } from 'react-spinners';


const MySwal = withReactContent(Swal);

function ReservationComponent( {room, arrivalDate, departureDate } ) {
  const [personnes, setPersonnes] = useState(1);
  const [startDate, setStartDate] = useState(arrivalDate || new Date());
  const [endDate, setEndDate] = useState(departureDate || new Date());
  const [loading, setLoading] = useState(false); // Ajout de l'état de chargement
  const fee = 20;
  const deposit = 25;
  const differenceEnMilliseconds = endDate - startDate;
  const gap = Math.floor(differenceEnMilliseconds / (1000 * 60 * 60 * 24) );
  const total = room.prix * gap + fee + deposit;
  const nom = room.nom;



  // Utilisez useEffect pour mettre à jour le DatePicker lorsque les dates d'arrivée ou de départ changent
  useEffect(() => {
    setStartDate(arrivalDate || new Date());
    setEndDate(departureDate || new Date());

  }, [arrivalDate, departureDate]);
  
    
  const handleStartDateChange = (date) => {
    setStartDate(date);
  };

  const handleEndDateChange = (date) => {
    if (date >= startDate) {
      setEndDate(date);
    } else {
      // Affichez un message d'erreur ou effectuez une action pour gérer la date invalide
      // Vous pouvez également réinitialiser la date de départ si la date de départ est invalide
      console.error("La date de départ ne peut pas être antérieure à la date d'arrivée.");
    }
  };
  const handleChange = (e) => {
    setPersonnes(e.target.value);
  };





  const onclickapi = () => {
    const formattedStartDate = new Date(
      startDate.getUTCFullYear(),
      startDate.getUTCMonth(),
      startDate.getUTCDate() +2
    );
    
    const formattedEndDate = new Date(
      endDate.getUTCFullYear(),
      endDate.getUTCMonth(),
      endDate.getUTCDate() +2
    );


    const formData = new URLSearchParams();
    //ajouter une date en + pour la date de réservation
    formData.append("date_arrive", formattedStartDate.toISOString().split('T')[0]);
    formData.append("date_depart", formattedEndDate.toISOString().split('T')[0]);
    formData.append("id_chambre", window.location.href.split("/")[4]);
    formData.append("nb_personnes", personnes);
    formData.append("prix_total", total);
    const storedToken = localStorage.getItem("token");

    if (storedToken) {
      const headers = {
          Authorization: `Bearer ${storedToken}`,
    };

    MySwal.fire({
      icon: 'info',
      title: 'Veuillez confirmer votre réservation',
      text: 'Vous avez réserver la chambre ' + nom + ' du ' + startDate.toLocaleDateString() + ' au ' + endDate.toLocaleDateString() + ' pour ' + personnes + ' personne(s).',
      showConfirmButton: true,
      showCancelButton: true,
      cancelButtonText: 'Annuler',
      confirmButtonText: 'Confirmer',
      confirmButtonColor: '#4BAB77',
      cancelButtonColor: '#d33',
    }).then((result) => {
      if (result.isConfirmed) {
        setLoading(true);
        fetch("http://localhost:5000/reservations/create", {
          headers,
          method: "POST",
          body: formData,
        })
        .then((response) => response.json())
        .then((data) => {
            if (data.Error) {
              MySwal.fire({
                icon: 'error',
                title: 'Erreur...',
                text: data.Error,
                showConfirmButton: true,
                confirmButtonColor: '#4BAB77'
                          })
            } else {
              reservationPopup()
              .then((result) => {
                if (result.isConfirmed) {
                  window.location.href = "/account";
                }
              })
            }
            setLoading(false);
        })
        .catch((error) => {
            console.error("Erreur lors de la création d'une réservation", error);
            setLoading(false);
        });
      }
    })
    .catch((error) => {
        console.error("Erreur lors de la création d'une réservation", error);
        setLoading(false);
    });
  }
  else{
    reservationConnectPopup()
    .then((result) => {
      if (result.isConfirmed) {
          window.location.href = "/connexion";
      }
    })
  }
}



  return (
  
  <div className="room__reservation">
    <div className="room__price-container">
      <span className="room__reservation-price">{room.prix}€ </span>
      <span className="room__reservation-text">par nuit</span>
    </div>
    <div className="room__reservation-context-container">
    <div className="room__reservation-context">
        <div className="room__reservation-flex">
            <div className="room__reservation-arrival">
            <span className="room__span">Arrivée</span>
            {window.innerWidth <= 767 ? (
            <DatePicker className="room__date-display" selected={startDate} onChange={handleStartDateChange} name="startDate" dateFormat="dd/MM/yyyy" />


            ) : (
            <p className='room__date-display' dateformat="dd/MM/yyyy" selected={startDate} onChange={handleStartDateChange} name="startDate">{startDate.toLocaleDateString()}</p>
            )}
        </div>
        <div className="room__reservation-departure">
            <span className="room__span">Départ</span>
            {window.innerWidth <= 767 ? (
              
            <DatePicker className="room__date-display" selected={endDate} onChange={handleEndDateChange} name="endDate" dateFormat="dd/MM/yyyy" />

            ) : (
            <p className='room__date-display' dateformat="dd/MM/yyyy" selected={endDate} onChange={handleEndDateChange} name="endDate">{endDate.toLocaleDateString()}</p>
            )}
        </div>
            
        </div>

        <div className="room__reservation-peoples">
            <span className="room__span">Personnes</span>
            <select className="room__select" value={personnes} onChange={handleChange}>
                <option value="1">1 personne</option>
                <option value="2">2 personnes</option>
            </select>
        </div>


        <button className="room__reservation-button room__button" onClick={onclickapi}>
        {loading ? (
        <BeatLoader color="#ffffff" loading={loading} size={10} />
        ) : (
          'Réserver'
        )}
      </button>

      {room.prix * gap < 0 ? (
        <div className="room__reservation-info">
        <span className="room__span"> {room.prix} x {-gap}  nuit(s)</span>
        <span className="room__totalprice"> Montant indisponible</span>
    </div>
      ) : (
        <div className="room__reservation-info">
        <span className="room__span"> {room.prix} x {gap}  nuit(s)</span>
        <span className="room__totalprice">{room.prix * gap}€</span>
    </div>
      )

        }
       
        <div className="room__reservation-info">
            <span className="room__span"> Frais de ménage</span>
            <span className="room__totalprice"> {fee}€</span>
        </div>

        <div className="room__reservation-info">
            <span className="room__span"> Caution</span>
            <span className="room__totalprice"> {deposit}€</span>
        </div>
          {total <0 ? (
            <div className="room__reservation-info">
            <span className="room__span"> Total</span>
            <span className="room__totalprice"> Montant indisponible</span>
        </div>
          ) : (
            <div className="room__reservation-info">
            <span className="room__span"> Total</span>
            <span className="room__totalprice"> {total}€</span>
        </div>
          )

            }
            
        </div>
    </div>        
</div>

  );
}

export default ReservationComponent;
