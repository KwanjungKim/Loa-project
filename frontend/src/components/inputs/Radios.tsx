import React from "react";

// styles
import styles from "./Radios.module.scss";

interface Props extends React.AllHTMLAttributes<HTMLDivElement> {
  title: string;
  children: React.ReactNode;
}

export default function Radios({ title, children, ...props }: Props) {
  return (
    <div className={styles.radiosWrapper} {...props}>
      <h5>{title}</h5>
      <div className={styles.radios}>{children}</div>
    </div>
  );
}

interface RadioProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
}

Radios.Radio = React.forwardRef<HTMLInputElement, RadioProps>(function Radio(
  { label, ...props },
  ref,
) {
  return (
    <div className={styles.radio}>
      <input type="radio" {...props} ref={ref} />
      <label htmlFor={props.id}>{label}</label>
    </div>
  );
});
