import React from "react";

// types
import { PaletteMode } from "@mui/material";

// styles
import styles from "./HeaderView.module.scss";

// components
import { SmallButton } from "../../common/Button";

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
      <div style={{ cursor: "pointer" }} onClick={handleClickLogo}>
        LOGO
      </div>
      <div className={styles.buttons_wrapper}>
        {isLoggedin ? (
          isMobile ? (
            <LogoutIcon
              sx={{ fontSize: "22px", cursor: "pointer" }}
              onClick={handleClickLogout}
            />
          ) : (
            <SmallButton variant="contained" onClick={handleClickLogout}>
              logout
            </SmallButton>
          )
        ) : isMobile ? (
          <LoginIcon
            sx={{ fontSize: "22px", cursor: "pointer" }}
            onClick={handleClickLogin}
          />
        ) : (
          <SmallButton variant="contained" onClick={handleClickLogin}>
            login
          </SmallButton>
        )}
        <div className={styles.theme_button} onClick={handleTogglePaletteMode}>
          {paletteMode === "light" ? (
            <DarkModeRoundedIcon
              sx={{ fontSize: "22px", color: "var(--brand-color)" }}
            />
          ) : (
            <LightModeRoundedIcon
              sx={{ fontSize: "22px", color: "var(--brand-color)" }}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default HeaderView;
