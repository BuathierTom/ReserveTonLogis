import React, { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

function ReservationComponent( {room, arrivalDate, departureDate} ) {
  const [personnes, setPersonnes] = useState(1);
  const [startDate, setStartDate] = useState(arrivalDate || new Date());
  const [endDate, setEndDate] = useState(departureDate || new Date());
  const fee = 20;
  const deposit = 25;
  const differenceEnMilliseconds = endDate - startDate;
  const gap = Math.floor(differenceEnMilliseconds / (1000 * 60 * 60 * 24) );
  const total = room.prix * gap + fee + deposit;

  

  // Utilisez useEffect pour mettre à jour le DatePicker lorsque les dates d'arrivée ou de départ changent
  useEffect(() => {
    setStartDate(arrivalDate || new Date());
    setEndDate(departureDate || new Date());

  }, [arrivalDate, departureDate]);
  
  console.log(startDate);

  console.log(startDate.toLocaleDateString());
  console.log(endDate.toLocaleDateString());
    
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
      console.log("La date de départ a été réinitialisée à la date d'arrivée.");
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

    console.log(formattedStartDate);
    console.log(formattedEndDate);

    const formData = new URLSearchParams();
    //ajouter une date en + pour la date de réservation
    formData.append("date_arrive", formattedStartDate.toISOString().split('T')[0]);
    formData.append("date_depart", formattedEndDate.toISOString().split('T')[0]);
    formData.append("id_chambre", window.location.href.split("/")[4]);
    formData.append("nb_personnes", personnes);
    const storedToken = localStorage.getItem("token");

    if (storedToken) {
      const headers = {
          Authorization: `Bearer ${storedToken}`,
      };

    fetch("http://localhost:5000/reservations/create", {
        headers,
        method: "POST",
        body: formData,
    })

    .then((response) => response.json())
    .then((data) => {
        console.log(data);
        if (data.Error) {
            alert(data.Error);
        } else {
            alert("Votre réservation a bien été créée");
            window.location.href = "/account";
        }
    })
    .catch((error) => {
        console.error("Erreur lors de la création d'une réservation", error);
    });
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


        <button className="room__reservation-button room__button" onClick={onclickapi}>Réserver</button>

        <div className="room__reservation-info">
            <span className="room__span"> {room.prix} x {gap}  nuit(s)</span>
            <span className="room__totalprice">{room.prix * gap}€</span>
        </div>

        <div className="room__reservation-info">
            <span className="room__span"> Frais de ménage</span>
            <span className="room__totalprice"> {fee}€</span>
        </div>

        <div className="room__reservation-info">
            <span className="room__span"> Caution</span>
            <span className="room__totalprice"> {deposit}€</span>
        </div>
        <div className="room__reservation-info">
            <span className="room__span"> Total</span>
            <span className="room__totalprice"> {total}€</span>
        </div>
    </div>        
</div>


</div>
  );
}

export default ReservationComponent;
