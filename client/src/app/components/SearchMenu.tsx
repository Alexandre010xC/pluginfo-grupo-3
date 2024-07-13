import { useState } from 'react';
import Image, { ImageProps } from "next/image";
import styles from './SearchMenu.module.css';

interface SearchProp {
  searchIcon: ImageProps['src'];
}

const SearchMenu: React.FC<SearchProp> = ({searchIcon}) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleOverlay = () => {
    setIsOpen(!isOpen);
  };

  return (
    <Image className={styles.icon} src={searchIcon} onClick={toggleOverlay} alt="Botão de buscar" />
  );
};

export default SearchMenu;
