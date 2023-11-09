import React, { useState } from 'react';
import Calendar from 'react-calendar';
import ReservationComponent from './ReservationComponent';

function CalendarReservation( {room}) {
  const [arrivalDate, setArrivalDate] = useState(null);
  const [departureDate, setDepartureDate] = useState(null);
  const [isSelectingArrival, setIsSelectingArrival] = useState(true);

  function handleDateClick(date) {
    if (isSelectingArrival) {
      setArrivalDate(date);
      setIsSelectingArrival(false);
      if (departureDate && date >= departureDate) {
        // Si la date d'arrivée est supérieure ou égale à la date de départ, ajustez la date de départ
        const nextDay = new Date(date);
        nextDay.setDate(nextDay.getDate() + 1);
        setDepartureDate(nextDay);
      }
    } else {
      setDepartureDate(date);
      setIsSelectingArrival(true);
    }
  }
  return (
    <>
    <div className='room__calendar'>
      <Calendar onClickDay={handleDateClick} />
     
    </div>

    <div className='room__reservation'>
      <ReservationComponent room={room} arrivalDate={arrivalDate} departureDate={departureDate} />
    </div>

    </>

    
  );
}

export default CalendarReservation;
