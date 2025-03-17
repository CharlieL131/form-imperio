import React from 'react';
import styles from './styles.module.css';
import { CardProps } from "@/components/Card/script"

export default function Card(props: CardProps) {
  return (
    <div className={styles.card}>
      <div className={styles.color} />
      <div className={styles.cardbody}>
        {props.children}
      </div>
    </div>
  );
}

