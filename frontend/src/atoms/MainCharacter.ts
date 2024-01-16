import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";

export type ICharProps = {
  user_number: string | undefined;
  character_name: string;
};

const { persistAtom } = recoilPersist({
  key: "localStorage",
  storage: localStorage,
});

export const MainCharState = atom<ICharProps>({
  key: "MainCharacterState",
  default: {
    user_number: "",
    character_name: "",
  },
  effects_UNSTABLE: [persistAtom],
});
