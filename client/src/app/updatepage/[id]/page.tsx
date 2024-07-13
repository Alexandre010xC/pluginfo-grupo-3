/* eslint-disable @next/next/no-img-element */
'use client'
import React, { useState, FormEvent, ChangeEvent, useEffect } from 'react';
import styles from './UpdatePage.module.css';
import { axiosInstance } from '../../../../service/Products';
import { useParams } from 'next/navigation';
import ProductNotFound from '../../components/ProductNotFound';
import axios from 'axios';

const UpdatePage = () => {
  const params = useParams();
  const { id } = params as { id: string };
  const [notFound, setNotFound] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);

  const [product, setProduct] = useState({
    name:"",
    brand:"",
    price:0,
    description:"",
    tags:"",
    image_source:[],
    color:[]});

  useEffect(() => {
    const fetchProductData = async () => {
      try {
        const response = await axiosInstance.get(`/get_product/${id}`);

        console.log(response.data);

        const data = response.data;
        setProduct(response.data.product);

        setName(data.product.name);
        setBrand(data.product.brand);
        setPrice(data.product.price);
        setDescription(data.product.description);
        setTags(data.product.tags);

        const imageSourceArray = data.product.image_source.split(',').map((image_source: string) => image_source.trim());

        const mainImage = `/mock/${imageSourceArray[0]}`;
        console.log("mainImage", mainImage)
        setMainPreview(mainImage);
        const secondaryImages = imageSourceArray.slice(1).map((image: string) => `/mock/${image}`);
        setSecondaryPreviews(secondaryImages);

        setImage_source(data.product.image_source.split(',').map((image_source: string) => image_source.trim()));
        setCores(data.product.color.split(',').map((color: string) => color.trim()));

        console.log("imagens do banco de dados:", data.product.image_source);
        console.log("imagens processadas:", imageSourceArray);

        setLoading(false);
      } catch (error) {
        console.error("Error fetching product data:", error);
        setNotFound(true);
      }
    };

    fetchProductData();
  }, []);

  const [name, setName] = useState("");
  const [brand, setBrand] = useState("");
  const [price, setPrice] = useState<number | "">("");
  const [description, setDescription] = useState(""); 
  const [tags, setTags] = useState(""); 
  const [image_source, setImage_source] = useState<string[]>([]);

  //imagens
  const [mainProduct, setMainProduct] = useState<File | null>(null);
  const [mainPreview, setMainPreview] = useState<string | null>(null);

  const [secondaryProducts, setSecondaryProducts] = useState<File[]>([]);
  const [secondaryPreviews, setSecondaryPreviews] = useState<string[]>([]);

  const handleMainProduct = (event: ChangeEvent<HTMLInputElement>) => {
    const product = event.target.files ? event.target.files[0] : null;
    if (product) {
      const reader = new FileReader();
      reader.readAsDataURL(product);
      reader.onloadend = () => {
        setMainPreview(reader.result as string);
        setImage_source(prevSources => [product.name, ...prevSources.slice(1)]);
      };

      setMainProduct(product);
    }
  };

  const handleSecondaryProducts = (event: ChangeEvent<HTMLInputElement>) => {
    const products = Array.from(event.target.files || []);

    setSecondaryProducts((prevProducts) => [...prevProducts, ...products]);

    const productsPreviews = products.map((file) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      return new Promise<string>((resolve) => {
        reader.onloadend = () => {
          resolve(reader.result as string);
        };
      });
    });

    Promise.all(productsPreviews).then((newPreviews) => {
      setSecondaryPreviews((prevPreviews) => [...prevPreviews, ...newPreviews]);
    });

    setImage_source((prevSources) => [...prevSources, ...products.map((file) => file.name)]);
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
    setCores([...cores,  '#000000']);
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
  
    if (!name || !price || !brand || !description || !tags || image_source.length === 0 || cores.length === 0 || !mainPreview) {
      alert("Por favor, preencha todos os campos.");
      return;
    }
  
    const productData = {
      id: id,
      name: name,
      brand: brand,
      price: price as number,
      description: description,
      tags: tags,
      image_source: image_source.join(', '),
      color: cores.join(', ')
    };
  
    console.log("Dados do produto a serem enviados:", JSON.stringify(productData, null, 2));
  
    try {
      const dataResponse = await axiosInstance.put('/edit_product', productData);
  
      console.log("Dados atualizados com sucesso:", dataResponse.data);
  
      alert("Atualização feita");
  
      setName("");
      setBrand("");
      setPrice("");
      setDescription("");
      setTags("");
      setImage_source([]);
      setCores([]);

      window.location.href = '/admin'; 
  
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error("Error posting data:", error);
        console.error("Error data:", error.response?.data);
        console.error("Error status:", error.response?.status);
        console.error("Error headers:", error.response?.headers);
  
        alert(`Erro ao enviar dados: ${error.response?.data.message || 'Verifique os dados enviados'}`);
      } else {
        console.error("Unexpected error:", error);
        alert("Erro inesperado ao enviar dados");
      }
    }
  };
  

  const handleMainProductChange = (e: ChangeEvent<HTMLInputElement>) => {
    handleMainProduct(e);
  };

  const handleSecondProductChange = (e: ChangeEvent<HTMLInputElement>) => {
    handleSecondaryProducts(e);
  };

  //deletar imagens
  const handleRemoveSecondaryImage = (index: number) => {
    setSecondaryProducts((prevProducts) => {
      const updatedProducts = [...prevProducts];
      updatedProducts.splice(index, 1);
      return updatedProducts;
    });

    setSecondaryPreviews((prevPreviews) => {
      const updatedPreviews = [...prevPreviews];
      updatedPreviews.splice(index, 1);
      return updatedPreviews;
    });

    setImage_source((prevSources) => {
      const updatedSources = [...prevSources];
      updatedSources.splice(index + 1, 1);
      return updatedSources;
    });
  };

  const handleRemoveMainImage = () => {
    setMainPreview(null);
    setMainProduct(null);
  };

  const Apagar = async (id: number) => {
    try {
      await axiosInstance.delete(`/delete_product/${id}`);
      alert('Produto deletado com sucesso!');
      window.location.href = '/products'; 
    } catch (error) {
      console.error('Erro ao deletar o produto:', error);
    }
  };

  
  if (notFound) return <ProductNotFound />;

  if (!loading)
    return (
      <section className={styles.create}>
        <h4>Página de edição</h4>

        <form className={styles.createForm} onSubmit={handleSubmit}>
          <div className={styles.left}>

            <div className={styles.fotoprincipal}>
              {mainPreview && (
                <button type="button" className={styles.removeSecondaryButton} onClick={handleRemoveMainImage}><img src={mainPreview} alt="Preview Principal" className={styles.previewImagePrincipal} /></button>
              )}
              {!mainPreview && (
                <>
                  <input type="file" id="main-product" accept="image/*" className={styles.formInput} style={{ display: 'none' }} onChange={handleMainProductChange} />
                  <button type="button" className={styles.uploadButtonPrincipal} onClick={() => document.getElementById('main-product')?.click()}> + </button>
                </>
              )}
            </div>

            <div className={styles.fotossecundarias}>
              {mainPreview && (
                <button type="button" className={styles.removeSecondaryButtonresponsivo} onClick={handleRemoveMainImage}><img src={mainPreview} alt="Preview Principal" className={styles.previewImageSecundariaresponsivo} /></button>
              )}
              {!mainPreview && (
                <>
                  <input type="file" id="main-product" accept="image/*" className={styles.formInput} style={{ display: 'none' }} onChange={handleMainProductChange} />
                  <button type="button" className={styles.uploadButtonSecundariasresponsivo} onClick={() => document.getElementById('main-product')?.click()}> + </button>
                </>
              )}
              {secondaryPreviews.map((preview, index) => (
                  <button type="button" className={styles.removeSecondaryButton} key={index} onClick={() => handleRemoveSecondaryImage(index)}><img src={preview} key={index} alt={`Preview Secundária ${index}`} className={styles.previewImageSecundaria} /></button>
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

            <button type="submit" className={styles.formButton}>EDITAR PRODUTO</button>
            <button type="button" className={styles.deletebutton} onClick={() => Apagar(parseInt(id))}>Apagar Produto</button>

          </div>
        </form>
      </section>
    );
};

export default UpdatePage;
