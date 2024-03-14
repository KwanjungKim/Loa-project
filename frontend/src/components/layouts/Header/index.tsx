import React, { useCallback, useMemo, useRef, useState } from "react";

// recoil
import { useRecoilState, useRecoilValue } from "recoil";
import { loginState } from "@atoms/login";
import { screenModeActions, screenModeState } from "@/atoms/screenModeState";

// utils
import cookies from "@/utils/cookies";

// components
import loginUtils from "@utils/loginUtils";
import HeaderView, { HeaderViewButtonsProps } from "./HeaderView";
import useClickOutside from "@/hooks/useClickOutside";
import { useNavigate } from "react-router-dom";

interface Props extends React.HTMLAttributes<HTMLDivElement> {}

export default function Header({ ...props }: Props) {
  const navigate = useNavigate();

  function handleClickLogo() {
    navigate("/");
  }
  const isLoggedin = useRecoilValue(loginState);
  const [showSetting, setShowSetting] = useState(false);
  const [screenMode, setScreenMode] = useRecoilState(screenModeState);
  const settingRef = useRef<HTMLDivElement>(null);
  const toggleSetting = () => {
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

  useClickOutside(settingRef, handleClickOutsideSetting);

  const headerViewButtonsProps: HeaderViewButtonsProps = useMemo(
    () => ({
      isLoggedin,
      login,
      logout,
      toggleSetting,
    }),
    [isLoggedin],
  );

  return (
    <HeaderView {...props}>
      <HeaderView.Logos handleClickLogo={handleClickLogo} />
      <HeaderView.CharacterList />
      <HeaderView.Buttons {...headerViewButtonsProps} />
      {showSetting && (
        <HeaderView.Setting
          isDark={screenMode === "dark"}
          toggleScreenMode={toggleScreenMode}
          ref={settingRef}
        />
      )}
    </HeaderView>
  );
}
