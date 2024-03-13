import React, { ButtonHTMLAttributes } from "react";
import styles from "./DefaultButton.module.scss";

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

export default function DefaultButton({
  children,
  className,
  ...props
}: Props) {
  const _className = className
    ? `${styles.button} ${className}`
    : styles.button;
  return (
    <button className={_className} {...props}>
      {children}
    </button>
  );
}
