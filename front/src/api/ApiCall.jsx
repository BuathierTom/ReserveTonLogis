
const ApiCall = () => {
    return fetch('http://localhost:3000/chambres/getAll')
        .then(response => response.json())
};

export default ApiCall;