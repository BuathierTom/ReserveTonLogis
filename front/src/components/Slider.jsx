import React, { useState } from "react";
import imgSlider1 from "../assets/imgSlider/first.jpg";
import imgSlider2 from "../assets/imgSlider/second.jpg";
import imgSlider3 from "../assets/imgSlider/third.jpg";
import imgIcon from "../assets/img/imgIcon/icons8-arrière-50.png";
function Slider() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const slides = [imgSlider1, imgSlider2, imgSlider3];

  const nextSlide = () => {
    setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prevSlide) =>
      prevSlide === 0 ? slides.length - 1 : prevSlide - 1
    );
  };

  return (
    <div className="sliderDiv">
      <div className="slide__arrow-position">
        <div className="leftArrow" onClick={prevSlide}>
        <img className="icon" src={imgIcon} alt="" />
        </div>
        <div className="rightArrow" onClick={nextSlide}>
        <img className="icon-right" src={imgIcon} alt="" />
        </div>
      </div>

      <div className="slider__container">

          {slides.map((src, index) => (
            <div
              key={index}
              className={`slide ${
                index === currentSlide
                  ? "mainSlide"
                  : index === (currentSlide + 1) % slides.length
                  ? "rightSlide"
                  : "leftSlide"
              }`}
            >
              <img className="slide-img" src={src} alt="" />
            </div>
          ))}

      </div>

    </div>
  );
}

export default Slider;
