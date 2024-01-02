import { atom } from "recoil";

export type ICharProps = {
  user_number: string;
  character_name: string;
};
export const MainCharState = atom<ICharProps>({
  key: "MainCharacterState",
  default: {
    user_number: "",
    character_name: "",
  },
});