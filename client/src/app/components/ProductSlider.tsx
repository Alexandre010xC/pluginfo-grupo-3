import React from 'react';
import Slider from 'react-slick';
import styles from './ProductSlider.module.css';
import ProductCard from './ProductCard';
import Link from 'next/link';

interface Product {
  id: number;
  name: string;
  brand: string;
  color: string;
  description: string;
  price: number;
  tags: string;
  image_source: string;
  image_sources: any[];
  primaryImage: string;
  secondaryImages: string[]
}

interface ProductSliderProps {
  products: Product[];
  admin: boolean;
}

const ProductSlider: React.FC<ProductSliderProps> = ({ products, admin }) => {
  const countProducts = products.length;
  const settings = {
    rows: 3,
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 3,
    initialSlide: 0,
    mobileFirst: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
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
          slidesToShow: 2,
          slidesToScroll: 2,
        },
      },
    ],
  };

  return (
    <div className={styles.productSlider}>
      <div className={styles.heading}>
        <div className={styles.information}>
          

          {
            !admin ?
              (<h4>Produtos</h4>)
            :
              ""
          }

          {
            admin ?
              (<h4>Página de edição</h4>)
            :
              ""
          }

          <span>{countProducts} produtos</span>
        </div>
          {
            admin ?
              (<div className={styles.admin}>
                <Link className={styles.createProduct} href='/createpage'><button>CRIAR PRODUTO</button></Link>
              </div>)
            :
              ""
          }
      </div>
      
      <Slider {...settings}>
        {products.map((product) => (
          <ProductCard key={product.id} id={product.id} image={product.primaryImage} name={product.brand} description={product.name} price={product.price} admin={admin} />
        ))}
      </Slider>
    </div>
  );
};

export default ProductSlider;
