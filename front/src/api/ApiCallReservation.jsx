const ApiCallReservation = () => {
    return fetch('http://localhost:3000/clients/getReservation' + window.location.pathname.split('/')[2])
        .then(response => response.json())
        
};

export default ApiCallReservation;


