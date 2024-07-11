import Image from "next/image";
import facebookIcon from '@/assets/social-media/facebook.svg';
import instagramIcon from '@/assets/social-media/instagram.svg';
import twitterIcon from '@/assets/social-media/x-twitter.svg';
import styles from "./Footer.module.css";

const Footer = () => {
  return (
    <footer className={styles.footer}>

      <section className={styles.linkgeral}>

        <div className={styles.parteum}>
          <nav className={styles.link}>
            <h6>Descobrir e comprar</h6>
            <a href="/">Face</a>
            <a href="/">Lábios</a>
            <a href="/">Olhos</a>
            <a href="/">Sobrancelha</a>
            <a href="/">Paletas</a>
            <a href="/">Acessórios</a>
          </nav>
        </div>

        
        <div className={styles.partedois}>
          <nav className={styles.link}>
            <h6>Ajuda e suporte</h6>
            <a href="/">Trocas e devoluções</a>
            <a href="/">Atendimento ao cliente</a>
            <a href="/">Meus pedidos</a>
          </nav>

          <nav className={styles.link}>
            <h6>Privacidade</h6>
            <a href="/">Política de privacidade</a>
            <a href="/">Termos de uso</a>    
          </nav>
        </div>

      </section>

      <nav className={styles.socialmedia}>
        <a href="https://www.facebook.com/" target="_blank" className={styles.mediaLink}>
          <Image className={styles.media} src={facebookIcon} alt="Facebook" width={40} height={40} />
        </a>
        <a href="https://www.instagram.com/" target="_blank" className={styles.mediaLink}>
          <Image className={styles.media} src={instagramIcon} alt="Instagram" width={40} height={40} />
        </a>
        <a href="https://x.com/" target="_blank" className={styles.mediaLink}>
          <Image className={styles.media} src={twitterIcon} alt="Twitter" width={40} height={40} />
        </a>
    </nav>
      
    </footer>
  );
}

export default Footer