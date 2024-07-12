'use client'
import styles from './CarrinhoVazio.module.css';
import Image from 'next/image';

import EmptyCart from '@/assets/responses/empty-cart.svg'
import { useRouter } from 'next/navigation';

const CarrinhoVazio = () => {

    const router = useRouter();

  const getToBuy = () => {
    router.push('/products');
  };

  return (
    <main className={styles.mainCarrinhoVazio}>
        <h4 className={styles.tituloResponsivo}>Carrinho Vazio</h4>
        <Image className={styles.normal} alt='Carrinho Vazio' src={EmptyCart} width={500} height={500} />
        <Image className={styles.responsivo} alt='Carrinho Vazio' src={EmptyCart} width={288} height={304} />
        <button onClick={getToBuy}className={styles.finalButton}>CONTINUAR COMPRANDO</button>
      
    </main>
  );
};

export default CarrinhoVazio;
