import React from "react";

// styles
import styles from "./HeaderView.module.scss";

// components
import IconButton from "@components/buttons/IconButton";
import BurgerSvg from "@components/svgs/BurgerSvg";
import GetCharacterList from "@components/kakaoLogin/getCharacterList";
import Button from "@components/buttons/Button";
import SettingSvg from "@/components/svgs/SettingSvg";

export interface HeaderViewProps
  extends React.AllHTMLAttributes<HTMLDivElement> {
  isLoggedin: boolean;
  screenMode: "light" | "dark";
  login: () => void;
  logout: () => void;
  handleToggleScreenMode: (currentMode: "light" | "dark") => void;
}

const HeaderView = React.memo(function HeaderView({
  isLoggedin,
  screenMode,
  login,
  logout,
  handleToggleScreenMode,
  ...props
}: HeaderViewProps) {
  return (
    <header className={styles.header} {...props}>
      <div className={styles.headerGrid}>
        <Logos />
        <CharacterList />
        <Buttons isLoggedin={isLoggedin} login={login} logout={logout} />
      </div>
    </header>
  );
});

export default HeaderView;

const Logos = React.memo(function Logos() {
  return (
    <div className={styles.logos}>
      <div>
        <IconButton title="open navigation">
          <BurgerSvg aria-hidden />
        </IconButton>
      </div>
      <h1>logo</h1>
    </div>
  );
});

const CharacterList = React.memo(function CharacterList() {
  return (
    <div className={styles.characterList}>
      <GetCharacterList />
    </div>
  );
});

type ButtonsProps = {
  isLoggedin: boolean;
  login: () => void;
  logout: () => void;
};

const Buttons = React.memo(function Buttons({
  isLoggedin,
  login,
  logout,
}: ButtonsProps) {
  return (
    <div className={styles.buttons}>
      {isLoggedin ? (
        <Button.Brand onClick={logout}>로그아웃</Button.Brand>
      ) : (
        <Button.Brand onClick={login}>로그인</Button.Brand>
      )}
      <IconButton title="open setting modal">
        <SettingSvg aria-hidden />
      </IconButton>
    </div>
  );
});
