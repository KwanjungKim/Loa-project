import { useRecoilValue, useSetRecoilState } from "recoil";
import { ICharData, MainCharData } from "../../atoms/MainCharacterData";
import { MainCharState } from "../../atoms/MainCharacter";
import fetchUtils from "../../utils/fetchUtils";
import { useState } from "react";
type ICharDetailData = {
  serverName: string;
  characterClassName: string;
  itemMaxLevel: string;
  character_name: string;
  cardEffects: {
    Effects: [Items: any];
  };
  armoryGemEffects: {
    Effects: [];
  };
  armoryGems: {
    Gems: [];
  };
};
const TestAtomData = () => {
  const MainCharacterData: ICharData = useRecoilValue(MainCharData);
  const isMainChar = useRecoilValue(MainCharState);
  const setIsMainCharacterDataIn = useSetRecoilState(MainCharData);
  const [isCharacterData, setIsCharacterData] = useState<ICharDetailData | any>(
    {},
  );

  const handleData = () => {
    setIsMainCharacterDataIn({
      ServerName: isCharacterData.serverName,
      CharacterName: isCharacterData.character_name,
      CharacterClassName: isCharacterData.characterClassName,
      ItemMaxLevel: isCharacterData.itemMaxLevel,
      CardEffects: cardMap(),
      ArmoryGemEffects: gemEffectMap(),
      ArmoryGems: gemsMap(),
    });
    console.log();
  };

  const cardMap = () => {
    const CardEffect: any[] = [];

    let i, j: number;
    for (i = 0; i < isCharacterData.cardEffects.Effects.length; i++) {
      for (j = 0; j < isCharacterData.cardEffects.Effects[i].Items.length; j++)
        CardEffect.push(isCharacterData.cardEffects.Effects[i].Items[j]);
    }

    return CardEffect;
  };
  const gemEffectMap = () => {
    const GemEffect: any[] = [];
    let i: number;
    for (i = 0; i < isCharacterData.armoryGem.Effects.length; i++) {
      GemEffect.push(isCharacterData.armoryGem.Effects[i]);
    }
    return GemEffect;
  };
  const gemsMap = () => {
    const Gem: any[] = [];

    let i: number;
    for (i = 0; i < isCharacterData.armoryGem.Gems.length; i++) {
      if (isCharacterData.armoryGem.Gems[i].Name.includes("레벨 멸화의 보석")) {
        Gem.push(isCharacterData.armoryGem.Gems[i].Level + "레벨 멸화의 보석");
        console.log("1", isCharacterData.armoryGem.Gems[i].Level);
      }
      if (isCharacterData.armoryGem.Gems[i].Name.includes("레벨 홍염의 보석")) {
        Gem.push(isCharacterData.armoryGem.Gems[i].Level + "레벨 홍염의 보석");
        console.log("1", isCharacterData.armoryGem.Gems[i].Level);
      }
    }
    console.log(Gem);
    return Gem;
  };
  const getData = () => {
    const paramMap = {
      character_name: isMainChar.character_name?.toString(),
    };
    fetchUtils.post("/user/getCharacter", paramMap).then((res) => {
      setIsCharacterData(res.data.characterModel);
    });
  };
  return (
    <>
      <button onClick={() => handleData()}>데이터 넣기</button>
      <button onClick={() => console.log(MainCharacterData)}>console</button>
      <div>
        서버 : {MainCharacterData.ServerName} <br />
        캐릭터명 : {MainCharacterData.CharacterName}
        <br />
        클래스 : {MainCharacterData.CharacterClassName}
        <br />
        level : {MainCharacterData.ItemMaxLevel}
        <br />
        카드 :{" "}
        {Object.values(MainCharacterData.CardEffects).map((value, i) => (
          <div key={i}>{value.Name}</div>
        ))}
        카드 세트 효과 :
        {Object.values(MainCharacterData.CardEffects).map((value, i) => (
          <div key={i}>{value.Description}</div>
        ))}
        보석 :
        {Object.values(MainCharacterData.ArmoryGemEffects).map((value, i) => (
          <div key={i}>
            {value.Name} : {value.Description}
          </div>
        ))}
        {Object.values(MainCharacterData.ArmoryGems).map((value, i) => (
          <div key={i}>{value}</div>
        ))}
        <button onClick={() => getData()}>111</button>
        <button onClick={() => gemsMap()}>222</button>
      </div>
    </>
  );
};

export default TestAtomData;
