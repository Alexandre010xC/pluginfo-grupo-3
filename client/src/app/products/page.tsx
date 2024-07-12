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

      const processedProducts = response.data.products.map((product: any) => {
        const imageSources = product.image_source.split(', ').map((image: string) => ({ src: `/mock/${image}` }));
        return {
          ...product,
          image_sources: imageSources,
          primaryImage: imageSources[0]?.src || '',
          secondaryImages: imageSources.slice(1).map((image: { src: any; }) => image.src),
        };
      });
      
      setProducts(processedProducts);
    } catch (error) {
      console.error('Error fetching products:', error);
    }

  }

  return (
    <ProductSlider products={products} />
  );
};

export default Products;
