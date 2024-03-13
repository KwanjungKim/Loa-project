import React, { useCallback, useMemo } from "react";

// recoil
import { useRecoilState, useRecoilValue } from "recoil";
import { loginState } from "@atoms/login";
import { screenModeActions, screenModeState } from "@/atoms/screenModeState";

// utils
import cookies from "@/utils/cookies";

// components
import loginUtils from "@utils/loginUtils";
import HeaderView, { HeaderViewProps } from "./HeaderView";

interface Props extends React.AllHTMLAttributes<HTMLDivElement> {}

export default function Header({ ...props }: Props) {
  const isLoggedin = useRecoilValue(loginState);

  const [screenMode, setScreenMode] = useRecoilState(screenModeState);
  const handleToggleScreenMode = useCallback(
    function handleToggleScreenMode(currentMode: "light" | "dark") {
      const next = screenModeActions.toggle(currentMode);
      setScreenMode(next);
      cookies.set("screenMode", next, 30);
    },
    [setScreenMode],
  );

  function login() {
    loginUtils.loginKakao();
  }

  function logout() {
    loginUtils.logoutKakao();
  }

  const headerViewProps: HeaderViewProps = useMemo(
    () => ({
      isLoggedin,
      login,
      logout,
      screenMode,
      handleToggleScreenMode,
    }),
    [isLoggedin, screenMode, handleToggleScreenMode],
  );

  return <HeaderView {...headerViewProps} {...props} />;
}
