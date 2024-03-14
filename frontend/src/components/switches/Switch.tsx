import React from "react";

// styles
import styles from "./Switch.module.scss";

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  isActivated: boolean;
}

export default function Switch({ isActivated = false, ...props }: Props) {
  return (
    <div
      className={`${styles.wrapper} ${isActivated ? styles.isActivated : ""}`}
      {...props}
    >
      <div className={styles.switchWrapper}>
        <div className={styles.switch} />
      </div>
    </div>
  );
}
