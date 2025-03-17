
import Image from 'next/image';
import styles from './styles.module.css';

export default function HeaderImperio() {
    return (
    <header className={styles.header}>
      <div className={styles.top}>
        <div className={styles.logo}>
          <Image
            src='/logo-imperio.png'
            alt="Logo"
            fill
          />
        </div>

        <div className={styles.menu}>
          <a href="https://www.lojasimperio.com.br/pagina/central-de-atendimento">Centeral de Atendimento</a>
          <div className={styles.division}/>
          <a href="/faq">FAQ</a>
        </div>
      </div>
    </header>
    );
}


