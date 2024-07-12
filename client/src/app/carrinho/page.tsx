'use client'
import React, { useEffect, useState } from 'react';
import styles from './Carrinho.module.css';
import ItemCarrinho from './ItemCarrinho';
import { axiosInstance } from '../../../service/Products';

interface Product {
  id: number;
  price: number;
}

const Carrinho = () => {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const response = await axiosInstance.get<{ products: Product[] }>('/get_cart');
        setProducts(response.data.products);
      } catch (error) {
        console.error('Erro ao buscar carrinho', error);
      }
    };

    fetchCart();
  }, []);

  const handleProductsLoaded = (loadedProducts: Product[]) => {
    setProducts(loadedProducts);
  };

  const total = products.reduce((acc, product) => acc + product.price, 0);

  return (
    <main className={styles.mainCarrinho}>
      <ItemCarrinho onProductsLoaded={handleProductsLoaded} />

      <section className={styles.itemCarrinhoContainer}>
        <section className={styles.endereco}>
          <div className={styles.presenteResponsivo}>
            <input className={styles.checkboxResponsivo} type='checkbox' />
            <p className={styles.pcepResponsivo}>Este pedido é um presente</p>
          </div>

          <p className={styles.pcep}>Insira o CEP</p>
          <input className={styles.inputCEP} placeholder='00000-000' />
          <p className={styles.psixteen}>Não sabe o CEP?</p>
          <div className={styles.presente}>
            <input className={styles.checkbox} type='checkbox' />
            <p className={styles.pcep}>Este pedido é um presente</p>
          </div>
        </section>

        <section className={styles.informacoesPedido}>
          <div className={styles.valoresIndividuais}>
            <p className={styles.hsix}>Frete</p>
            <p className={styles.hsix}>R$00,00</p>
          </div>

          <div className={styles.valoresIndividuais}>
            <p className={styles.hsix}>Produto</p>
            <p className={styles.hsix}>R$ {total.toFixed(2)}</p>
          </div>

          <div className={styles.valoresIndividuais}>
            <p className={styles.hsix}>Descontos e adicionais</p>
            <p className={styles.hsix}>R$00,00</p>
          </div>

          <div className={styles.total}>
            <h5 className={styles.totalH}>Total</h5>
            <h5 className={styles.totalH}>R$ {total.toFixed(2)}</h5>
          </div>

          <button className={styles.finalButton}>CONTINUAR</button>
        </section>
      </section>
    </main>
  );
};

export default Carrinho;
