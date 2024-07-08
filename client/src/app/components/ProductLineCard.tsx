import { useState } from 'react';
import Image, { ImageProps } from "next/image";
import styles from './ProductCard.module.css';

import favoriteIcon from '@/assets/utilitary/like.svg'

interface ProductLineCardProp {
  image: ImageProps['src'];
  name: string;
  description: string;
  price: number;
}

const ProductCard: React.FC<ProductLineCardProp> = ({image, name, description, price}) => {
  const formatted_price = new Intl.NumberFormat('pt-BR', {
    minimumFractionDigits: 2,
    maximumFractionDigits:2
  }).format(price);

  return (
    <div className={styles.productCard}>
      <Image src={image} alt={name} />
      <div>
        <h6>{name}</h6>
        <p>{description}</p>
        <div className={styles.otherInfo}>
          <span className={styles.price}>R${formatted_price}</span>
          <Image className={styles.favoriteIcon} src={favoriteIcon} alt='Salvar como favorito' />
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
