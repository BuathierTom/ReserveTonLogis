const ApiCall = () => {
    return fetch('https://api.reservetonlogis.buathier-tom.fr/chambres/get/' + window.location.pathname.split('/')[2])
        .then(response => response.json())
        
};

export default ApiCall;

