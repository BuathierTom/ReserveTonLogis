const ApiCallReservation = () => {
    return fetch('http://localhost:5000/clients/getReservation')
        .then(response => response.json())
        
};

export default ApiCallReservation;


