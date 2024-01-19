import { atom } from "recoil";

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

export const MainCharState = atom<ICharProps>({
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
});
