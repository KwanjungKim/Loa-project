import {
  AllHTMLAttributes,
  InputHTMLAttributes,
  ReactNode,
  forwardRef,
} from "react";

// styles
import styles from "./RadioInput.module.scss";

interface RadioInputWrapperProps extends AllHTMLAttributes<HTMLDivElement> {
  label?: string;
  children: ReactNode;
}

export default function RadioInputWrapper({
  label,
  children,
  ...props
}: RadioInputWrapperProps) {
  return (
    <div {...props} className={styles.wrapper}>
      <span>{label}</span>
      <div>{children}</div>
    </div>
  );
}

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  isChecked: boolean;
}

RadioInputWrapper.RadioInput = forwardRef<HTMLInputElement, Props>(
  function RadioInput({ label, isChecked, ...props }, ref) {
    return (
      <label
        htmlFor={props.id}
        className={`${styles.input} ${isChecked ? styles.checked : ""}`}
      >
        <input type="radio" {...props} ref={ref} />
        <span>{label}</span>
      </label>
    );
  },
);
