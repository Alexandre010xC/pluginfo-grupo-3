import { Metadata } from "next";
import { PrismicRichText } from "@prismicio/react";

import { createClient } from "@/prismicio";
import { PrismicNextImage } from "@prismicio/next";

import styles from './page.module.css'
import Link from "next/link";

import ProductLineCard from "./components/ProductLineCard";
import ProductCard from "./components/ProductCard";

import axios from 'axios';

import esmaltesImage from '../../public/mock/esmaltes.png';

import corretivoImage from '../../public/mock/corretivo.png';
import esponjaImage from '../../public/mock/esponja.png';
import pofacialImage from '../../public/mock/po-facial.png';

export default async function Home() {
  const client = createClient();
  const banner = await client.getSingle("home");

  const id = 1;
  const name = "Fenty Beauty";
  const description = "CORRETIVO FENTY INSTANT RETOUCH CONCEALER";
  const price = 130;

  // const getProducts = () => {
  //   const response = axios.get('localhost:8080/filter_products')
  // }

  return (
    <div className={styles.mainContent}>
      <section className={styles.banner}>
        <div className={styles.content}>
          <h3>{banner.data.title}</h3>
          <PrismicRichText field={banner.data.text} />
          <Link className={styles.button} href="/products"><button type="button">{banner.data.button_text}</button></Link>
        </div>

        <div>
          <PrismicNextImage className={styles.image} field={banner.data.image} />
        </div>
      </section>

      <section className={styles.see_more}>
        <div className={styles.heading}>
          <h4>Confira também</h4>
        </div>
        <div className={styles.product_list}>
          <Link href="/products/?name=Fenty"><ProductLineCard image={esmaltesImage} name={name} /></Link>
          <Link href="/products/?name=Fenty"><ProductLineCard image={esmaltesImage} name={name} /></Link>
          <Link href="/products/?name=Fenty"><ProductLineCard image={esmaltesImage} name={name} /></Link>
        </div>
      </section>

      <section className={styles.products}>
        <div className={styles.heading}>
          <h4>Produtos</h4>
          <Link href="/products"><span>Ver mais</span></Link>
        </div>
        <div className={styles.product_list}>
          <ProductCard id={id} image={corretivoImage} name={name} description={description} price={price} />
          <ProductCard id={id} image={corretivoImage} name={name} description={description} price={price} />
          <ProductCard id={id} image={corretivoImage} name={name} description={description} price={price} />
        </div>
      </section>
    </div>
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
