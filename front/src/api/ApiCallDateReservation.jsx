const ApiCallDateReservation = () => {
    return fetch('http://localhost:5000/reservations/getDatesReservations')
        .then(response => response.json())
        
};

export default ApiCallDateReservation;


