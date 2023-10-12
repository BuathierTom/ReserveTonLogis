const ApiCallCustomer = () => {
    return fetch('http://localhost:3000/clients/get/')
        .then(response => response.json())
        
};

export default ApiCallCustomer;

