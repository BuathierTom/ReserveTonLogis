
const ApiCall = () => {
    return fetch('http://localhost:3000/chambres/get/' + window.location.pathname.split('/')[2])
        .then(response => response.json())
        
};

export default ApiCall;

