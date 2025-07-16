const ApiCallCustomer = () => {
    return fetch('https://api.reservetonlogis.buathier-tom.fr/clients/get/')
        .then(response => response.json())
        
};

export default ApiCallCustomer;

