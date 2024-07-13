import { Metadata } from "next";
import { PrismicRichText } from "@prismicio/react";

import { createClient } from "@/prismicio";
import { PrismicNextImage } from "@prismicio/next";

import styles from './page.module.css'
import Link from "next/link";

import BrandsSlider from "./components/BrandsSlider";
import ProdutosGeral from "./components/ProdutosGeral";

const Home: React.FC = async () => {
  const client = createClient();
  const banner = await client.getSingle("home");

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

          {/* <BrandsSlider /> */}

      </section>

      <ProdutosGeral />
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

export default Home;