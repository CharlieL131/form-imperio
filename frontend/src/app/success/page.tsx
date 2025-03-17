"use client"
import styles from "./page.module.css";
import HeaderImperio from "@/components/Header";
import Card from "@/components/Card";

export default function Home() {

  return (
    <div className={styles.formpage}>
      <HeaderImperio/>
      <main className={styles.formbody}>
        <div className={styles.form}>
          <Card>
            <h3 className={styles.title}>Entrada Enviada!</h3>
            <p className={styles.paragraph}>Parabéns sua entrada foi registrada com sucesso!</p>
            <p className={styles.paragraph}>Você pode fechar essa tela!</p>
          </Card>
        </div>
      </main>
    </div>
  );
}