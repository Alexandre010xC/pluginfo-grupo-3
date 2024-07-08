import { useState } from 'react';
import Image, { ImageProps } from "next/image";
import styles from './ProductLineCard.module.css';

import favoriteIcon from '@/assets/utilitary/like.svg'

interface ProductLineCardProp {
  image: ImageProps['src'];
  name: string;
}

const ProductLineCard: React.FC<ProductLineCardProp> = ({image, name}) => {
  return (
    <div className={styles.productLineCard}>
      <h5>{name}</h5>
      <Image className={styles.image} src={image} alt={name} />
      <button className={styles.seeMore}>Confira</button>
    </div>
  );
};

export default ProductLineCard;
