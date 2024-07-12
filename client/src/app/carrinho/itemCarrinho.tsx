'use client'
import styles from './itemCarrinho.module.css';
import Image from 'next/image';
import likeIcon from '@/assets/utilitary/like.svg';

const ItemCarrinho = () => {

    return (
        <main className={styles.carrinhoItens}>
          <h4 className={styles.tituloResponsivo}>Carrinho</h4>

          <div className={styles.containerProduto}>
            <section className={styles.produtoCarrinho}>
              <input type='checkbox' className={styles.checkboxProduto} />

              <Image width={120} height={128} src="/mock/po-facial.png" alt='produto'/>

              <div className={styles.infoProdutoCarrinho}>
                <p className={styles.marcaProduto}>Boca Rosa</p>
                <p className={styles.nomeProduto}>BOCA ROSA BEAUTY PÓ FACIAL BY PAYOT </p>
                <p className={styles.codigoProduto}>Código: 556564</p>
                <div className={styles.responsivoItens}>
                  <h5 className={styles.precoCarrinhoResponsivo}>R$ 40,00</h5>
                  <Image className={styles.figureFavoriteResponsivo} src={likeIcon} alt='like' width={20} height={20} />
                </div>
                
              </div>
            </section>

            <section className={styles.quantidadeProduto}>
              <button className={styles.buttonQuantidade}>+</button>
              <input className={styles.inputQuantidade} type="number" />
              <button className={styles.buttonQuantidade}>–</button>
            </section>

            <section className={styles.figureFavorite}>
              <Image className={styles.figureFavorite} src={likeIcon} alt='like' width={50} height={50} />
            </section>

            <section className={styles.precoCarrinho}>
              <h5>R$ 40,00</h5>
            </section>
          </div>

          <section className={styles.quantidadeProdutoResponsivo}>
              <button className={styles.buttonQuantidade}>+</button>
              <input className={styles.inputQuantidade} type="number"></input>
              <button className={styles.buttonQuantidade}>–</button>
          </section>

        </main>
      );
};

export default ItemCarrinho;