import { useNavigate } from "react-router-dom";
import { useMediaQuery } from "@mui/material";

// utils
// import loginUtils from "../../../utils/loginUtils";

// components
import HeaderView, { IHeaderViewProps } from "./HeaderView";

// recoil
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import paletteModeState, {
  paletteModeActions,
} from "../../../atoms/paletteMode";
import { LoginState } from "../../../atoms/Login";
import loginUtils from "../../../utils/loginUtils";

const Header = () => {
  const navigate = useNavigate();
  const setIsLoggedIn = useSetRecoilState(LoginState);
  const [paletteMode, setPaletteMode] = useRecoilState(paletteModeState);

  const isLoggedin = useRecoilValue(LoginState);
  const isMobile = useMediaQuery("(max-width: 480px)");
  const headerViewProps: IHeaderViewProps = {
    isLoggedin,
    handleClickLogin: () => loginUtils.loginKakao(),
    handleClickLogout: () => {
      loginUtils.logoutKakao();
      setIsLoggedIn(false);
      navigate("/");
    },
    handleClickLogo: () => navigate("/"),
    paletteMode,
    handleTogglePaletteMode: () => {
      setPaletteMode(paletteModeActions.toggle);
    },
    isMobile,
  };

  return <HeaderView {...headerViewProps} />;
};

export default Header;
