import { useState } from 'react';
import Image from 'next/image';
import styles from './SearchMenu.module.css';
import { useRouter } from 'next/navigation';

interface SearchProp {
  searchIcon: string;
}

const SearchMenu: React.FC<SearchProp> = ({ searchIcon }) => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchName, setSearchName] = useState("");
  const router = useRouter();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchName(e.target.value);
  };

  const searchFor = () => {
    router.push(`/products/?name=${searchName}`);
  }
  
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
          <input className={styles.inputsearch}type="text" placeholder="Digite sua busca..." onChange={handleInputChange} />
        </div>
      )}
    </div>
  );
};

export default SearchMenu;
