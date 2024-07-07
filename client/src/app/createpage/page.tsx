'use client'
import React, { useState, FormEvent, ChangeEvent } from 'react';
import styles from './CreatePage.module.css';
import { Products, axiosInstance } from '../../../service/Products';

const CreatePage = () => {
  //imagens
  const [mainProduct, setMainProduct] = useState<File | null>(null);
  const [mainPreview, setMainPreview] = useState<string | null>(null);

  const [secondaryProducts, setSecondaryProducts] = useState<File[]>([]);
  const [secondaryPreviews, setSecondaryPreviews] = useState<string[]>([]);

  const handleMainProduct = (event: ChangeEvent<HTMLInputElement>) => {
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

  const handleSecondaryProducts = (event: ChangeEvent<HTMLInputElement>) => {
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

    setImage_source(prevSources => [...prevSources, ...products.map(file => file.name)]);
  };

  //Cores
  const [cores, setCores] = useState<string[]>([]);

  const adicionarCor = (novaCor: string, index: number) => {
    const novasCores = [...cores];
    novasCores[index] = novaCor;
    setCores(novasCores);
  };

  const handleColor = (e: ChangeEvent<HTMLInputElement>, index: number) => {
    const novaCor = e.target.value;
    adicionarCor(novaCor, index);
  };

  const addNewColor = () => {
    setCores([...cores, '#000000']);
  };

  //backend
  const [name, setName] = useState("");
  const [brand, setBrand] = useState("");
  const [price, setPrice] = useState<number | "">("");
  const [description, setDescription] = useState(""); 
  const [tags, setTags] = useState(""); 
  const [image_source, setImage_source] = useState<string[]>([]); 

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!name || price === "" || !brand || !description || !tags || image_source.length === 0 || cores.length === 0) {
      alert("Por favor, preencha todos os campos.");
      return;
    }

    try {
      const dataResponse = await axiosInstance.post('/create_product', {
        name: name,
        brand: brand,
        price: price as number,
        description: description,
        tags: tags,
        image_source: image_source.join(', '),
        color: cores.join(', ')
      });

      console.log("Data posted successfully:", dataResponse.data);
      console.log("Form Data:", {
        name,
        brand,
        price,
        description,
        tags,
        image_source,
        colors: cores
      });

      alert("Cadastro feito")
      setName("");
      setBrand("");
      setPrice("");
      setDescription("");
      setTags("");
      setImage_source([]);
      setCores([]);
      window.location.reload()

    } catch (error) {
      console.error("Error posting data:", error);
    }
  };

  const handleMainProductChange = (e: ChangeEvent<HTMLInputElement>) => {
    handleMainProduct(e);
    setImage_source([]);
  };

  const handleSecondProductChange = (e: ChangeEvent<HTMLInputElement>) => {
    handleSecondaryProducts(e);
  };

  return (
    <section className={styles.create}>
      <h4>Página de criação</h4>

      <form className={styles.createForm} onSubmit={handleSubmit}>
        <div className={styles.left}>

          <div className={styles.fotoprincipal}>
            {mainPreview && (
              <img src={mainPreview} alt="Preview Principal" className={styles.previewImagePrincipal} />
            )}
            {!mainPreview && (
              <>
                <input type="file" id="main-product" accept="image/*" className={styles.formInput} style={{ display: 'none' }} onChange={handleMainProductChange} />
                <button type="button" className={styles.uploadButtonPrincipal} onClick={() => document.getElementById('main-product')?.click()}> + </button>
              </>
            )}
          </div>

          <div className={styles.fotossecundarias}>
            {secondaryPreviews.map((preview, index) => (
              <img key={index} src={preview} alt={`Preview Secundária ${index}`} className={styles.previewImageSecundaria} />
            ))}
            <input type="file" id="secondary-products" accept="image/*" className={styles.formInput} multiple style={{ display: 'none' }} onChange={handleSecondProductChange}/>
            <button type="button" className={styles.uploadButtonSecundarias} onClick={() => document.getElementById('secondary-products')?.click()}> + </button>
          </div>

        </div>

        <div className={styles.right}>
          <label htmlFor="marca" className={styles.formLabel}>Marca</label>
          <input type="text" id="marca" className={styles.formInputMarca} value={brand} onChange={(e) => setBrand(e.target.value)}/>

          <label htmlFor="nome" className={styles.formLabel}>Nome</label>
          <input type="text" id="nome" className={styles.formInput} value={name} onChange={(e) => setName(e.target.value)}/>

          <label htmlFor="variacao" className={styles.formLabel}>Variação</label>

          <div className={styles.variacao}>
            {cores.map((color, index) => (
              <input key={index} type="color" value={color} className={styles.colorInput} onChange={(e) => handleColor(e, index)} />
            ))}
            <button type="button" className={styles.uploadButton} onClick={addNewColor}>+</button>
          </div>

          <label htmlFor="preco" className={styles.formLabel}>Preço</label>
          <div className={styles.inputWrapper}>
            <span className={styles.currency}>R$</span>
            <input type="number" id="preco" min='0' className={styles.formInputPreco} onChange={(e) => setPrice(parseFloat(e.target.value))} value={price}/>
          </div>

          <label htmlFor="descricao" className={styles.formLabel}>Descrição</label>
          <textarea id="descricao" className={styles.formInputDescricao} onChange={(e) => setDescription(e.target.value)} value={description}/>

          <label htmlFor="tags" className={styles.formLabel}>Tags</label>
          <input type="text" id="tags" className={styles.formInput} value={tags} onChange={(e) => setTags(e.target.value)}/>

          <button type="submit" className={styles.formButton}>CRIAR PRODUTO</button>
        </div>
      </form>
    </section>
  );
};

export default CreatePage;
