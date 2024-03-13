import React from "react";

// styles
import styles from "./LinkedBox.module.scss";

interface Props extends React.AllHTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  activated?: boolean;
  disabled?: boolean;
}

export default function LinkedBox({
  activated = false,
  disabled = false,
  children,
  ...props
}: Props) {
  return (
    <div
      style={{
        height: "40px",
      }}
      className={`${styles.box} ${activated ? styles.activated : ""} ${
        disabled ? styles.disabled : ""
      }`}
      {...props}
    >
      {children}
    </div>
  );
}
