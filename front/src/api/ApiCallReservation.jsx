const ApiCallReservation = () => {
    return fetch('https://api.reservetonlogis.buathier-tom.fr/clients/getReservation')
        .then(response => response.json())
        
};

export default ApiCallReservation;


