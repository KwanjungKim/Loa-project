import React from "react";

// styles
import styles from "./IconWrapper.module.scss";

interface IIconWrapperProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  size?: number;
}

const IconWrapper = ({ children, size = 24, ...props }: IIconWrapperProps) => {
  const sizeStr = `${size}px`;
  return (
    <button
      className={styles.iconWrapper}
      style={{
        width: sizeStr,
        height: sizeStr,
      }}
      tabIndex={0}
      {...props}
    >
      {children}
    </button>
  );
};

export default IconWrapper;
