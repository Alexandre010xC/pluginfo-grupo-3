'use client';
import { useRouter } from 'next/navigation';
import styles from "./OutrosProdutos.module.css";
import favoriteIcon from '@/assets/utilitary/like.svg'
import Image from 'next/image';

const OutrosProdutos = () => {
  const router = useRouter();

  const goToProducts = () => {
    router.push('/products');
  };

  const goToCorretivo = () => {
    router.push('/product/10');
  };

  const goToPo = () => {
    router.push('/product/7');
  };

  const goToEsponja = () => {
    router.push('/product/13');
  };

  return (
    <main className={styles.products}>
        <section className={styles.heading}>
          <h4 className={styles.normal}>Outros Produtos</h4>
          <p className={styles.responsivoOther}>Outros Produtos</p>

          <p className={styles.click}onClick={goToProducts}>Ver mais</p>
        </section>

        <section className={styles.product_list}>

            <div className={styles.productCardSumir}>
                <div onClick={goToPo}>
                    <Image className={styles.image} src='/mock/po-facial.png' alt="corretivo" width={312} height={328} />
                    <Image className={styles.imageResponsivo} src='/mock/po-facial.png' alt="corretivo" width={134} height={149} />
                    <h6 className={styles.titleResponse}>Boca Rosa</h6>
                    <p className={styles.responsivo}>Boca Rosa</p>
                    <p className={styles.description}>BOCA ROSA BEAUTY PÓ FACIAL BY PAYOT </p>
                    <div className={styles.otherInfo}>
                        <span className={styles.price}>R$40,00</span>
                        <Image className={styles.favoriteIcon} src={favoriteIcon} alt='Salvar como favorito' />
                    </div>
                </div>
            </div>

            <div className={styles.productCard}>
                <div onClick={goToEsponja}>
                    <Image className={styles.image} src='/mock/esponja.png' alt="corretivo" width={312} height={328} />
                    <Image className={styles.imageResponsivo} src='/mock/esponja.png' alt="corretivo" width={134} height={149} />
                    <h6 className={styles.titleResponse}>Bruna Tavares</h6>
                    <p className={styles.responsivo}>Bruna Tavares</p>
                    <p className={styles.description}>ESPONJA PARA MAQUIAGEM BRUNA TAVARES BT BLENDER</p>
                    <div className={styles.otherInfo}>
                        <span className={styles.price}>R$30,00</span>
                        <Image className={styles.favoriteIcon} src={favoriteIcon} alt='Salvar como favorito' />
                    </div>
                </div>
            </div>

            <div className={styles.productCard}>
                <div onClick={goToCorretivo}>
                    <Image className={styles.image} src='/mock/corretivo.png' alt="corretivo" width={312} height={328} />
                    <Image className={styles.imageResponsivo} src='/mock/corretivo.png' alt="corretivo" width={134} height={149} />
                    <h6 className={styles.titleResponse}>Fenty Beauty</h6>
                    <p className={styles.responsivo}>Fenty Beauty</p>
                    <p className={styles.description}>CORRETIVO FENTY INSTANT RETOUCH CONCEALER</p>
                    <div className={styles.otherInfo}>
                        <span className={styles.price}>R$130,00</span>
                        <Image className={styles.favoriteIcon} src={favoriteIcon} alt='Salvar como favorito' />
                        <Image className={styles.imageResponsivo} width={20} height={20} src={favoriteIcon} alt='Salvar como favorito' />
                    </div>
                </div>
            </div>

        </section>
    </main>
  );
}

export default OutrosProdutos;
