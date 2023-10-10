import React, { useState } from "react";
import { useEffect } from "react";
import NavBar from "../../components/Navbar";
import ApiCall from "../../api/ApiCall";
import Footer from "../../layout/Footer";
import iconMenu from "../../assets/img/logo.png";
import IconBed from "../../assets/img/imgIcon/icons8-lit-50.png";
import IconWifi from "../../assets/img/imgIcon/icons8-wifi-48.png";
import iconDraps from "../../assets/img/imgIcon/draps.png";
import iconCars from "../../assets/img/imgIcon/cars.png";
import iconTv from "../../assets/img/imgIcon/tv.png";


function Room(){
    const [room, setRoom] = useState([]); 
    const [weatherData, setWeatherData] = useState(null);
    const giteLocation = [47.553903, 4.815041];


    useEffect(() => {
        ApiCall().then(data => {
            setRoom(data);
        })

    }
    , []);


    useEffect(() => {
        fetch(`https://api.weatherapi.com/v1/current.json?key=7889403755cb4ebc976103914230510&q=${giteLocation[0]},${giteLocation[1]}&aqi=no`)
        .then((response) => response.json())
        .then((data) => {
            setWeatherData(data);
        })
        .catch((error) => {
            console.error('Erreur lors de la récupération des données météo', error);
        });
    }, []);


    useEffect(() => {
        function handleResize() {
          const divElement = document.querySelector(".nav-bar");
          if (window.innerWidth > 769) {
            divElement.classList.add("nav-bar--color");
          } else {
            divElement.classList.remove("nav-bar--color");
          }
        }
    
        window.addEventListener("resize", handleResize);
        handleResize();
        return () => {
          window.removeEventListener("resize", handleResize);
        };
      }, []);




    return(
        <>
        <div className="nav-bar ">
            <NavBar />
        </div>

        <div className="room">
            <div className="room__container-fixed-reservation">
                <div className="room__container-fixed-reservation--content--button">
                    <button className="room__button">Réserver votre séjour</button>
                </div>
            </div>
            
            {room.map( (room) => (
                <div className="room__container" key={room.id}>

                    <div className="room__container-fixed">

                    <div className="room__container-title">
                        <h3 className="room__title">Chambre {room.nom}</h3>
                    </div>
                    <div className="room__container-weather">
                        <div className="room__container-weather-content">
                            <div className="room__container-weather-content-location">
                                <span className="room__text-weather">{weatherData?.location.name} </span>
                            </div>
                            <div className="room__container-weather-content-imgtemp">
                                <img className="room__img-weather" src={weatherData?.current.condition.icon} alt="" />
                                <span className="room__text-weather">{weatherData?.current.temp_c}°C </span>
                            </div>

                           
                            <div className="room__container-weather-content-date">
                                <span className="room__text-weather">{weatherData?.location.localtime}</span>
                            </div>
                        </div>
                    </div>
                    </div>
                    <div className="room__container-img">
                    <img className="room__img room__img-first" src={require(`../../assets/img-room/${room.image1}.jpg`)} alt="" />
                    <img className="room__img room__img-second" src={require(`../../assets/img-room/${room.image2}.jpg`)} alt="" />
                    <img className="room__img room__img-third" src={require(`../../assets/img-room/${room.image3}.jpg`)} alt="" />
                    <img className="room__img room__img-quaternary" src={require(`../../assets/img-room/${room.image4}.jpg`)} alt="" />
                    </div>

                    <div className="room__container-info">
                        <div className="room__placement-info">
                            <span className="room__name"> Chambre {room.nom}</span>
                            <div className="room__content-info"> 
                                <span className="room__capacity"> {room.capacite} personnes</span>
                                <span className="room__superficy"> {room.superficie} m²</span>
                            </div>
                        </div>
                        <div className="room__container-icon">
                            <img className="room__icon" src={iconMenu} alt="" />

                        </div>
                       

                    </div>
                    <div className="room__container-description">
                        <p className="room__description">{room.description}</p>
                    </div>
                </div>             
            ))}

            <div className="room__characteristics">
                <div className="room__characteristics-container">
                    <div className="room__characteristics-content">
                            <img className="room__characteristics-icon" src={IconWifi} alt="" />
                            <span className="room__characteristics-text">Wifi Gratuit</span>
                    </div>
                    <div className="room__characteristics-content">
                            <img className="room__characteristics-icon" src={iconTv} alt="" />
                            <span className="room__characteristics-text"> TV HD 43" avec Netflix</span>
                    </div>
                    <div className="room__characteristics-content">
                            <img className="room__characteristics-icon" src={IconBed} alt="" />
                            <span className="room__characteristics-text">1 Lit</span>
                    </div>
                    <div className="room__characteristics-content">
                            <img className="room__characteristics-icon" src={iconCars} alt="" />
                            <span className="room__characteristics-text">Parking gratuit sécurisé sur place</span>
                    </div>
                    <div className="room__characteristics-content">
                            <img className="room__characteristics-icon" src={iconDraps} alt="" />
                            <span className="room__characteristics-text">Draps - Linge de lit en coton</span>
                    </div>
                </div>
            </div>

        </div>  
        <div className="footer">
            <Footer />        
        </div>     
    </>
    )
}


export default Room;