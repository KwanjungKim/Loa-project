import { atom } from "recoil";

export const LoginState = atom<boolean>({
  key: "LoginState",
  default: false,
});

export const characterState = atom<boolean>({
  key: "CharacterAuthState",
  default: false,
});
