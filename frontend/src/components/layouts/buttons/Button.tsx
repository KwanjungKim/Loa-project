import React from "react";
import styles from "./Button.module.scss";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

const Button = function Button({ children, className, ...props }: ButtonProps) {
  const _className = className
    ? `${styles.button} ${className}`
    : styles.button;
  return (
    <button className={_className} {...props}>
      <span>{children}</span>
    </button>
  );
};

export default Button;

Button.Default = function DefaultButton({ children, ...props }: ButtonProps) {
  return (
    <Button className={styles.default} {...props}>
      {children}
    </Button>
  );
};

Button.Brand = function BrandButton({ children, ...props }: ButtonProps) {
  return (
    <Button className={styles.brand} {...props}>
      {children}
    </Button>
  );
};
