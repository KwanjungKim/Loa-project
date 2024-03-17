import React from "react";

// styles
import styles from "./ModalBox.module.scss";

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export default function ModalBox({ children, ...props }: Props) {
  return (
    <div
      className={styles.box}
      // style={{
      //   width: "100%",
      //   backgroundColor: "rgba(var(--background-modal), 1)",
      //   borderRadius: "10px",
      //   padding: "7px 0",
      // }}
      {...props}
    >
      {children}
    </div>
  );
}

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

ModalBox.Button = React.memo(function Button({
  children,
  ...props
}: ButtonProps) {
  return (
    <button className={styles.button} {...props}>
      {children}
    </button>
  );
});
