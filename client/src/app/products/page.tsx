'use client'
import React from 'react';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import ProductSlider from '../components/ProductSlider';

const Products = () => {
  const products = [
    {
      id: 1,
      name: 'Fenty Beauty',
      description: 'CORRETIVO FENTY INSTANT RETOUCH CONCEALER',
      price: 130.00,
      imageUrl: '/mock/corretivo.png',
    },
    {
      id: 2,
      name: 'Bruna Tavares',
      description: 'ESPONJA PARA MAQUIAGEM BRUNA TAVARES BT BLENDER',
      price: 30.00,
      imageUrl: '/mock/esponja.png',
    },
    {
      id: 3,
      name: 'Boca Rosa',
      description: 'BOCA ROSA BEAUTY PÓ FACIAL BY PAYOT',
      price: 40.00,
      imageUrl: '/mock/po-facial.png',
    },
    {
      id: 4,
      name: 'Fenty Beauty',
      description: 'CORRETIVO FENTY INSTANT RETOUCH CONCEALER',
      price: 130.00,
      imageUrl: '/mock/corretivo.png',
    },
    {
      id: 5,
      name: 'Bruna Tavares',
      description: 'ESPONJA PARA MAQUIAGEM BRUNA TAVARES BT BLENDER',
      price: 30.00,
      imageUrl: '/mock/esponja.png',
    },
    {
      id: 6,
      name: 'Boca Rosa',
      description: 'BOCA ROSA BEAUTY PÓ FACIAL BY PAYOT',
      price: 40.00,
      imageUrl: '/mock/po-facial.png',
    },
    {
      id: 7,
      name: 'Fenty Beauty',
      description: 'CORRETIVO FENTY INSTANT RETOUCH CONCEALER',
      price: 130.00,
      imageUrl: '/mock/corretivo.png',
    },
    {
      id: 8,
      name: 'Bruna Tavares',
      description: 'ESPONJA PARA MAQUIAGEM BRUNA TAVARES BT BLENDER',
      price: 30.00,
      imageUrl: '/mock/esponja.png',
    },
    {
      id: 9,
      name: 'Boca Rosa',
      description: 'BOCA ROSA BEAUTY PÓ FACIAL BY PAYOT',
      price: 40.00,
      imageUrl: '/mock/po-facial.png',
    },
    {
      id: 10,
      name: 'Fenty Beauty',
      description: 'CORRETIVO FENTY INSTANT RETOUCH CONCEALER',
      price: 130.00,
      imageUrl: '/mock/corretivo.png',
    },
    {
      id: 11,
      name: 'Bruna Tavares',
      description: 'ESPONJA PARA MAQUIAGEM BRUNA TAVARES BT BLENDER',
      price: 30.00,
      imageUrl: '/mock/esponja.png',
    },
    {
      id: 12,
      name: 'Boca Rosa',
      description: 'BOCA ROSA BEAUTY PÓ FACIAL BY PAYOT',
      price: 40.00,
      imageUrl: '/mock/po-facial.png',
    },
    
  ];

  return (
    <ProductSlider products={products} />
  );
};

export default Products;
