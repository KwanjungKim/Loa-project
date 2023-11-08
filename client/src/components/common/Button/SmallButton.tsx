import Button from "@mui/material/Button";
import { IButtonProps } from ".";

// styles
import styles from "./SmallButton.module.scss";

const SmallButton = ({ children, ...props }: IButtonProps) => {
  return (
    <Button className={styles.button} {...props}>
      {children}
    </Button>
  );
};

export default SmallButton;
