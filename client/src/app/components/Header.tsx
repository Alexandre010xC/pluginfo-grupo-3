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

const Header = () => {
  const router = useRouter();

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
          <input type="text" placeholder="Buscar" />
          <div className={styles.button}>
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
          <li>FACE</li>
          <li>LÁBIOS</li>
          <li>OLHOS</li>
          <li>SOBRANCELHA</li>
          <li>PALETAS</li>
          <li>ACESSÓRIOS</li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;
