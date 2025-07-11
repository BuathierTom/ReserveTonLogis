const ApiCall = () => {
    return fetch('https://reservetonlogis.onrender.com/chambres/get/' + window.location.pathname.split('/')[2])
        .then(response => response.json())
        
};

export default ApiCall;

