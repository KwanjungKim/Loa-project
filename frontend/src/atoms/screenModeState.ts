import { atom } from "recoil";

type IScreenMode = "dark" | "light";

export const screenModeState = atom<IScreenMode>({
  key: "screenModeState",
  default: "dark",
});

export const screenModeActions = {
  toggle: (prev: string) => (prev === "dark" ? "light" : "dark"),
};
