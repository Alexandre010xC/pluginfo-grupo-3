'use client';
import React, { useEffect, useState } from 'react';
import { axiosInstance } from '../../../../service/Products';
import { useParams } from 'next/navigation';

const Product: React.FC = () => {
  const [product, setProduct] = useState({
    id:0,
    name:"",
    brand:"",
    price:0,
    description:"",
    tags:"",
    image_source:"",
    color:""}); 
  const params = useParams();
  const { id } = params as { id: string };

  if (!id) {
    return <div>Loading...</div>;
  }

  useEffect(() => {
    getData();
  },[product]);


  const getData = async () => {
    try {
      const response = await axiosInstance.get(`/get_product/${id}`);
      setProduct(response.data.product);

    } catch (error) {
      
    }
  }

  return (
    <div>
      {product.id}<br/>
      {product.name}<br/>
      {product.brand}<br/>
      {product.price}<br/>
      {product.description}<br/>
      {product.tags}<br/>
      {product.image_source}<br/>
      {product.color}<br/>
    </div>
  );
}

export default Product;
