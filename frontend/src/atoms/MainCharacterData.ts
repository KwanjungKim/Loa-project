import { atom } from "recoil";

export type ICharData = {
  ServerName: string;
  CharacterName: string;
  CharacterClassName: string;
  ItemMaxLevel: string;
  CardEffects: object;
  ArmoryGem: object;
};
export const MainCharData = atom<ICharData>({
  key: "MainCharacterData",
  default: {
    ServerName: "",
    CharacterName: "",
    CharacterClassName: "",
    ItemMaxLevel: "",
    CardEffects: {},
    ArmoryGem: {},
  },
});
