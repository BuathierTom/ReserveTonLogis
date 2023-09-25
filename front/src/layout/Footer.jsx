import React from "react";
import iconFacebook from "../assets/img/imgIcon/iconFacebook.png";
import iconTiktok from "../assets/img/imgIcon/icons8-tic-tac-24.png";
import iconInsta from "../assets/img/imgIcon/icons8-insta-24.png";

function Footer() {
    return ( 
        <>
            <div className="footer__container">
                <div className="footer__adress">
                    <span>Adresse du domaine</span>
                    <p>29 Rue Marcel Gauthier 37000 TOURS</p>
                </div>

                <div className="footer__follow">
                    <span>Nous suivre </span>
                    <div className="footer__social">
                        <img src={iconFacebook} alt="" />
                        <img src={iconTiktok} alt="" />
                        <img src={iconInsta} alt="" />
                    </div>
                </div>
                <div className="footer__information">
                    <ul className="footer__information-list">
                        <li className="footer__li"> <a href="#">Mentions légales</a></li>
                        <li className="footer__li"> <a href="#">Politique de confidentialité</a></li>
                        <li className="footer__li"> <a href="#">Conditions générales de vente</a></li>
                    </ul>

                </div>
            </div>
        </>

    );      
}

export default Footer;