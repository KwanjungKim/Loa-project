import { ButtonHTMLAttributes, ReactNode } from "react";

// styles
import styles from "./CardButton.module.scss";

const CardButton = function CardButton({
  children,
  isSelected,
  ...props
}: {
  children: ReactNode;
  isSelected: boolean;
} & ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      {...props}
      className={`${styles.button} ${isSelected ? styles.selected : ""}`}
    >
      {children}
    </button>
  );
};

export default CardButton;
