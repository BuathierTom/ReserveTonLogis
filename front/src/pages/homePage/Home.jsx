import React from "react";
import Header from "../../layout/Header";
import Slider from "../../components/Slider";
import Map from "../../components/Map";
import Footer from "../../layout/Footer";
import IconBed from "../../assets/img/imgIcon/icons8-lit-50.png";
import IconWifi from "../../assets/img/imgIcon/icons8-wifi-48.png";
import IconBath from "../../assets/img/imgIcon/icons8-baignoire-50 (1).png";
import IconWc from "../../assets/img/imgIcon/icons8-wc-50.png";
import ImgActivity1 from "../../assets/img-activity/wine.png";
import ImgActivity2 from "../../assets/img-activity/bike.png";
import ImgActivity3 from "../../assets/img-activity/city.png";
import ImgActivity4 from "../../assets/img-activity/visit.png";
 



function Home () {
    const giteLocation = [47.553903, 4.815041];
    return ( 
        <>
            <Header />    
            <section className="presentation">
                    <h2 className="presentation__title" >Bienvenue au Domaine Des 4 Saisons</h2>
                    <h3 className="presentation__content-title">Presentation du Domaine</h3>


                    <div className="presentation__container">
                        <div className="presentation__content">
                            <p className="presentation__content-text">Lorem Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis pretium nisi eget justo pellentesque volutpat. Nullam a ipsum odio. Vestibulum leo mi, gravida vitae leo non, viverra rutrum leo. Suspendisse sed rhoncus est, nec suscipit lorem. Maecenas quis consectetur ligula, 
                                et molestie nisl. Nam congue maximus convallis. Aenean vulputate arcu fringilla dui ultricies, quis ultricies nibh dapibus. In malesuada laoreet arcu, non mattis elit mollis ac. Vestibulum vene
                                natis placerat malesuada. Quisque sit amet felis non ex condimentum ullamcorper ac quis dui. Lorem Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis pretium nisi eget justo pellentesque volutpat. Nullam a ipsum odio. Vestibulum leo mi, gravida vitae leo non, viverra rutrum leo. Suspendisse sed rhoncus est, nec suscipit lorem. Maecenas quis consectetur ligula, 
                                et molestie nisl. Nam congue maximus convallis.
                            </p>
                        </div>
                        <div className="presentation__grid-icon">
                            <div className="presentation__icon-content">
                                <img className="presentation__icon" src={IconWifi} alt="" />
                                <p className="presentation__text" > Lorem ipsum dolor sit amet, consectetur adipiscing elit</p>
                            </div>
                            <div className="presentation__icon-content">
                                <img className="presentation__icon" src={IconBed} alt="" />
                                <p className="presentation__text" > Lorem ipsum dolor sit amet, consectetur adipiscing elit</p>
                            </div>
                            <div className="presentation__icon-content">
                                <img className="presentation__icon" src={IconBath} alt="" />
                                <p className="presentation__text" > Lorem ipsum dolor sit amet, consectetur adipiscing elit</p>
                            </div>
                            <div className="presentation__icon-content">
                                <img className="presentation__icon" src={IconWc} alt="" />
                                <p className="presentation__text" > Lorem ipsum dolor sit amet, consectetur adipiscing elit</p>
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
                <div className="card card-one"> 
                    <div className="card__content">
                    <p className="card__title">Les Marguerites</p>
                    <p className="card__p">Une chambre en toute quiétude aliant modernité et tradition dans un gîte merveilleux  </p>
                    <a href="/room/1"  className="button">Réservez dès maintenant</a>
                    </div>
                </div>

                <div className="card card-two"> 
                    <div className="card__content">
                    <p className="card__title">Les Primevères</p>
                    <p className="card__p">Les Primevères est une chambre d'hôtes possédant deux lit simple et une salle de bain privative.</p>
                    <a href="/room/2"  className="button"> Réservez dès maintenant</a>
                    </div>
                </div>

                <div className="card card-three"> 
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
                <span className="activity__span">Les activités proposés</span>
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
export default Home;