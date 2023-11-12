import Button from "@mui/material/Button";

// styles
import styles from "./MediumButton.module.scss";
import { IButtonProps } from ".";

const MediumButton = ({ children, ...props }: IButtonProps) => {
  return (
    <Button className={styles.button} {...props}>
      {children}
    </Button>
  );
};

export default MediumButton;
