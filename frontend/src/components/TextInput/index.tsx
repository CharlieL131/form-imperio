"use client"
import { useState } from 'react';
import styles from './styles.module.css';
import { TextInputProps } from './script';

export default function TextInput(props: TextInputProps) {
  const [isInvalid] = useState(false);

  return (
    <div className={styles.input}>
      <label htmlFor={props.id}>
        <p>{props.title}</p>
      </label>
      <input
        id={props.id}
        placeholder={props.hint}
        type={props.type || "text"}
        value={props.value}
        onChange={props.onChange ? (e) => props.onChange!(e.target.value) : () => {}}
        pattern={props.pattern}
        className={(props.isInvalid || isInvalid) ? styles.invalidfield : styles.field}
      />
      {(props.isInvalid || isInvalid) && props.invalid_message && (
        <p className={styles.invalidmessage}>{props.invalid_message}</p>
      )}
    </div>
  );
}
