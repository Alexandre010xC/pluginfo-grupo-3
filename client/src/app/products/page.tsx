'use client'
import React, { useEffect, useState } from 'react';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import ProductSlider from '../components/ProductSlider';
import { axiosInstance } from '../../../service/Products';

const Products = () => {
  const [products,setProducts] = useState<any>([])
  useEffect(() => {
    getData();
  },[]);

  const getData = async () => {
    try {
      const response = await axiosInstance.get(`get_products/`);
      setProducts(response.data.products);
      console.log(response.data);
    } catch (error) {}

  }

  return (
    <ProductSlider products={products} />
  );
};

export default Products;
