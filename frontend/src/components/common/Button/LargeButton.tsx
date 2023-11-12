import Button from "@mui/material/Button";
import { IButtonProps } from ".";

// styles
import styles from "./LargeButton.module.scss";

const LargeButton = ({ children, ...props }: IButtonProps) => {
  return (
    <Button className={styles.button} {...props}>
      {children}
    </Button>
  );
};

export default LargeButton;
