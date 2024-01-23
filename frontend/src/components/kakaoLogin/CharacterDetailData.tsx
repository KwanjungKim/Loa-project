import { useRecoilValue, useSetRecoilState } from "recoil";
import { mainCharState } from "../../atoms/mainCharacter";
import fetchUtils from "../../utils/fetchUtils";
import { useCallback, useEffect } from "react";
import CharacterDetailDataView, {
  IDetailData,
} from "./CharacterDetailDataView";

const CharacterDetailData = () => {
  const isMainChar = useRecoilValue(mainCharState);
  const setIsMainCharacterDataIn = useSetRecoilState(mainCharState);

  const getData = useCallback(() => {
    if (isMainChar.character_name != isMainChar.CharacterName) {
      const paramMap = {
        character_name: isMainChar.character_name,
      };
      fetchUtils.post("/user/getCharacter", paramMap).then((res) => {
        // 카드 효과
        const cardMap = () => {
          const CardEffect: any[] = [];
          let i, j: number;
          for (
            i = 0;
            i < res.data.characterModel.cardEffects?.Effects.length;
            i++
          ) {
            for (
              j = 0;
              j < res.data.characterModel.cardEffects?.Effects[i].Items.length;
              j++
            )
              CardEffect.push(
                res.data.characterModel.cardEffects?.Effects[i].Items[j],
              );
          }
          return CardEffect;
        };
        // 보석 효과
        const gemEffectMap = () => {
          const GemEffect: any[] = [];
          let i: number;
          for (
            i = 0;
            i < res.data.characterModel.armoryGem?.Effects.length;
            i++
          ) {
            GemEffect.push(res.data.characterModel.armoryGem?.Effects[i]);
          }
          return GemEffect;
        };
        // 보석 리스트
        const gemsMap = () => {
          const Gem: any[] = [];
          let i: number;
          for (i = 0; i < res.data.characterModel.armoryGem?.Gems.length; i++) {
            Gem.push(res.data.characterModel.armoryGem?.Gems[i]);
          }
          return Gem;
        };
        // 각인 효과
        const engravingMap = () => {
          const engravingEffect: any[] = [];
          let i: number;
          for (
            i = 0;
            i < res.data.characterModel.armoryEngraving?.Effects.length;
            i++
          ) {
            engravingEffect.push(
              res.data.characterModel.armoryEngraving?.Effects[i],
            );
          }
          return engravingEffect;
        };
        setIsMainCharacterDataIn((prev) => {
          console.log("resdata", res.data.characterModel);
          return {
            ...prev,
            ServerName: res.data.characterModel.serverName,
            CharacterName: res.data.characterModel.character_name,
            CharacterClassName: res.data.characterModel.characterClassName,
            ItemMaxLevel: res.data.characterModel.itemMaxLevel,
            CardEffects: cardMap(),
            ArmoryGemEffects: gemEffectMap(),
            ArmoryGems: gemsMap(),
            ArmoryEngraving: engravingMap(),
          };
        });
      });
    }
  }, [
    isMainChar.character_name,
    isMainChar.CharacterName,
    setIsMainCharacterDataIn,
  ]);

  useEffect(() => {
    getData();
  }, [getData]);

  const charDetailDataViewProps: IDetailData = {
    isMainChar,
  };

  return <CharacterDetailDataView {...charDetailDataViewProps} />;
};

export default CharacterDetailData;
