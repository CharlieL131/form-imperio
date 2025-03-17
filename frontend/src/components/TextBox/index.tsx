"use client"
import { useState } from 'react';
import styles from './styles.module.css';
import { TextInputProps } from './script';

export default function TextBox(props: TextInputProps) {
  const [isInvalid] = useState(false);

  return (
    <div className={styles.input}>
      <label htmlFor={props.id}>
        <p>{props.title}</p>
      </label>
      <textarea
        id={props.id}
        placeholder={props.hint}
        value={props.value}
        onChange={props.onChange ? (e) => props.onChange!(e.target.value) : () => {}}
        className={(props.isInvalid || isInvalid) ? styles.invalidfield : styles.field}
        rows={props.rows}
      />
      {(props.isInvalid || isInvalid) && props.invalid_message && (
        <p className={styles.invalidmessage}>{props.invalid_message}</p>
      )}
    </div>
  );
}
