import {
  LargeButton,
  MediumButton,
  SmallButton,
} from "../../components/common/Button";
import TextButton from "../../components/common/Button/TextButton";
import HomeRoundedIcon from "@mui/icons-material/HomeRounded";

// styles
import styles from "./ButtonsRoute.module.scss";
import IconWrapper from "../../components/common/Wrapper/IconWrapper";

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
      <div className={styles.textButtonWrapper}>
        <TextButton className={styles.textButton}>
          <HomeRoundedIcon />
          <p>홈</p>
        </TextButton>
      </div>

      <IconWrapper
        aria-label="home button"
        size={40}
        onClick={() => handleClickButton("icon button is clicked")}
      >
        <HomeRoundedIcon
          focusable="false"
          aria-hidden="true"
          sx={{
            fontSize: "20px",
          }}
        />
      </IconWrapper>
    </div>
  );
};

export default ButtonsRoute;
