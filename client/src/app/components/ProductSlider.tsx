import React from 'react';
import Slider from 'react-slick';
import styles from './ProductSlider.module.css';
import ProductCard from './ProductCard';

interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
}

interface ProductSliderProps {
  products: Product[];
}

const ProductSlider: React.FC<ProductSliderProps> = ({ products }) => {
  const settings = {
    rows: 3,
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: undefined,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: false,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <div className={styles.productSlider}>
      <h4>Produtos</h4>
      <span>N produtos</span>
      <Slider {...settings}>
        {products.map((product) => (
          <ProductCard image={product.imageUrl} name={product.name} description={product.description} price={product.price} />
        ))}
      </Slider>
    </div>
  );
};

export default ProductSlider;
