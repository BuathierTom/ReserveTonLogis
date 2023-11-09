import React, { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import ReservationComponent from './ReservationComponent';
import ApiCallDateReservation from '../api/ApiCallDateReservation';

function CalendarReservation( {room, isOpen } ) {
  const [arrivalDate, setArrivalDate] = useState(null);
  const [departureDate, setDepartureDate] = useState(null);
  const [isSelectingArrival, setIsSelectingArrival] = useState(true);
  const [isOpenedResize, setIsOpenedResize] = useState(false);
  const [dateReservation, setdateReservation] = useState([])



  console.log(isOpen);

  useEffect(() => {
    ApiCallDateReservation().then(data => {
        setdateReservation(data);
    })
}
, []);

console.log(dateReservation)


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

    {window.innerWidth <= 767 ? ( // En version mobile
    isOpen && (
        <div className='room__reservation-fixed'>
            <ReservationComponent room={room} arrivalDate={arrivalDate} departureDate={departureDate} />
        </div>
    )
) : ( // En version desktop
    <div className='room__reservation-fixed'>
        <ReservationComponent room={room} arrivalDate={arrivalDate} departureDate={departureDate} />
    </div>
)}

    </>

    
  );
}

export default CalendarReservation;
