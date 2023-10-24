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
      <div class="name">
        <div className="name__block">
        <div class="letter">R</div>
        <div class="letter">E</div>
        <div class="letter">S</div>
        <div class="letter">E</div>
        <div class="letter">R</div>
        <div class="letter">V</div>
        <div class="letter">E</div>

        </div>
        <div className="name__block">
        <div class="letter">T</div>
        <div class="letter">O</div>
        <div class="letter">N</div>
        </div>

        <div className="name__block">
        <div class="letter">L</div>
        <div class="letter">O</div>
        <div class="letter">G</div>
        <div class="letter">I</div>
        <div class="letter">S</div>
        </div>
      </div>
      <div className="loading-animation"> 
        <HouseLoaderLogo />
        </div>
    </div>
  );
}

export default LoaderPage;