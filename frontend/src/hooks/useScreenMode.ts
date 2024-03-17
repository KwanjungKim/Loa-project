import { useCallback } from "react";

// recoil
import { useRecoilState } from "recoil";
import { screenModeActions, screenModeState } from "@atoms/screenModeState";

// utils
import cookies from "@utils/cookies";

const useScreenMode = () => {
  const [screenMode, setScreenMode] = useRecoilState(screenModeState);
  const toggleScreenMode = useCallback(() => {
    const next = screenModeActions.toggle(screenMode);
    setScreenMode(next);
    cookies.set("screenMode", next, 30);
  }, [setScreenMode, screenMode]);

  return {
    screenMode,
    toggleScreenMode,
  };
};

export default useScreenMode;
