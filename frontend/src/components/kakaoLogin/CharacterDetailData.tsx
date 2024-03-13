import { useRecoilValue, useSetRecoilState } from "recoil";
import { mainCharState } from "../../atoms/mainCharacter";

import { useCallback, useEffect } from "react";
import CharacterDetailDataView, {
  IDetailData,
} from "./CharacterDetailDataView";
import useDetail from "../../hooks/useDetail";

const CharacterDetailData = () => {
  const isMainChar = useRecoilValue(mainCharState);
  const userName = {
    character_name: isMainChar.character_name,
  };

  const setIsMainCharacterDataIn = useSetRecoilState(mainCharState);

  const { userData } = useDetail(userName);

  const getData = useCallback(() => {
    if (isMainChar.character_name != isMainChar.CharacterName) {
      console.log(userData);
      setIsMainCharacterDataIn((prev) => {
        return {
          ...prev,
          ServerName: userData.ServerName,
          CharacterName: userData.CharacterName,
          CharacterClassName: userData.CharacterClassName,
          ItemMaxLevel: userData.ItemMaxLevel,
          CardEffects: userData.CardEffects,
          ArmoryGemEffects: userData.ArmoryGemEffects,
          ArmoryGems: userData.ArmoryGems,
          ArmoryEngraving: userData.ArmoryEngraving,
        };
      });
    }
  }, [
    isMainChar.character_name,
    isMainChar.CharacterName,
    setIsMainCharacterDataIn,
    userData,
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
