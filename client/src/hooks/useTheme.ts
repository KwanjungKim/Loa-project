import { PaletteMode, ThemeOptions, createTheme } from "@mui/material";
import { useRecoilValue } from "recoil";
import paletteModeState from "../atoms/paletteMode";
import { useMemo } from "react";
import { yellow } from "@mui/material/colors";

const getPalette = (mode: PaletteMode): ThemeOptions => ({
  breakpoints: {
    values: {
      xs: 0,
      sm: 320,
      md: 480,
      lg: 768,
      xl: 1024,
    },
  },
  palette: {
    mode,
    ...(mode === "light"
      ? {
          primary: {
            main: yellow[700],
            // contrastText: "#161b27",
          },
          background: {
            default: "#fff",
          },
          text: {
            primary: "#161b27",
          },
        }
      : {
          primary: {
            main: yellow[700],
            // contrastText: "black",
          },
          background: {
            default: "#161b27",
          },
          text: {
            primary: "#fff",
          },
        }),
  },
});

const useTheme = () => {
  const paletteMode = useRecoilValue(paletteModeState);

  const theme = useMemo(
    () => createTheme(getPalette(paletteMode)),
    [paletteMode],
  );

  return theme;
};

export default useTheme;
