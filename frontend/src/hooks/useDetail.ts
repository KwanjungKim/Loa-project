import { useRecoilValue } from "recoil";
import { mainCharState } from "../atoms/mainCharacter";
import fetchUtils from "../utils/fetchUtils";
import { useCallback, useEffect, useState } from "react";

export interface ISetProps {
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
}
export interface IProps {
  character_name: string;
}

const useDetail = (userName: IProps) => {
  const defaultUserData = {
    ServerName: "",
    CharacterName: "",
    CharacterClassName: "",
    ItemMaxLevel: "",
    CardEffects: [],
    ArmoryGemEffects: [],
    ArmoryGems: [],
    ArmoryEngraving: [],
  };
  const [userData, setUserData] = useState<ISetProps>(defaultUserData);
  const characterData = useRecoilValue(mainCharState);
  const characterSpec = useCallback(() => {
    if (userName.character_name != characterData.CharacterName) {
      fetchUtils.post("/user/getCharacter", userName).then((res) => {
        if (!res.success) {
          alert(`${res.message}`); // 오류가 발생했습니다 메시지 출력
        } else {
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
                j <
                res.data.characterModel.cardEffects?.Effects[i].Items.length;
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
            for (
              i = 0;
              i < res.data.characterModel.armoryGem?.Gems.length;
              i++
            ) {
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
          setUserData({
            ServerName: res.data.characterModel.serverName,
            CharacterName: res.data.characterModel.character_name,
            CharacterClassName: res.data.characterModel.characterClassName,
            ItemMaxLevel: res.data.characterModel.itemMaxLevel,
            CardEffects: cardMap(),
            ArmoryGemEffects: gemEffectMap(),
            ArmoryGems: gemsMap(),
            ArmoryEngraving: engravingMap(),
          });
        }
      });
    }
  }, [userName, characterData.CharacterName]);

  useEffect(() => {
    characterSpec();
  }, [characterSpec]);
  return {
    userData,
  };
};

export default useDetail;
