const ApiCallCustomer = () => {
    return fetch('http://localhost:3000/clients/get/' + window.location.pathname.split('/')[2])
        .then(response => response.json())
        
};

export default ApiCallCustomer;

