import { useState } from 'react';
import Image from 'next/image';
import styles from './SearchMenu.module.css';

interface SearchProp {
  searchIcon: string; // A propriedade searchIcon é uma string que representa o caminho da imagem
}

const SearchMenu: React.FC<SearchProp> = ({ searchIcon }) => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const toggleSearch = () => {
    setIsSearchOpen(!isSearchOpen);
  };

  return (
    <div className={styles.searchMenu}>
      <div className={styles.searchIcon} onClick={toggleSearch}>
        <Image src={searchIcon} alt="Botão de buscar" />
      </div>
      {isSearchOpen && (
        <div className={styles.searchBar}>
          <input className={styles.inputsearch}type="text" placeholder="Digite sua busca..." />
        </div>
      )}
    </div>
  );
};

export default SearchMenu;
