import React from "react";

// styles
import styles from "./HeaderView.module.scss";

// components
import IconButton from "@components/buttons/IconButton";
import BurgerSvg from "@components/svgs/BurgerSvg";
import GetCharacterList from "@components/kakaoLogin/getCharacterList";
import Button from "@components/buttons/Button";
import SettingSvg from "@components/svgs/SettingSvg";
import ModalBox from "@components/boxes/ModalBox";
import NightSvg from "@components/svgs/NightSvg";
import Switch from "@components/switches/Switch";

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

interface HeaderViewLogosProps extends React.AllHTMLAttributes<HTMLDivElement> {
  handleClickLogo: () => void;
}

HeaderView.Logos = React.memo(function Logos({
  handleClickLogo,
  ...props
}: HeaderViewLogosProps) {
  return (
    <div className={styles.logos} {...props}>
      <div className={styles.headerNavIcon}>
        <IconButton title="open navigation">
          <BurgerSvg aria-hidden />
        </IconButton>
      </div>
      <div className={styles.logoWrapper} onClick={handleClickLogo}>
        <h1>logo</h1>
      </div>
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
        title="설정 모달창 열기"
      >
        <SettingSvg aria-hidden />
      </IconButton>
    </div>
  );
});

interface HeaderViewSettingProps extends React.HTMLAttributes<HTMLDivElement> {
  toggleScreenMode: () => void;
  isDark: boolean;
}

HeaderView.Setting = React.forwardRef<HTMLDivElement, HeaderViewSettingProps>(
  function Setting({ isDark, toggleScreenMode, ...props }, ref) {
    return (
      <div className={styles.settingWrapper} {...props} ref={ref}>
        <ModalBox>
          <ModalBox.Button
            title={isDark ? "밝게" : "어둡게"}
            aria-label={isDark ? "밝게" : "어둡게"}
            onClick={toggleScreenMode}
          >
            <div className={styles.setting}>
              <div>
                <NightSvg />
                <span>어둡게</span>
              </div>
              <div>
                <Switch isActivated={isDark} />
              </div>
            </div>
          </ModalBox.Button>
        </ModalBox>
      </div>
    );
  },
);
