import React, { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import ReservationComponent from './ReservationComponent';
import ApiCallDateReservation from '../api/ApiCallDateReservation';

function CalendarReservation({ room, isOpen }) {
  const [arrivalDate, setArrivalDate] = useState(null);
  const [departureDate, setDepartureDate] = useState(null);
  const [isSelectingArrival, setIsSelectingArrival] = useState(true);
  const [dateReservation, setdateReservation] = useState([]);

  useEffect(() => {
    ApiCallDateReservation().then((data) => {
      setdateReservation(data);
    });
  }, []);

  function handleDateClick(date) {
    if (isSelectingArrival) {
      setArrivalDate(date);
      setIsSelectingArrival(false);
      if (departureDate && date >= departureDate) {
      }
    } else {
      setDepartureDate(date);
      setIsSelectingArrival(true);
    }
  }

  function getTileClassName({ date }) {
    const arrivalDateOnly = arrivalDate
      ? new Date(
          arrivalDate.getFullYear(),
          arrivalDate.getMonth(),
          arrivalDate.getDate()
        )
      : null;
    const departureDateOnly = departureDate
      ? new Date(
          departureDate.getFullYear(),
          departureDate.getMonth(),
          departureDate.getDate()
        )
      : null;

    const currentDateOnly = new Date(
      date.getFullYear(),
      date.getMonth(),
      date.getDate()
    );

    let classes = '';

    if (arrivalDateOnly && currentDateOnly.getTime() === arrivalDateOnly.getTime()) {
      classes += 'selected-case ';
    }

    if (departureDateOnly && currentDateOnly.getTime() === departureDateOnly.getTime()) 
    {
      if (departureDateOnly.getTime() > arrivalDateOnly.getTime()) {
      classes += 'selected-case ';
      }
    }

    if ( arrivalDateOnly && departureDateOnly && currentDateOnly > arrivalDateOnly && currentDateOnly < departureDateOnly) {
      classes += 'selected-range ';
    }

    if (isDateReserved(date)) {
      classes += 'reserved';
    }

    return classes.trim();
  }

  function isDateReserved(date) {
    if (date < new Date()) {
      return true;
    }

    for (const reservation of dateReservation) {
      const arrival = new Date(reservation.date_arrive);
      const departure = new Date(reservation.date_depart);

      const arrivalDateOnly = new Date(
        arrival.getFullYear(),
        arrival.getMonth(),
        arrival.getDate()
      );
      const departureDateOnly = new Date(
        departure.getFullYear(),
        departure.getMonth(),
        departure.getDate()
      );
      const currentDateOnly = new Date(
        date.getFullYear(),
        date.getMonth(),
        date.getDate()
      );

      if (
        currentDateOnly >= arrivalDateOnly &&
        currentDateOnly <= departureDateOnly
      ) {
        return true;
      }
    }

    return false;
  }

  return (
    <>
      <div className='room__calendar'>
        <Calendar
          onClickDay={handleDateClick}
          tileDisabled={({ date }) => isDateReserved(date)}
          tileClassName={getTileClassName}
        />
      </div>

      {window.innerWidth <= 767 ? (
        isOpen && (
          <div className='room__reservation-fixed'>
            <ReservationComponent
              room={room}
              arrivalDate={arrivalDate}
              departureDate={departureDate}
            />
          </div>
        )
      ) : (
        <div className='room__reservation-fixed'>
          <ReservationComponent
            room={room}
            arrivalDate={arrivalDate}
            departureDate={departureDate}
          />
        </div>
      )}
    </>
  );
}

export default CalendarReservation;
