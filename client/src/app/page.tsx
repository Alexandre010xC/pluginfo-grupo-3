import { Metadata } from "next";
import { PrismicRichText } from "@prismicio/react";

import { createClient } from "@/prismicio";
import styles from './page.module.css'
import { PrismicNextImage } from "@prismicio/next";

import ProductCard from "./components/ProductCard";

import axios from 'axios';

import corretivoImage from '../../public/mock/corretivo.png';
import esponjaImage from '../../public/mock/esponja.png';
import pofacialImage from '../../public/mock/po-facial.png';

export default async function Home() {
  const client = createClient();
  const banner = await client.getSingle("home");

  const name = "Fenty Beauty";
  const description = "CORRETIVO FENTY INSTANT RETOUCH CONCEALER";
  const price = 130;

  // const getProducts = () => {
  //   const response = axios.get('localhost:8080/filter_products')
  // }

  return (
    <>
      <section className={styles.banner}>
        <div className={styles.content}>
          <h3>{banner.data.title}</h3>
          <PrismicRichText field={banner.data.text} />
          <button type="button">{banner.data.button_text}</button>
        </div>

        <div>
          <PrismicNextImage className={styles.image} field={banner.data.image} />
        </div>
      </section>

      <section className={styles.see_more}>
        <div className={styles.heading}>
          <h4>Confira também</h4>
        </div>
        
      </section>

      <section className={styles.products}>
        <div className={styles.heading}>
          <h4>Produtos</h4>
          <span>Ver mais</span>
        </div>
        <div className={styles.product_list}>
          <ProductCard image={corretivoImage} name={name} description={description} price={price} />
          <ProductCard image={corretivoImage} name={name} description={description} price={price} />
          <ProductCard image={corretivoImage} name={name} description={description} price={price} />
        </div>
      </section>
    </>
  );
}

export async function generateMetadata(): Promise<Metadata> {
  const client = createClient();
  const page = await client.getSingle("home");

  return {
    title: page.data.meta_title,
    description: page.data.meta_description,
  };
}
