import { useState } from 'react';
import Image from "next/image";
import styles from './HamburgerMenu.module.css';
import { useRouter } from 'next/navigation';

import HamburgerIcon from '@/assets/utilitary/menu-hamburguer.svg'
import ClosedIcon from '@/assets/utilitary/close.svg'
import CartIcon from '@/assets/utilitary/cart.svg'
import Likeicon from '@/assets/utilitary/like.svg'
import PerfilIcon from '@/assets/utilitary/profile.svg'
import ArrowIcon from '@/assets/utilitary/arrow-right.svg'
import Link from 'next/link';


const HamburgerMenu: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const router = useRouter();

  const goToCartPage = () => {
    router.push('/carrinho');
    setIsOpen(false);
  };

  const goToAdmin = () => {
    router.push('/admin');
    setIsOpen(false);
  };

  return (
    <section className={styles.menuHamburguer}>
      <button
        className={styles.toggle_button}
        onClick={toggleMenu}
      >
        {isOpen ? <Image src={ClosedIcon} alt="Opções"/> : <Image src={HamburgerIcon} alt="Opções"/>}
        
      </button>

      {isOpen ? 
        <div className={styles.containerOpen}>

          <div className={styles.headerMenu}>
            <div className={styles.esquerdoMenu}>
              <Image src={Likeicon} onClick={goToCartPage} alt="Opções" width={30} height={30} />
              <Image src={CartIcon} onClick={goToCartPage} alt="Opções" width={30} height={30} />
              <Image src={PerfilIcon} onClick={goToAdmin} alt="Opções" width={30} height={30}/>
            </div>

            <button className={styles.toggle_button} onClick={toggleMenu}>
              {isOpen ? <Image src={ClosedIcon} alt="Opções" width={30} height={30}/> : <Image src={HamburgerIcon} alt="Opções" width={30} height={30}/>}  
            </button>

          </div>
          

          <div className={styles.pagesNav}>
              <Link href='/products/?tags=face' onClick={toggleMenu}>
                <div className={styles.itens}>
                  <p>Face</p>
                  <Image src={ArrowIcon} alt="Opções" width={40} height={40} />
                </div>
              </Link>
              <Link href='/products/?tags=lábios' onClick={toggleMenu}>
                <div className={styles.itens}>
                  <p>Lábios</p>
                  <Image src={ArrowIcon} alt="Opções" width={40} height={40} />
                </div>
              </Link>
              <Link href='/products/?tags=sobrancelha' onClick={toggleMenu}>
                <div className={styles.itens}>
                  <p>Sobrancelha</p>
                  <Image src={ArrowIcon} alt="Opções" width={40} height={40} />
                </div>
              </Link>
              <Link href='/products/?tags=olhos' onClick={toggleMenu}>
                <div className={styles.itens}>
                  <p>Olhos</p>
                  <Image src={ArrowIcon} alt="Opções" width={40} height={40} />
                </div>
              </Link>
              <Link href='/products/?tags=paletas' onClick={toggleMenu}>
                <div className={styles.itens}>
                  <p>Paletas</p>
                  <Image src={ArrowIcon} alt="Opções" width={40} height={40} />
                </div>
              </Link>
              <Link href='/products/?tags=acessorios' onClick={toggleMenu}>
                <div className={styles.itens}>
                  <p>Acessórios</p>
                  <Image src={ArrowIcon} alt="Opções" width={40} height={40} />
                </div>
              </Link>
          </div>
        </div>

      : <></>}

    </section>
  );
};

export default HamburgerMenu;
