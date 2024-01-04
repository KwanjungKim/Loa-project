import { useRecoilValue, useSetRecoilState } from "recoil";
import { ICharData, MainCharData } from "../../atoms/MainCharacterData";
import { characterData } from "./characterData";

const TestAtomData = () => {
  const MainCharacterData: ICharData = useRecoilValue(MainCharData);

  const setIsMainCharacterDataIn = useSetRecoilState(MainCharData);

  const handleData = () => {
    setIsMainCharacterDataIn({
      ServerName: characterData.ArmoryProfile.ServerName,
      CharacterName: characterData.ArmoryProfile.CharacterName,
      CharacterClassName: characterData.ArmoryProfile.CharacterClassName,
      ItemMaxLevel: characterData.ArmoryProfile.ItemMaxLevel,
      CardEffects: [
        characterData.ArmoryCard.Effects[0].Items[0],
        characterData.ArmoryCard.Effects[0].Items[1],
        characterData.ArmoryCard.Effects[0].Items[2],
        characterData.ArmoryCard.Effects[0].Items[3],
        characterData.ArmoryCard.Effects[0].Items[4],
        characterData.ArmoryCard.Effects[1].Items[0],
        characterData.ArmoryCard.Effects[1].Items[1],
        characterData.ArmoryCard.Effects[1].Items[2],
        characterData.ArmoryCard.Effects[1].Items[3],
        characterData.ArmoryCard.Effects[1].Items[4],
      ],
      ArmoryGem: characterData.ArmoryGem,
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
        <button onClick={() => console.log(MainCharacterData.CardEffects)}>
          111
        </button>
      </div>
    </>
  );
};

export default TestAtomData;
