import React from "react";

// styles
import styles from "./HeaderView.module.scss";

// components
import IconButton from "@components/buttons/IconButton";
import BurgerSvg from "@components/svgs/BurgerSvg";
import Button from "@components/buttons/Button";
import SettingSvg from "@components/svgs/SettingSvg";
import ModalBox from "@components/boxes/ModalBox";
import NightSvg from "@components/svgs/NightSvg";
import Switch from "@components/switches/Switch";
import Nav from "@components/layouts/Nav";
import MainCharacterSelector from "./MainCharacterSelector";

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

export interface HeaderViewLogosProps
  extends React.AllHTMLAttributes<HTMLDivElement> {
  showNavModal: boolean;
  handleClickLogo: () => void;
  toggleNavModal: () => void;
  handleCloseNavModal: () => void;
}

HeaderView.Logos = React.forwardRef(function Logos({
  handleClickLogo,
  showNavModal,
  toggleNavModal,
  handleCloseNavModal,
  ...props
}: HeaderViewLogosProps) {
  return (
    <div className={styles.logos} {...props}>
      <div className={styles.headerNavIcon}>
        <IconButton
          title="open navigation"
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            toggleNavModal();
          }}
        >
          <BurgerSvg aria-hidden />
        </IconButton>
      </div>
      <div
        title="로아인 홈"
        className={styles.logoWrapper}
        onClick={handleClickLogo}
      >
        <h1>LOA IN</h1>
      </div>
      {showNavModal && <NavModal onClick={handleCloseNavModal} />}
    </div>
  );
});

HeaderView.CharacterList = React.memo(function CharacterList() {
  return (
    <div className={styles.characterList}>
      <MainCharacterSelector />
    </div>
  );
});

export interface HeaderViewButtonsProps
  extends React.HTMLAttributes<HTMLDivElement> {
  showSetting: boolean;
  isDark: boolean;
  isLoggedin: boolean;
  login: () => void;
  logout: () => void;
  toggleSetting: () => void;
  toggleScreenMode: () => void;
}

HeaderView.Buttons = React.forwardRef<HTMLDivElement, HeaderViewButtonsProps>(
  function Buttons(
    {
      showSetting,
      isDark,
      toggleScreenMode,
      isLoggedin,
      login,
      logout,
      toggleSetting,
      ...props
    },
    ref,
  ) {
    return (
      <div className={styles.buttons} {...props} ref={ref}>
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
        {showSetting && (
          <HeaderView.Setting
            isDark={isDark}
            toggleScreenMode={toggleScreenMode}
          />
        )}
      </div>
    );
  },
);

interface HeaderViewSettingProps extends React.HTMLAttributes<HTMLDivElement> {
  toggleScreenMode: () => void;
  isDark: boolean;
}

HeaderView.Setting = React.memo(function Setting({
  isDark,
  toggleScreenMode,
  ...props
}: HeaderViewSettingProps) {
  return (
    <div className={styles.settingWrapper} {...props}>
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
});

interface HeaderViewNavProps extends React.HTMLAttributes<HTMLDivElement> {}

function NavModal({ ...props }: HeaderViewNavProps) {
  return (
    <div className={styles.navModal} {...props}>
      <div
        className={styles.navContent}
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
        }}
      >
        <Nav />
      </div>
      <p
        style={{
          position: "absolute",
          bottom: "16px",
          left: "24px",
          fontSize: "8px",
          color: "rgba(var(--font-faded), 1)",
        }}
      >
        LOA IN. &copy; 2024. All rights reserved.
      </p>
    </div>
  );
}
