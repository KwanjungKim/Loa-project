import React from "react";

// styles
import styles from "./TextButton.module.scss";

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

const TextButton = ({ children, className, ...props }: Props) => {
  const iClassName = className
    ? `${className} ${styles.textButton}`
    : styles.textButton;
  return (
    <button className={iClassName} {...props}>
      {children}
    </button>
  );
};

export default TextButton;
