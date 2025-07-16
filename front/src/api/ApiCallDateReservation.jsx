const ApiCallDateReservation = () => {
    return fetch('https://api.reservetonlogis.buathier-tom.fr/reservations/getDatesReservations/' + window.location.pathname.split('/')[2])
        .then(response => response.json())
        
};

export default ApiCallDateReservation;





