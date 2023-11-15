import React from "react";
import Header from "../../layout/Header";
import Slider from "../../components/Slider";
import Map from "../../components/Map";
import Footer from "../../layout/Footer";
import IconBed from "../../assets/img/imgIcon/icons8-lit-50.png";
import IconWifi from "../../assets/img/imgIcon/icons8-wifi-48.png";
import iconCars from "../../assets/img/imgIcon/cars.png";
import IconBath from "../../assets/img/imgIcon/icons8-baignoire-50 (1).png";
import IconWc from "../../assets/img/imgIcon/icons8-wc-50.png";
import ImgActivity1 from "../../assets/img-activity/wine.png";
import ImgActivity2 from "../../assets/img-activity/bike.png";
import ImgActivity3 from "../../assets/img-activity/city.png";
import ImgActivity4 from "../../assets/img-activity/visit.png";
import { useEffect,useState } from "react";
import Loader from "../loaderPage/Loader";
 



function Home () {
    const giteLocation = [47.407599, 0.714761 ];
    const [isloading, setloading] = useState(true);


    useEffect(() => {
        const isLoaded = sessionStorage.getItem("isLoaded");
    
        if (!isLoaded) {
          setTimeout(() => {
            setloading(false);
            sessionStorage.setItem("isLoaded", "true");
          }, 2500);
        } else {
          setloading(false);
        }
      }, []);

      
    const handleCardClick = (event) => {
        const link = event.currentTarget.getAttribute("data-link");
        if (link) {
          window.location.href = link;
        }
      };


    return ( 
        <>
         {isloading ? (
        <div className="loader">
        <Loader />
        </div>
      ) : (
        
        <>
            <Header />    
            <section className="presentation" id="accueil">
                    <h2 className="presentation__title" >Bienvenue au Domaine Des 4 Saisons</h2>
                    <h3 className="presentation__content-title">Présentation du Domaine</h3>

                    <div className="presentation__container">
                        <div className="presentation__content">
                            <p className="presentation__content-text">
                                Le Domaine Des 4 Saisons est un charmant gîte qui offre une expérience chaleureuse et accueillante tout au long de l'année. Il propose trois chambres joliment nommées : Oyats, Primevères et Marguerite. Chacune de ces chambres a été soigneusement aménagée pour offrir confort et intimité à ses invités.
                                
                                Les équipements modernes sont également mis à la disposition des visiteurs pour assurer un séjour agréable. Chaque chambre est équipée d'une connexion wifi pour permettre aux clients de rester connectés, et une télévision est également disponible dans les chambres pour ceux qui souhaitent se détendre devant leur émission préférée.

                                Le domaine offre également un parking sécurisé, assurant ainsi la tranquillité d'esprit des visiteurs en ce qui concerne la sécurité de leurs véhicules. Que vous soyez en voyage d'affaires ou en vacances, le Domaine Des 4 Saisons s'efforce de fournir une atmosphère accueillante et un service de qualité pour que votre séjour soit mémorable.

                                Que vous choisissiez la chambre Oyats, Primevères ou Marguerite, chaque espace est conçu avec soin pour refléter le charme du lieu et offrir un refuge confortable. Que ce soit pour explorer la région environnante ou simplement vous détendre dans un cadre paisible, le Domaine Des 4 Saisons aspire à répondre aux besoins variés de ses clients.
                            </p>
                        </div>
                        <div className="presentation__grid-icon">
                            <div className="presentation__icon-content">
                                <img className="presentation__icon" src={IconWifi} alt="" />
                                <p className="presentation__text" > Wifi Gratuit, facile d'accès et rapide</p>
                            </div>
                            <div className="presentation__icon-content">
                                <img className="presentation__icon" src={IconBed} alt="" />
                                <p className="presentation__text" > 3 chambres agréables et confortables </p>
                            </div>
                            <div className="presentation__icon-content">
                                <img className="presentation__icon" src={iconCars} alt="" />
                                <p className="presentation__text" > Parking gratuit sécurisé sur place </p>
                            </div>
                            <div className="presentation__icon-content">
                                <img className="presentation__icon" src={IconBath} alt="" />
                                <p className="presentation__text" > Douches et baignoires disponibles </p>
                            </div>
                        </div>
                    </div>
            </section>
            <section className="slider">
                <Slider />
            </section>

            <section id="room" className="journey">
            <div className="journey__title">
                <span className="journey__span">Les différentes chambres d'hôtes </span>
            </div>
            <div  className="journey__container">
                    <div className="card card-one" data-link="/room/1" onClick={handleCardClick}>
                        <div className="card__content">
                        <p className="card__title">Les Marguerites</p>
                        <p className="card__p">Une chambre en toute quiétude alliant modernité et tradition dans un gîte merveilleux  </p>
                        <a href="/room/1"  className="button">Réservez dès maintenant</a>
                        </div>
                    </div>
                

                    <div className="card card-two" data-link="/room/2" onClick={handleCardClick}>
                        <div className="card__content">
                        <p className="card__title">Les Primevères</p>
                        <p className="card__p">Les Primevères est une chambre d'hôtes possédants deux lits simples et une salle de bain privative.</p>
                        <a href="/room/2"  className="button"> Réservez dès maintenant</a>
                        </div>
                    </div>

                    <div className="card card-three" data-link="/room/3" onClick={handleCardClick}>
                        <div className="card__content">
                        <p className="card__title">Les Oyats</p>
                        <p className="card__p"> Les Oyats est une chambre d'hôtes possédant un lit double et un confort moderne.</p>
                        <a href="/room/3"  className="button">Réservez dès maintenant</a>
                        </div>
                    </div>
            </div>
        </section>   

        <section className="activity">  
            <div className="activity__title">
                <span className="activity__span">Les activitées proposées</span>
            </div>
            <div className="activity__container">
                <div className="activity__content activity__content--reverse">
                    <div className="activity__content-img">
                        <img className="activity__img img-cave" src={ImgActivity1} alt="" />
                    </div>
                    <div className="activity__content-text activity__content-text--reverse">
                        <span className="activity__content-title">Caves Duhard</span>
                        <p className="activity__content-p">Situées à Tours, les Caves Duhard sont réputées pour leur sélection de vins de la vallée de la Loire, en particulier les vins de Touraine. Vous pouvez y déguster une grande variété de vins blancs, rouges et rosés
                        </p>
                    </div>

                </div>
                <div className="activity__content">
                    <div className="activity__content-img">
                        <img className="activity__img img-ride" src={ImgActivity2} alt="" />
                    </div>
                    <div className="activity__content-text">
                        <span className="activity__content-title">Balade à vélo le long de la Loire</span>
                        <p className="activity__content-p">Une balade à vélo le long de la Loire est une excellente façon de profiter de la beauté naturelle de la vallée de la Loire en France.
                        </p>
                    </div>

                </div>
                <div className="activity__content activity__content--reverse">
                    <div className="activity__content-img">
                        <img className="activity__img img-Tours" src={ImgActivity3} alt="" />
                    </div>
                    <div className="activity__content-text activity__content-text--reverse">
                    <span className="activity__content-title">Visite de la ville de Tours</span>
                    <p className="activity__content-p">Visiter le Vieux Tours est une expérience agréable pour découvrir l'histoire, l'architecture et la culture de cette charmante ville de la vallée de la Loire en France.
                    </p>

                    </div>

                </div>
                <div className="activity__content activity__content">
                    <div className="activity__content-img">
                        <img className="activity__img img-garder" src={ImgActivity4} alt="" />
                    </div>
                    <div className="activity__content-text">
                    <span className="activity__content-title">Visite des jardins de Villandry</span>
                    <p className="activity__content-p">Les jardins de Villandry sont l'un des plus beaux jardins de la vallée de la Loire en France. Ils sont situés dans le village de Villandry, à environ 15 kilomètres de Tours.
                    </p>
                    </div>
                
                </div>
                    
            </div>
        </section>

        <section className="map">
            <Map giteLocation={giteLocation} />
        </section>

        <footer className="footer">
            <Footer />
        </footer>

        </> 
        )}
        </>
    )
}
export default Home;