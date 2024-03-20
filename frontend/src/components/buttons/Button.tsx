import React from "react";
import styles from "./Button.module.scss";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  isSmall?: boolean;
}

export default function Button({
  children,
  className,
  isSmall = false,
  ...props
}: ButtonProps) {
  let _className = className ? `${styles.button} ${className}` : styles.button;
  if (isSmall) {
    _className += ` ${styles.small}`;
  }
  const _children = children?.toString() || "";
  return (
    <button
      className={_className}
      title={_children}
      aria-label={_children}
      {...props}
    >
      <span>{children}</span>
    </button>
  );
}

Button.Default = React.memo(function DefaultButton({
  children,
  ...props
}: ButtonProps) {
  return (
    <Button className={styles.default} {...props}>
      {children}
    </Button>
  );
});

Button.Brand = React.memo(function BrandButton({
  children,
  ...props
}: ButtonProps) {
  return (
    <Button className={styles.brand} {...props}>
      {children}
    </Button>
  );
});
