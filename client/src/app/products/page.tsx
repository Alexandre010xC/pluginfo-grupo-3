'use client'
import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import ProductSlider from '../components/ProductSlider';
import { axiosInstance } from '../../../service/Products';

const Products = () => {
  const params = useSearchParams();
  const name = params.get('name');
  const tags = params.get('tags');
  const quantity = params.get('quantity');
  const [products,setProducts] = useState<any>([])
  const admin = false;

  useEffect(() => {
    getData();
    
  },[name, tags, quantity]);
  
  const getData = async () => {
    try {
      const response = await axiosInstance.get(`filter_products/`, {
        params: {
          name,
          tags,
          quantity,
        },
      });

      if(!response.data)
        return console.error('Nenhum produto encontrado');

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
    <ProductSlider products={products} admin={admin} />
  );
};

export default Products;
