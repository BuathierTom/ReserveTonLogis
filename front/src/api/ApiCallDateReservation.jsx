const ApiCallDateReservation = () => {
    console.log(window.location.pathname.split('/')[2])
    return fetch('http://localhost:5000/reservations/getDatesReservations/' + window.location.pathname.split('/')[2])
        .then(response => response.json())
        
};

export default ApiCallDateReservation;


