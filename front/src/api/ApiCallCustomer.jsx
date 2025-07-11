const ApiCallCustomer = () => {
    return fetch('https://reservetonlogis.onrender.com/clients/get/')
        .then(response => response.json())
        
};

export default ApiCallCustomer;

