const ApiCallDateReservation = () => {
    return fetch('https://reservetonlogis.onrender.com/reservations/getDatesReservations/' + window.location.pathname.split('/')[2])
        .then(response => response.json())
        
};

export default ApiCallDateReservation;





