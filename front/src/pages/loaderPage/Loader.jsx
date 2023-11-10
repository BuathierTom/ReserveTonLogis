import React from "react";
import { useEffect } from "react";
import anime from 'animejs/lib/anime.es.js';
import HouseLoaderLogo from "../../components/HouseLoaderLogo";

function LoaderPage() {
    useEffect(() => {
      const opac = anime({
        targets: '.letter',
        opacity: 1,
        scale: 1,
        easing: 'easeInBounce',
        delay: (el, index) => {
          return index * 80;
        },
        direction: 'alternate',
        loop: true,
      });

      return () => {
        opac.pause(); 
      };
    }, []);

  return (
    <div className="loader__container">
      <div className="name">
        <div className="name__block">
        <div className="letter">R</div>
        <div className="letter">E</div>
        <div className="letter">S</div>
        <div className="letter">E</div>
        <div className="letter">R</div>
        <div className="letter">V</div>
        <div className="letter">E</div>

        </div>
        <div className="name__block">
        <div className="letter">T</div>
        <div className="letter">O</div>
        <div className="letter">N</div>
        </div>

        <div className="name__block">
        <div className="letter">L</div>
        <div className="letter">O</div>
        <div className="letter">G</div>
        <div className="letter">I</div>
        <div className="letter">S</div>
        </div>
      </div>
      <div className="loading-animation"> 
        <HouseLoaderLogo />
        </div>
    </div>
  );
}

export default LoaderPage;