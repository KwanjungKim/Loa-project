import { PaletteMode } from "@mui/material";
import { atom } from "recoil";

const paletteModeState = atom<PaletteMode>({
  key: "paletteMode",
  default: "dark",
});

export const paletteModeActions = {
  toggle: (prev: PaletteMode) => {
    return prev === "dark" ? "light" : "dark";
  },
  setDark: () => {
    return "dark";
  },
  setLight: () => {
    return "light";
  },
};

export default paletteModeState;
