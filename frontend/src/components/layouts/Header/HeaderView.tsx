import React from "react";

// styles
import styles from "./HeaderView.module.scss";

// components
import IconButton from "@components/buttons/IconButton";
import BurgerSvg from "@components/svgs/BurgerSvg";
import GetCharacterList from "@components/kakaoLogin/getCharacterList";
import Button from "@components/buttons/Button";
import SettingSvg from "@components/svgs/SettingSvg";

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export default function HeaderView({ children, ...props }: Props) {
  return (
    <header className={styles.header} {...props}>
      <div className={styles.headerGrid}>{children}</div>
    </header>
  );
}

HeaderView.Logos = React.memo(function Logos() {
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

HeaderView.CharacterList = React.memo(function CharacterList() {
  return (
    <div className={styles.characterList}>
      <GetCharacterList />
    </div>
  );
});

export interface HeaderViewButtonsProps
  extends React.HTMLAttributes<HTMLDivElement> {
  isLoggedin: boolean;
  login: () => void;
  logout: () => void;
  toggleSetting: () => void;
}

HeaderView.Buttons = React.memo(function Buttons({
  isLoggedin,
  login,
  logout,
  toggleSetting,
}: HeaderViewButtonsProps) {
  return (
    <div className={styles.buttons}>
      {isLoggedin ? (
        <Button.Brand onClick={logout}>로그아웃</Button.Brand>
      ) : (
        <Button.Brand onClick={login}>로그인</Button.Brand>
      )}
      <IconButton
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          toggleSetting();
        }}
        title="open setting modal"
      >
        <SettingSvg aria-hidden />
      </IconButton>
    </div>
  );
});

interface HeaderViewSettingProps extends React.HTMLAttributes<HTMLDivElement> {
  toggleScreenMode: () => void;
}

HeaderView.Setting = React.forwardRef<HTMLDivElement, HeaderViewSettingProps>(
  function Setting({ toggleScreenMode, ...props }, ref) {
    return (
      <div
        style={{
          position: "absolute",
          top: "100%",
          right: "0",
        }}
        {...props}
        ref={ref}
      >
        <button onClick={toggleScreenMode}>light/dark</button>
      </div>
    );
  },
);
