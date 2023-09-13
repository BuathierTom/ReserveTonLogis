import React from "react";
import Header from "../../layout/Header";
import Slider from "../../components/Slider";
import IconBed from "../../assets/img/imgIcon/icons8-lit-50.png";
import IconWifi from "../../assets/img/imgIcon/icons8-wifi-48.png";
import IconBath from "../../assets/img/imgIcon/icons8-baignoire-50 (1).png";
import IconWc from "../../assets/img/imgIcon/icons8-wc-50.png";



function Home () {
    return ( 

        <>
            <Header />    
            <section className="presentation">
                    <h2 className="presentation__title" >Bienvenue au Domaine Des 4 Saisons</h2>

                    <div className="presentation__container">
                        <div className="presentation__content">
                            <h3 className="presentation__content-title">Presentation du Domaine</h3>
                            <p className="presentation__content-text">Lorem Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis pretium nisi eget justo pellentesque volutpat. Nullam a ipsum odio. Vestibulum leo mi, gravida vitae leo non, viverra rutrum leo. Suspendisse sed rhoncus est, nec suscipit lorem. Maecenas quis consectetur ligula, 
                                et molestie nisl. Nam congue maximus convallis. Aenean vulputate arcu fringilla dui ultricies, quis ultricies nibh dapibus. In malesuada laoreet arcu, non mattis elit mollis ac. Vestibulum vene
                                natis placerat malesuada. Quisque sit amet felis non ex condimentum ullamcorper ac quis dui
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

            <section class="journey">
            <div class="journey__title">
                <span class="journey__span">Les différentes chambres d'hôtes </span>
            </div>
            <div class="journey__container"> 
                <div class="card card-one"> 
                    <div class="card__content">
                    <p class="card__title">Les marguerites</p>
                    <p class="card__p">Si vous souhaitez faire du co-voiturage pour vous rendre jusqu'à l'IUT, Cliquez juste en dessous</p>
                    <a href="/" target="_blank" class="button">Réservez dès maintenant</a>
                    </div>
                </div>

                <div class="card card-two"> 
                    <div class="card__content">
                    <p class="card__title">Les Primevères</p>
                    <p class="card__p">Si vous souhaitez prendre le bus pour vous rendre jusqu'à l'IUT, Cliquez juste en dessous.</p>
                    <a href="/" target="_blank" class="button"> Réservez dès maintenant</a>
                    </div>
                </div>

                <div class="card card-three"> 
                    <div class="card__content">
                    <p class="card__title">Les Oyats</p>
                    <p class="card__p">Si vous souhaitez prendre le train pour vous rendre jusqu'à l'IUT, Cliquez juste en dessous.</p>
                    <a href="/" target="_blank" class="button">Réservez dès maintenant</a>
                    </div>
                </div>
            </div>
        </section>     

    </>
    )}
export default Home;