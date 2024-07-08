import { useState } from 'react';
import Image from "next/image";
import styles from './HamburgerMenu.module.css';

import HamburgerIcon from '@/assets/utilitary/menu-hamburguer.svg'

const HamburgerMenu: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="">
      <button
        className={styles.toggle_button}
        onClick={toggleMenu}
      >
        <Image src={HamburgerIcon} alt="Opções" />
      </button>
      {/* <nav
        className={`${ isOpen ? 'block' : 'hidden' }`}
      >
        <ul className="">
          <li className="">
            <a href="#" className="">
              Home
            </a>
          </li>
          <li className="">
            <a href="#" className="">
              About
            </a>
          </li>
          <li className="">
            <a href="#" className="">
              Contact
            </a>
          </li>
        </ul>
      </nav> */}
    </div>
  );
};

export default HamburgerMenu;
