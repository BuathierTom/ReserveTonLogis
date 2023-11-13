import React, { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import ReservationComponent from './ReservationComponent';
import ApiCallDateReservation from '../api/ApiCallDateReservation';

function CalendarReservation( {room, isOpen } ) {
  const [arrivalDate, setArrivalDate] = useState(null);
  const [departureDate, setDepartureDate] = useState(null);
  const [isSelectingArrival, setIsSelectingArrival] = useState(true);
  const [dateReservation, setdateReservation] = useState([])


  useEffect(() => {
    ApiCallDateReservation().then(data => {
        setdateReservation(data);
    })
}
, []);


  function handleDateClick(date) {
    if (isSelectingArrival) {
      setArrivalDate(date);
      setIsSelectingArrival(false);
      if (departureDate && date >= departureDate) {
        const nextDay = new Date(date);
        nextDay.setDate(nextDay.getDate() + 1);
        setDepartureDate(nextDay);
      }
    } else {
      setDepartureDate(date);
      setIsSelectingArrival(true);
    }
  }
  function isDateReserved(date) {
    for (const reservation of dateReservation) {
      const arrival = new Date(reservation.date_arrive);
      const departure = new Date(reservation.date_depart);
  
      // Convertir les dates en objets avec uniquement la date
      const arrivalDateOnly = new Date(arrival.getFullYear(), arrival.getMonth(), arrival.getDate());
      const departureDateOnly = new Date(departure.getFullYear(), departure.getMonth(), departure.getDate());
      const currentDateOnly = new Date(date.getFullYear(), date.getMonth(), date.getDate());
  
      if (currentDateOnly >= arrivalDateOnly && currentDateOnly <= departureDateOnly) {
        return true;
      }
  
      if (currentDateOnly < new Date()) {
        return true;
      }
    }
    return false;
  }

  return (
    <>
    <div className='room__calendar'>
        <Calendar onClickDay={handleDateClick} tileDisabled={({ date }) => isDateReserved(date)} />
     
    </div>

    {window.innerWidth <= 767 ? ( // En version mobile
    isOpen && (
      <div className='room__reservation-fixed'>
      <ReservationComponent room={room} arrivalDate={arrivalDate} departureDate={departureDate} isDateReserved={isDateReserved} />

  </div>
    )
) : ( // En version desktop
    <div className='room__reservation-fixed'>
        <ReservationComponent room={room} arrivalDate={arrivalDate} departureDate={departureDate} isDateReserved={isDateReserved} />

    </div>
)}

    </>

    
  );
}

export default CalendarReservation;
