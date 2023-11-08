import React, { useState} from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

function ReservationComponent( {room} ) {
  const [personnes, setpersonnes] = useState(1);
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const differenceEnMilliseconds = endDate - startDate
  const gap = Math.floor(differenceEnMilliseconds / (1000 * 60 * 60 * 24)+1);

    
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
  const handlepersonnesChange = (e) => {
    setpersonnes(e.target.value);
  };


  const onclickapi = () => {
    const formattedStartDate = startDate.toISOString().split('T')[0];
    const formattedEndDate = endDate.toISOString().split('T')[0];
    const formData = new URLSearchParams();
    formData.append("date_arrive", formattedStartDate);
    formData.append("date_depart", formattedEndDate);
    formData.append("id_chambre", window.location.href.split("/")[4]);
    formData.append("id_client", 30);
    formData.append("nb_personnes", personnes);


    fetch("http://localhost:5000/reservations/create", {
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



  return (
  
  <div className="room__reservation">
    <div className="room__reservation-price">
    <span className="room__reservation-price">{room.prix}€ </span>
    <span className="room__reservation-text">par nuit</span>
</div>
<div className="room__reservation-context-container">
    <div className="room__reservation-context">
        <div className="room__reservation-flex">
            <div className="room__reservation-arrival">
            <span className="room__span">Arrivée</span>
            <DatePicker dateFormat="dd/MM/yyyy" selected={startDate} onChange={handleStartDateChange} name="startDate" />
        </div>
        <div className="room__reservation-departure">
            <span className="room__span">Départ</span>
            <DatePicker dateFormat="dd/MM/yyyy" selected={endDate } onChange={handleEndDateChange} name="endDate" />
        </div>
            
        </div>

        <div className="room__reservation-peoples">
            <span className="room__span">Personnes</span>
            <select className="room__select" value={personnes} onChange={handlepersonnesChange}>
                <option value="1">1 personne</option>
                <option value="2">2 personnes</option>
            </select>
        </div>
        <div className="room__reservation-info">
            <span className="room__span"> {room.prix} x {gap}  nuit(s)</span>
          

        </div>
    </div>        
</div>

<button className="room__button room_reservation-button" onClick={onclickapi}>Réserver</button>

</div>
  );
}

export default ReservationComponent;
