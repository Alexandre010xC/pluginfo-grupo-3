import React, { useEffect, useState } from 'react';
import styles from './itemCarrinho.module.css';
import Image from 'next/image';
import likeIcon from '@/assets/utilitary/like.svg';
import { axiosInstance } from '../../../service/Products';

interface Product {
    id: number;
    brand: string;
    name: string;
    price: number;
    image_source: string; 
}

interface ItemCarrinhoProps {
    onProductsLoaded: (products: Product[]) => void;
}

const ItemCarrinho = ({ onProductsLoaded }: ItemCarrinhoProps) => {
    const [products, setProducts] = useState<Product[]>([]);

    useEffect(() => {
        const fetchCart = async () => {
            try {
                const response = await axiosInstance.get<{ products: Product[] }>('/get_cart');
                const loadedProducts = response.data.products;
                setProducts(loadedProducts);
                onProductsLoaded(loadedProducts);
            } catch (error) {
                console.error('Erro ao buscar carrinho', error);
            }
        };

        fetchCart();
    }, [onProductsLoaded]);

    const removeFromCart = async (productId: number) => {
        try {
            await axiosInstance.put(`/remove_from_cart/${productId}`);
            const updatedProducts = products.filter(product => product.id !== productId);
            setProducts(updatedProducts);
            onProductsLoaded(updatedProducts);
        } catch (error) {
            console.error('Erro ao remover produto do carrinho', error);
        }
    };

    return (
        <main className={styles.carrinhoItens}>
            <h4 className={styles.tituloResponsivo}>Carrinho</h4>

            {products.map((product) => {
                const imageSourceArray = product.image_source.split(',').map((image: string) => image.trim());
                const mainImage = `/mock/${imageSourceArray[0]}`;

                return (
                  <section key={product.id}>
                    <div key={product.id} className={styles.containerProduto}>
                        <section className={styles.produtoCarrinho}>
                            <input type='checkbox' className={styles.checkboxProduto} />

                            <Image width={120} height={128} src={mainImage} alt={product.name} />

                            <div className={styles.infoProdutoCarrinho}>
                                <p className={styles.marcaProduto}>{product.brand}</p>
                                <p className={styles.nomeProduto}>{product.name}</p>
                                <p className={styles.codigoProduto}>Código: {product.id}</p>
                                <div className={styles.responsivoItens}>
                                    <h5 className={styles.precoCarrinhoResponsivo}>R$ {product.price.toFixed(2)}</h5>
                                    <Image className={styles.figureFavoriteResponsivo} src={likeIcon} alt='like' width={20} height={20} />
                                </div>
                            </div>
                        </section>

                        <section className={styles.quantidadeProduto}>
                            <button className={styles.buttonQuantidade} onClick={() => removeFromCart(product.id)}>–</button>
                            <input className={styles.inputQuantidade} type="number"/>
                            <button className={styles.buttonQuantidade}>+</button>
                        </section>

                        <section className={styles.figureFavorite}>
                            <Image className={styles.figureFavorite} src={likeIcon} alt='like' width={50} height={50} />
                        </section>

                        <section className={styles.precoCarrinho}>
                            <h5>R$ {product.price.toFixed(2)}</h5>
                        </section>
                    </div>

                    <div className={styles.quantidadeProdutoResponsivo}>
                      <button className={styles.buttonQuantidade} onClick={() => removeFromCart(product.id)}>–</button>
                      <input className={styles.inputQuantidade} type="number"></input>
                      <button className={styles.buttonQuantidade}>+</button>
                    </div>
                  </section>
                );
            })}

        </main>
    );
};

export default ItemCarrinho;
