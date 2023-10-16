const ApiCallReservation = () => {
    return fetch('http://localhost:3000/clients/getReservation')
        .then(response => response.json())
        
};

export default ApiCallReservation;


