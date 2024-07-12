import Link from 'next/link';
import Image from "next/image";
import { FC } from 'react';

import notFountImage from '@/assets/responses/product-not-found.svg'

const NotFound: FC = () => {
  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>404 - Página não encontrada</h1>
      <p style={styles.text}>Opa! A página que está procurando não existe.</p>
      <Image src={notFountImage} alt='página não encontrada' />
      <Link href="/">
        <span style={styles.link}>Retornar para o início</span>
      </Link>
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column' as 'column',
    alignItems: 'center' as 'center',
    justifyContent: 'center' as 'center',
    height: '100vh',
    textAlign: 'center' as 'center',
  },
  heading: {
    fontSize: '3rem',
    marginBottom: '1rem',
  },
  text: {
    fontSize: '1.5rem',
    marginBottom: '1rem',
  },
  link: {
    fontSize: '1.2rem',
    color: 'black',
    textDecoration: 'underline',
    cursor: 'pointer',
  },
};

export default NotFound;
