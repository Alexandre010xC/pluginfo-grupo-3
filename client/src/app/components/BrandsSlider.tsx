import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";

import ProductLineCard from "./ProductLineCard";
import esmaltesImage from '../../public/mock/esmaltes.png';

const BrandsSlider: React.FC = () => {

  const id = 1;
  const name = "Fenty Beauty";
  const description = "CORRETIVO FENTY INSTANT RETOUCH CONCEALER";
  const price = 130;

  const settings = {
    rows: 1,
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <Slider {...settings}>
      <div>
        <div><h3>Slide 1</h3></div>
        <div><h3>Slide 2</h3></div>
        <div><h3>Slide 3</h3></div>

      </div>
    </Slider>
  );
}

export default BrandsSlider;