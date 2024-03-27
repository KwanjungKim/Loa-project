import { InputHTMLAttributes, forwardRef, useId } from "react";

// styles
import styles from "./Input.module.scss";

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}

const Input = forwardRef(function Input(
  { label, ...props }: Props,
  ref: React.Ref<HTMLInputElement>,
) {
  const id = useId();
  return (
    <label
      className={styles.wrapper}
      htmlFor={`${id}${props.name ? props.name : ""}`}
    >
      {label && <span>{label}</span>}
      <input
        {...props}
        id={`${id}${props.name ? props.name : ""}`}
        className={styles.input}
        ref={ref}
      />
    </label>
  );
});

export default Input;
