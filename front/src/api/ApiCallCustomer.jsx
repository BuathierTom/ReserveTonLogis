const ApiCallCustomer = () => {
    return fetch('http://localhost:5000/clients/get/')
        .then(response => response.json())
        
};

export default ApiCallCustomer;

