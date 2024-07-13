'use client';
import Image from "next/image";
import { useRouter } from 'next/navigation';
import styles from "./Header.module.css";
import SearchMenu from './SearchMenu';
import HamburgerMenu from './HamburgerMenu';

import searchIcon from "@/assets/utilitary/search.svg";
import likeIcon from "@/assets/utilitary/like.svg";
import cartIcon from "@/assets/utilitary/cart.svg";
import profileIcon from "@/assets/utilitary/profile.svg";
import { axiosInstance } from "../../../service/Products";
import { useState } from "react";
import Link from "next/link";

const Header = () => {
  const [searchName, setSearchName] = useState("");
  const router = useRouter();

  const handleSearchName = async (search: string) => {
    try {
      const response = await axiosInstance.get('filter_products/', {
        params: {
          name: search,
          // tags: search,
        },
      });

      setSearchName(search);
      
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleSearchName(e.target.value);
  };

  const searchFor = () => {
    router.push(`/products/?name=${searchName}`);
  }

  const goToCartPage = () => {
    router.push('/carrinho');
  };

  return (
    <header className={styles.header}>
      <div className={styles.main_bar}>
        <div className={styles.logo} onClick={() => router.push('/')}>
          <h1 className={styles.logoText}>GLOW</h1>
        </div>
        <div className={styles.search_bar}>
          <input type="text" placeholder="Buscar" onChange={handleInputChange} />
          <div className={styles.button} onClick={searchFor}>
            <Image className={styles.icon} src={searchIcon} alt="Botão de buscar" />
          </div>
        </div>
        <nav className={styles.options}>
          <ul>
            <li><Image src={likeIcon} alt="Itens favoritados" /></li>
            <li onClick={goToCartPage}><Image src={cartIcon} alt="Carrinho de compras" /></li>
            <li><Image src={profileIcon} alt="Meu perfil" /></li>
          </ul>
        </nav>
        
        <div className={styles.mobile_options}>
          <SearchMenu searchIcon={searchIcon} />
          <HamburgerMenu />
        </div>

      </div>

      <nav className={styles.filters}>
        <ul>
          <Link href='/products/?tags=face'><li>FACE</li></Link>
          <Link href='/products/?tags=lábios'><li>LÁBIOS</li></Link>
          <Link href='/products/?tags=olhos'><li>OLHOS</li></Link>
          <Link href='/products/?tags=sobrancelha'><li>SOBRANCELHA</li></Link>
          <Link href='/products/?tags=paletas'><li>PALETAS</li></Link>
          <Link href='/products/?tags=acessorios'><li>ACESSÓRIOS</li></Link>
        </ul>
      </nav>
    </header>
  );
}

export default Header;
