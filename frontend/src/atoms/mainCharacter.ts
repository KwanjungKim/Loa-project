import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";

export type ICharProps = {
  user_number: string | undefined;
  character_name: string;
  ServerName: string;
  CharacterName: string;
  CharacterClassName: string;
  ItemMaxLevel: string;
  CardEffects: {
    Description: string;
    Name: string;
  }[];
  ArmoryGemEffects: object;
  ArmoryGems: object;
  ArmoryEngraving: object;
};

const { persistAtom } = recoilPersist({
  key: "sessionStorage",
  storage: sessionStorage,
});

export const mainCharState = atom<ICharProps>({
  key: "MainCharacterState",
  default: {
    user_number: "",
    character_name: "",
    ServerName: "",
    CharacterName: "",
    CharacterClassName: "",
    ItemMaxLevel: "",
    CardEffects: [
      {
        Description: "",
        Name: "",
      },
    ],
    ArmoryGemEffects: {},
    ArmoryGems: {},
    ArmoryEngraving: {},
  },
  effects_UNSTABLE: [persistAtom],
});
