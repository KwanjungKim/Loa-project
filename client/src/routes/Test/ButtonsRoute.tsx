import {
  LargeButton,
  MediumButton,
  SmallButton,
} from "../../components/common/Button";

// styles
import styles from "./ButtonsRoute.module.scss";

const ButtonsRoute = () => {
  const handleClickButton = (str: string) => {
    console.log(str);
  };

  return (
    <div className={styles.wrapper}>
      <SmallButton
        variant="contained"
        onClick={() => handleClickButton("small button is clicked")}
      >
        small
      </SmallButton>
      <MediumButton
        variant="contained"
        onClick={() => handleClickButton("medium button is clicked")}
      >
        medium
      </MediumButton>
      <div className={styles.extButtonWrapper}>
        <LargeButton
          variant="contained"
          onClick={() => handleClickButton("large button is clicked")}
        >
          large
        </LargeButton>
      </div>
    </div>
  );
};

export default ButtonsRoute;
