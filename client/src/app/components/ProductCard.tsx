import Image, { ImageProps } from "next/image";
import Link from "next/link";
import styles from './ProductCard.module.css';

import favoriteIcon from '@/assets/utilitary/like.svg'

interface ProductCardProp {
  id: number,
  image: ImageProps['src'];
  name: string;
  description: string;
  price: number;
  admin: boolean;
}

const ProductCard: React.FC<ProductCardProp> = ({id, image, name, description, price, admin}) => {
  const formatted_price = new Intl.NumberFormat('pt-BR', {
    minimumFractionDigits: 2,
    maximumFractionDigits:2
  }).format(price);

  return (
    <div className={styles.productCard}>
      <div>
        <Link href={`/product/${id}`}>
          <Image className={styles.image} src={image} alt={name} width={312} height={328} />
          <h6>{name}</h6>
          <p className={styles.description}>{description}</p>
          </Link>
        <div className={styles.otherInfo}>
          <span className={styles.price}>R${formatted_price}</span>
          <Image className={styles.favoriteIcon} src={favoriteIcon} alt='Salvar como favorito' />
        </div>
      </div>
      
      {
        admin ?
          (<div className={styles.admin}>
            <Link className={styles.editProduct} href={`/updatepage/${id}`}><button>EDITAR PRODUTO</button></Link>
          </div>)
        :
          ""
      }
    </div>
  );
};

export default ProductCard;
