'use client'
import styles from './carrinho.module.css';
import ItemCarrinho from './itemCarrinho';

const Carrinho = () => {

    return (
      <main className={styles.mainCarrinho}>
        <ItemCarrinho />

        <section className={styles.itemCarrinhoContainer}>
          
          <section className={styles.endereco}>
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
              <p className={styles.hsix}>R$</p>
            </div>

            <div className={styles.valoresIndividuais}>
              <p className={styles.hsix}>Produto</p> 
              <p className={styles.hsix}>R$</p>
            </div>

            <div className={styles.valoresIndividuais}>
              <p className={styles.hsix}>Descontos e adicionais</p>
              <p className={styles.hsix}>R$</p>
            </div>

            <div className={styles.total}>
              <h5>Total</h5>
              <h5>R$</h5>
            </div>

            <button className={styles.finalButton}>Continuar</button>

          </section>
        </section>
      </main>
      );
};

export default Carrinho;