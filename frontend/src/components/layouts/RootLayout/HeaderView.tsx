import React from "react";

// types
import { PaletteMode } from "@mui/material";

// styles
import styles from "./HeaderView.module.scss";

// components
import { SmallButton } from "../../common/Button";
import IconWrapper from "../../common/IconWrapper";

// icons
import LightModeRoundedIcon from "@mui/icons-material/LightModeRounded";
import DarkModeRoundedIcon from "@mui/icons-material/DarkModeRounded";
import LoginIcon from "@mui/icons-material/Login";
import LogoutIcon from "@mui/icons-material/Logout";

export interface IHeaderViewProps
  extends React.AllHTMLAttributes<HTMLDivElement> {
  isLoggedin: boolean;
  handleClickLogout: () => void;
  handleClickLogin: () => void;
  handleClickLogo: () => void;
  paletteMode: PaletteMode;
  handleTogglePaletteMode: () => void;
  isMobile: boolean;
}

const HeaderView = ({
  isLoggedin,
  handleClickLogin,
  handleClickLogout,
  handleClickLogo,
  paletteMode,
  handleTogglePaletteMode,
  isMobile,
  ...props
}: IHeaderViewProps) => {
  return (
    <div className={styles.wrapper} {...props}>
      <IconWrapper aria-label="open home page" onClick={handleClickLogo}>
        LOGO
      </IconWrapper>
      <div className={styles.buttons_wrapper}>
        {isLoggedin ? (
          isMobile ? (
            <IconWrapper aria-label="logout" onClick={handleClickLogout}>
              <LogoutIcon
                focusable="false"
                aria-hidden="true"
                sx={{ fontSize: "22px" }}
              />
            </IconWrapper>
          ) : (
            <SmallButton
              aria-label="logout"
              variant="contained"
              onClick={handleClickLogout}
            >
              logout
            </SmallButton>
          )
        ) : isMobile ? (
          <IconWrapper aria-label="login" onClick={handleClickLogin}>
            <LoginIcon
              focusable="false"
              aria-hidden="true"
              sx={{ fontSize: "22px" }}
            />
          </IconWrapper>
        ) : (
          <SmallButton
            aria-label="login"
            variant="contained"
            onClick={handleClickLogin}
          >
            login
          </SmallButton>
        )}
        <IconWrapper
          aria-label={paletteMode === "light" ? "dark mode" : "light mode"}
          onClick={handleTogglePaletteMode}
        >
          {paletteMode === "light" ? (
            <DarkModeRoundedIcon
              focusable="false"
              aria-hidden="true"
              sx={{ fontSize: "22px", color: "var(--brand-color)" }}
            />
          ) : (
            <LightModeRoundedIcon
              focusable="false"
              aria-hidden="true"
              sx={{ fontSize: "22px", color: "var(--brand-color)" }}
            />
          )}
        </IconWrapper>
      </div>
    </div>
  );
};

export default HeaderView;
