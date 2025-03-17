"use client"
import { useState } from 'react';
import styles from './styles.module.css';
import { FormattedTextInputProps } from './script';

export default function FormattedTextInput(props: FormattedTextInputProps) {
  const [isInvalid, setIsInvalid] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const rawValue = e.target.value.replace(/\D/g, '');
    const formattedValue = props.format(rawValue);
    if (props.onChange) { props.onChange(formattedValue);}

    if (props.validate) {
      setIsInvalid(!props.validate(formattedValue));
    }
  };

  return (
    <div className={styles.input}>
      <label htmlFor={props.id}>
        <p>{props.title}</p>
      </label>
      <input
        id={props.id}
        placeholder={props.hint}
        type="text"
        value={props.value}
        onChange={handleChange}
        className={(props.isInvalid || isInvalid) ? styles.invalidfield : styles.field}
      />
      {(props.isInvalid || isInvalid) && props.invalid_message && (
        <p className={styles.invalidmessage}>{props.invalid_message}</p>
      )}
    </div>
  );
}
