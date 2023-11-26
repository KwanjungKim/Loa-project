import { useNavigate } from "react-router-dom";
import { useMediaQuery } from "@mui/material";

// utils
import loginUtils from "../../../utils/loginUtils";

// components
import HeaderView, { IHeaderViewProps } from "./HeaderView";

// recoil
import { useRecoilState } from "recoil";
import paletteModeState, {
  paletteModeActions,
} from "../../../atoms/paletteMode";

const Header = () => {
  const navigate = useNavigate();
  const isLoggedin = loginUtils.isLoggedin();
  const [paletteMode, setPaletteMode] = useRecoilState(paletteModeState);
  const isMobile = useMediaQuery("(max-width: 480px)");

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
