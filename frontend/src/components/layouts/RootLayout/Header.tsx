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
import { characterState, loginState } from "../../../atoms/123";
import loginUtils from "../../../utils/loginUtils";

const Header = () => {
  const navigate = useNavigate();
  const setIsLoggedIn = useSetRecoilState(loginState);
  const setIsCharacterState = useSetRecoilState(characterState);
  const [paletteMode, setPaletteMode] = useRecoilState(paletteModeState);

  const isLoggedin = useRecoilValue(loginState);
  const isMobile = useMediaQuery("(max-width: 480px)");
  const headerViewProps: IHeaderViewProps = {
    isLoggedin,
    handleClickLogin: () => loginUtils.loginKakao(),
    handleClickLogout: () => {
      loginUtils.logoutKakao();
      setIsLoggedIn(false);
      setIsCharacterState(false);
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
