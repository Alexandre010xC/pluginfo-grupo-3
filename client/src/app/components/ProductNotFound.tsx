// app/not-found.tsx
import Link from 'next/link';
import Image from "next/image";
import { FC } from 'react';

import notFountImage from '@/assets/responses/product-not-found.svg'

const ProductNotFound: FC = () => {
  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>Produto não encontrado</h1>
      <p style={styles.text}>Tente verificar a ortografia ou usar termos mais genéricos</p>
      <Image src={notFountImage} alt='página não encontrada' />
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

export default ProductNotFound;
