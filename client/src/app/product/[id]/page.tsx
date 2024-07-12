'use client';
import React, { useEffect, useState } from 'react';
import { axiosInstance } from '../../../../service/Products';
import { notFound, useParams } from 'next/navigation';
import Image from 'next/image';
import styles from './page.module.css';


import favoriteIcon from '@/assets/utilitary/like.svg';
import ProductCard from '@/app/components/ProductCard';
import Link from 'next/link';

//
import corretivoImage from '../../../../public/mock/corretivo.png';
import ProductNotFound from '@/app/components/ProductNotFound';
import OutrosProdutos from '@/app/components/OutrosProdutos';
import ItemSemelhantes from '@/app/components/ItemSemelhantes';
//

const Product = () => {
  const params = useParams();
  const { id } = params as { id: string };
  const [product, setProduct] = useState<any>(null);
  const [primaryImage, setPrimaryImage] = useState<string>('');
  const [secondaryImages, setSecondaryImages] = useState<string[]>([]);
  const [notFound, setNotFound] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    getData();
  },[]);

  const getData = async () => {
    try {
      const response = await axiosInstance.get(`/get_product/${id}`);

      console.log(response.status);
      if(response.status === 404){
        setNotFound(true);
        return <ProductNotFound />;
      }

      setProduct(response.data.product);

      let secondaryImages: string[] = [""];
      secondaryImages.pop();

      response.data.product.image_source.split(', ').map((image: string, index: number) =>{
        index === 0 ?
          setPrimaryImage(`/mock/${image}`)
        :
          secondaryImages.push(`/mock/${image}`);
        }
      )

      setSecondaryImages(secondaryImages);

      setLoading(false)
    } catch (error) {
      
    }
  }


  //

  const prod_id = 1;
  const name = "Fenty Beauty";
  const description = "CORRETIVO FENTY INSTANT RETOUCH CONCEALER";
  const price = 130;

  //

  if(notFound)
    return <ProductNotFound />
  
  if(!loading)
    return (
      <div className={styles.mainContent}>

        <section className={styles.product}>

          <div className={styles.images}>

            <div className={styles.secondaryImages}>
              {secondaryImages.map((image, index) => 
                <img key={index} className={styles.secondaryImage} src={image} alt={product.name} />
              )}
            </div>

              <img className={styles.primaryImage} src={primaryImage} alt={product.name} />
            </div>

          <div className={styles.information}>

            <div className={styles.main}>

              <div className={styles.brandName}>

                <div className={styles.heading}>
                  <h4 className={styles.desktop}>{product.brand}</h4>
                  <p className={styles.reponsivo}>{product.brand}</p>
                  <Image className={styles.favoriteIcon} src={favoriteIcon} alt="Favoritar produto" />
                </div>

                <span className={styles.name}>{product.name}</span>

              </div>


              <div className={styles.colors}>
                {
                  product.color.split(', ').map((color:string) =>
                    <div className={styles.colorItem} style={{backgroundColor: color}}></div>
                  )
                }
              </div>

              <span className={styles.price}>R$ {product.price}</span>
            </div>
            
            <div className={styles.about}>
              <span className={styles.heading}>sobre o produto</span>
              <p className={styles.description}>{product.description}</p>
            </div>

            <button className={styles.buyNow}>COMPRE AGORA</button>
          </div>

          
        </section>

        <ItemSemelhantes />
        <OutrosProdutos />
        
      </div>
    );
}

export default Product;