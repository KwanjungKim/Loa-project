import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { useLocation, useNavigate } from "react-router-dom";

// recoil
import { useRecoilValue, useSetRecoilState } from "recoil";
import { characterState, loginState } from "@atoms/login";
import { mainCharState, mainCharacterActions } from "@atoms/mainCharacter";

// hooks
import useClickOutside from "@hooks/useClickOutside";
import useScreenMode from "@hooks/useScreenMode";

// utils
import loginUtils from "@utils/loginUtils";

// components
import HeaderView, {
  HeaderViewButtonsProps,
  HeaderViewLogosProps,
} from "./HeaderView";

interface Props extends React.HTMLAttributes<HTMLDivElement> {}

export default function Header({ ...props }: Props) {
  const navigate = useNavigate();
  const location = useLocation();

  const handleClickLogo = useCallback(() => {
    navigate("/");
  }, [navigate]);

  const isLoggedin = useRecoilValue(loginState);
  const setIsLoggedin = useSetRecoilState(loginState);
  const setCharacterState = useSetRecoilState(characterState);
  const setMainCharacterState = useSetRecoilState(mainCharState);

  // screen mode
  const { screenMode, toggleScreenMode } = useScreenMode();

  const [showNavModal, setShowNavModal] = useState(false);
  const [showSetting, setShowSetting] = useState(false);
  const settingRef = useRef<HTMLDivElement>(null);

  const toggleNavModal = () => {
    setShowNavModal((prev) => !prev);
  };
  const handleCloseNavModal = () => {
    setShowNavModal(false);
  };
  const toggleSetting = () => {
    setShowNavModal(false);
    setShowSetting((prev) => !prev);
  };
  const handleClickOutsideSetting = useCallback(() => {
    if (!showSetting) return;
    setShowSetting(false);
  }, [showSetting]);

  useClickOutside(settingRef, handleClickOutsideSetting);

  function login() {
    loginUtils.loginKakao();
  }

  const logout = useCallback(() => {
    const ok = confirm("로그아웃 하시겠습니까?");
    if (!ok) return;
    loginUtils.logoutKakao();
    setIsLoggedin(false);
    setCharacterState(false);
    setMainCharacterState(mainCharacterActions.reset);
    navigate("/");
  }, [setIsLoggedin, setCharacterState, navigate, setMainCharacterState]);

  const headerViewButtonsProps: HeaderViewButtonsProps = useMemo(
    () => ({
      isDark: screenMode === "dark",
      showSetting,
      isLoggedin,
      toggleScreenMode,
      login,
      logout,
      toggleSetting,
    }),
    [isLoggedin, showSetting, toggleScreenMode, screenMode, logout],
  );

  const headerViewLogosProps: HeaderViewLogosProps = useMemo(
    () => ({
      showNavModal,
      handleClickLogo,
      toggleNavModal,
      handleCloseNavModal,
    }),
    [showNavModal, handleClickLogo],
  );

  useEffect(() => {
    setShowNavModal(false);
  }, [location]);

  useEffect(() => {
    if (showNavModal) {
      document.body.style.overflowY = "hidden";
    } else {
      document.body.style.overflowY = "auto";
    }
  }, [showNavModal]);
  useEffect(() => {
    return () => {
      document.body.style.overflowY = "auto";
    };
  }, []);

  return (
    <HeaderView {...props}>
      <HeaderView.Logos {...headerViewLogosProps} />
      <HeaderView.CharacterList />
      <HeaderView.Buttons {...headerViewButtonsProps} ref={settingRef} />
    </HeaderView>
  );
}
