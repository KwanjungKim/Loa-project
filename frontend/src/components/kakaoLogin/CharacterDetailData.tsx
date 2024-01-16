import { useRecoilValue, useSetRecoilState } from "recoil";
import { ICharData, MainCharData } from "../../atoms/MainCharacterData";
import { MainCharState } from "../../atoms/MainCharacter";
import fetchUtils from "../../utils/fetchUtils";
import { useCallback, useEffect, useState } from "react";
import CharacterDetailDataView, {
  IDetailData,
} from "./CharacterDetailDataView";

export type ICharDetailData = {
  serverName: string;
  characterClassName: string;
  itemMaxLevel: string;
  character_name: string;
  cardEffects: {
    Effects: { Items: string }[];
  };
  armoryGem: {
    Effects: { Descrition: string; Name: string }[];
    Gems: { Name: string }[];
  };
  armoryEngraving: { Effects: [] };
};

const emptyState: ICharDetailData = {
  serverName: "",
  characterClassName: "",
  itemMaxLevel: "",
  character_name: "",
  cardEffects: {
    Effects: [],
  },
  armoryGem: {
    Effects: [],
    Gems: [],
  },
  armoryEngraving: { Effects: [] },
};
const CharacterDetailData = () => {
  const MainCharacterData: ICharData = useRecoilValue(MainCharData);
  const isMainChar = useRecoilValue(MainCharState);
  const setIsMainCharacterDataIn = useSetRecoilState(MainCharData);
  const [isCharacterData, setIsCharacterData] =
    useState<ICharDetailData>(emptyState);

  const getData = useCallback(() => {
    // 카드 효과
    const cardMap = () => {
      const CardEffect: any[] = [];
      let i, j: number;
      for (i = 0; i < isCharacterData.cardEffects?.Effects.length; i++) {
        for (
          j = 0;
          j < isCharacterData.cardEffects?.Effects[i].Items.length;
          j++
        )
          CardEffect.push(isCharacterData.cardEffects?.Effects[i].Items[j]);
      }
      return CardEffect;
    };
    // 보석 효과
    const gemEffectMap = () => {
      const GemEffect: any[] = [];
      let i: number;
      for (i = 0; i < isCharacterData.armoryGem?.Effects.length; i++) {
        GemEffect.push(isCharacterData.armoryGem?.Effects[i]);
      }
      return GemEffect;
    };
    // 보석 리스트
    const gemsMap = () => {
      const Gem: any[] = [];
      let i: number;
      for (i = 0; i < isCharacterData.armoryGem?.Gems.length; i++) {
        Gem.push(isCharacterData.armoryGem?.Gems[i]);
      }
      return Gem;
    };
    // 각인효과
    const engravingMap = () => {
      const engravingEffect: any[] = [];
      let i: number;
      for (i = 0; i < isCharacterData.armoryEngraving?.Effects.length; i++) {
        engravingEffect.push(isCharacterData.armoryEngraving?.Effects[i]);
      }
      return engravingEffect;
    };

    if (isMainChar.character_name != MainCharacterData.CharacterName) {
      const paramMap = {
        character_name: isMainChar.character_name?.toString(),
      };
      fetchUtils.post("/user/getCharacter", paramMap).then((res) => {
        setIsCharacterData(res.data.characterModel);
      });
      setIsMainCharacterDataIn({
        ServerName: isCharacterData.serverName,
        CharacterName: isCharacterData.character_name,
        CharacterClassName: isCharacterData.characterClassName,
        ItemMaxLevel: isCharacterData.itemMaxLevel,
        CardEffects: cardMap(),
        ArmoryGemEffects: gemEffectMap(),
        ArmoryGems: gemsMap(),
        ArmoryEngraving: engravingMap(),
      });
    }
  }, [
    isMainChar.character_name,
    MainCharacterData.CharacterName,
    isCharacterData.serverName,
    isCharacterData.character_name,
    isCharacterData.characterClassName,
    isCharacterData.itemMaxLevel,
    setIsMainCharacterDataIn,
    isCharacterData.armoryEngraving?.Effects,
    isCharacterData.armoryGem?.Effects,
    isCharacterData.armoryGem?.Gems,
    isCharacterData.cardEffects?.Effects,
  ]);

  useEffect(() => {
    getData();
  }, [getData]);

  const CharDetailDataViewProps: IDetailData = {
    MainCharacterData,
  };

  return <CharacterDetailDataView {...CharDetailDataViewProps} />;
};

export default CharacterDetailData;
