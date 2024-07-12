'use client'
import styles from './Carrinho.module.css';
import ItemCarrinho from './itemCarrinho';

const Carrinho = () => {

    return (
      <main className={styles.mainCarrinho}>
        <ItemCarrinho />

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
              <p className={styles.hsix}>R$00,00</p>
            </div>

            <div className={styles.valoresIndividuais}>
              <p className={styles.hsix}>Descontos e adicionais</p>
              <p className={styles.hsix}>R$00,00</p>
            </div>

            <div className={styles.total}>
              <h5 className={styles.totalH}>Total</h5>
              <h5 className={styles.totalH}>R$</h5>
            </div>

            <button className={styles.finalButton}>CONTINUAR</button>

          </section>
        </section>
      </main>
      );
};

export default Carrinho;