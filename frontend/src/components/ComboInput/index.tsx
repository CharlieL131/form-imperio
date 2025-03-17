"use client"
import styles from './styles.module.css';
import { ComboInputProps } from './script';

export default function ComboInput(props: ComboInputProps) {
  return (
    <div className={styles.input}>
      <label htmlFor={props.id}>
        <p>{props.title}</p>
      </label>
      <select
        id={props.id}
        value={props.value}
        onChange={(e) => props.onChange(e.target.value)}
        disabled={props.disabled || !props.options.length} // Desabilita se não houver opções
        className={styles.field}
      >
        <option value="" disabled>
          {props.hint}
        </option>
        {props.options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
}
