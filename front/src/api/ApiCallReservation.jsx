const ApiCallReservation = () => {
    return fetch('https://reservetonlogis.onrender.com/clients/getReservation')
        .then(response => response.json())
        
};

export default ApiCallReservation;


