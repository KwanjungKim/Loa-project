import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { useLocation, useNavigate } from "react-router-dom";

// recoil
import { useRecoilState, useRecoilValue } from "recoil";
import { loginState } from "@atoms/login";
import { screenModeActions, screenModeState } from "@atoms/screenModeState";

// hooks
import useClickOutside from "@hooks/useClickOutside";

// utils
import cookies from "@utils/cookies";
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
  const [showNavModal, setShowNavModal] = useState(false);
  const [showSetting, setShowSetting] = useState(false);
  const [screenMode, setScreenMode] = useRecoilState(screenModeState);
  const navModalRef = useRef<HTMLDivElement>(null);
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

  const toggleScreenMode = useCallback(() => {
    const next = screenModeActions.toggle(screenMode);
    setScreenMode(next);
    cookies.set("screenMode", next, 30);
  }, [setScreenMode, screenMode]);

  function login() {
    loginUtils.loginKakao();
  }

  function logout() {
    loginUtils.logoutKakao();
  }

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
    [isLoggedin, showSetting, toggleScreenMode, screenMode],
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

  useClickOutside(settingRef, handleClickOutsideSetting);

  useEffect(() => {
    setShowNavModal(false);
  }, [location]);

  return (
    <HeaderView {...props}>
      <HeaderView.Logos {...headerViewLogosProps} ref={navModalRef} />
      <HeaderView.CharacterList />
      <HeaderView.Buttons {...headerViewButtonsProps} ref={settingRef} />
    </HeaderView>
  );
}
