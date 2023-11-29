import { useNavigate } from "react-router-dom";
import { useMediaQuery } from "@mui/material";

// utils
// import loginUtils from "../../../utils/loginUtils";

// components
import HeaderView, { IHeaderViewProps } from "./HeaderView";

// recoil
import { useRecoilState, useRecoilValue } from "recoil";
import paletteModeState, {
  paletteModeActions,
} from "../../../atoms/paletteMode";
import { LoginState } from "../../../atoms/Login";

const Header = () => {
  const navigate = useNavigate();

  const [paletteMode, setPaletteMode] = useRecoilState(paletteModeState);
  const isLoggedin = useRecoilValue(LoginState);
  const isMobile = useMediaQuery("(max-width: 480px)");
  console.log(isLoggedin);
  const headerViewProps: IHeaderViewProps = {
    isLoggedin,
    handleClickLogin: () => console.log("login"),
    handleClickLogout: () => console.log("logout"),
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
