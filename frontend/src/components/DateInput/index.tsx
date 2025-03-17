"use client"
import { useState } from 'react';
import styles from './styles.module.css';
import { DateInputProps } from './script';

export default function DateInput(props: DateInputProps) {
  const [isInvalid, setIsInvalid] = useState(false);

  const validateDate = (date: string) => {
    const regex = /^\d{4}-\d{2}-\d{2}$/;
    return regex.test(date) && (props.validate ? props.validate(date) : true);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (props.onChange) { props.onChange(value);}
    setIsInvalid(!validateDate(value));
  };

  return (
    <div className={styles.input}>
      <label htmlFor={props.id}>
        <p>{props.title}</p>
      </label>
      <input
        id={props.id}
        placeholder={props.hint}
        type="date"
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
