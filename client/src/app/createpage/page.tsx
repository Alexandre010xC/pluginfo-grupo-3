'use client'
import React, { useState, FormEvent } from 'react';
import styles from './CreatePage.module.css';

const CreatePage = () => {
  //imagens produtos

  const [mainProduct, setMainProduct] = useState<File | null>(null);
  const [mainPreview, setMainPreview] = useState<string | null>(null);

  const [secondaryProducts, setSecondaryProducts] = useState<File[]>([]);
  const [secondaryPreviews, setSecondaryPreviews] = useState<string[]>([]);

  const handleMainProduct = (event: React.ChangeEvent<HTMLInputElement>) => {
    const product = event.target.files ? event.target.files[0] : null;
    if (product) {
      setMainProduct(product);

      const reader = new FileReader();
      reader.readAsDataURL(product);
      reader.onloadend = () => {
        setMainPreview(reader.result as string);
      };
    }
  };

  const handleSecondaryProducts = (event: React.ChangeEvent<HTMLInputElement>) => {
    const products = Array.from(event.target.files || []);
    
    setSecondaryProducts(prevProducts => [...prevProducts, ...products]);

    const productsPreviews = products.map(file => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      return new Promise<string>((resolve) => {
        reader.onloadend = () => {
          resolve(reader.result as string);
        };
      });
    });

    Promise.all(productsPreviews).then(newPreviews => {
      setSecondaryPreviews(prevPreviews => [...prevPreviews, ...newPreviews]);
    });
  };

  //colors
  const [cores, setCores] = useState<string[]>([]);

  const adicionarCor = (novaCor: string, index: number) => {
    const novasCores = [...cores];
    novasCores[index] = novaCor;
    setCores(novasCores);
  };

  return (
    <section className={styles.create}>
      <h4>Página de criação</h4>

      <form className={styles.createForm}>
        <div className={styles.left}>

          <div className={styles.fotoprincipal}>
            {mainPreview && (
              <img src={mainPreview} alt="Preview Principal" className={styles.previewImagePrincipal} />
            )}
            {!mainPreview && (
              <>
                <input type="file" id="main-product" accept="image/*" className={styles.formInput} style={{ display: 'none' }} onChange={handleMainProduct} />
                <button type="button" className={styles.uploadButtonPrincipal} onClick={() => document.getElementById('main-product')?.click()}> + </button>
              </>
            )}
          </div>

          <div className={styles.fotossecundarias}>
            {secondaryPreviews.map((preview, index) => (
              <img key={index} src={preview} alt={`Preview Secundária ${index}`} className={styles.previewImageSecundaria} />
            ))}
            <input type="file" id="secondary-products" accept="image/*" className={styles.formInput} multiple style={{ display: 'none' }} onChange={handleSecondaryProducts} />
            <button type="button" className={styles.uploadButtonSecundarias} onClick={() => document.getElementById('secondary-products')?.click()}> + </button>
          </div>

        </div>

        <div className={styles.right}>
          <label htmlFor="marca" className={styles.formLabel}>Marca</label>
          <input type="text" id="marca" className={styles.formInputMarca} />

          <label htmlFor="nome" className={styles.formLabel}>Nome</label>
          <input type="text" id="nome" className={styles.formInput} />

          <label htmlFor="variacao" className={styles.formLabel}>Variação</label>

          <div className={styles.variacao}>
            {cores.map((cor, index) => (
              <input key={index} type="color" value={cor} className={styles.colorInput} onChange={(e) => adicionarCor(e.target.value, index)}/>
            ))}
            <button type="button" className={styles.uploadButton} onClick={() => setCores([...cores, '#000000'])}>+</button>
          </div>

          <label htmlFor="preco" className={styles.formLabel}>Preço</label>
          <div className={styles.inputWrapper}>
            <span className={styles.currency}>R$</span>
            <input type="number" id="preco" min='0' className={styles.formInputPreco}/>
          </div>

          <label htmlFor="descricao" className={styles.formLabel}>Descrição</label>
          <textarea id="descricao" className={styles.formInputDescricao}/>

          <label htmlFor="tags" className={styles.formLabel}>Tags</label>
          <input type="text" id="tags" className={styles.formInput}/>

          <button type="submit" className={styles.formButton}>CRIAR PRODUTO</button>
        </div>
      </form>
    </section>
  );
};

export default CreatePage