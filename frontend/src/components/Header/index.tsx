
import styles from './styles.module.css';

export default function HeaderImperio() {
    return (
    <header className={styles.header}>
      <div className={styles.top}>
        <div className={styles.logo}>
          <img
            src='/logo-imperio.png'
            alt="Logo"
            style={{width: "100%", height: "100%"}}
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


