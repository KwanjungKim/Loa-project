import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";

const { persistAtom } = recoilPersist({
  key: "sessionStorage",
  storage: sessionStorage,
});

export const loginState = atom<boolean>({
  key: "LoginState",
  default: false,
  effects_UNSTABLE: [persistAtom],
});

export const characterState = atom<boolean>({
  key: "CharacterAuthState",
  default: false,
  effects_UNSTABLE: [persistAtom],
});
