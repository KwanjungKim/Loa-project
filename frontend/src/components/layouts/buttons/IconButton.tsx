import React, { ButtonHTMLAttributes } from "react";
import styles from "./IconButton.module.scss";

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

export default function IconButton({ children, className, ...props }: Props) {
  const _className = className
    ? `${styles.button} ${className}`
    : styles.button;
  return (
    <button className={_className} {...props}>
      {children}
    </button>
  );
}
