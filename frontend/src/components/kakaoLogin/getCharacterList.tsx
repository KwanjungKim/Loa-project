import { useEffect, useState } from "react";
import fetchUtils from "../../utils/fetchUtils";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { MainCharState } from "../../atoms/MainCharacter";
import { characterState } from "../../atoms/Login";
import GetCharacterListView, {
  IGetCharacterViewProps,
} from "./getCharacterListView";

const GetCharacterList = () => {
  const [charList, setCharList] = useState({});
  const setMainCharState = useSetRecoilState(MainCharState);
  const isMainChar = useRecoilValue(MainCharState);
  const isCharacterState = useRecoilValue(characterState);
  const isLoginState = useRecoilValue(characterState);

  useEffect(() => {
    const paramMap = {
      user_number: isMainChar.user_number?.toString(),
    };
    fetchUtils.post("/user/getAllCharacters", paramMap).then((res) => {
      setCharList(res.data.characterModelList);
    });
  }, [isMainChar.user_number]);

  const handleSelect = (e: any) => {
    setMainCharState((prev) => {
      return {
        ...prev,
        character_name: e,
      };
    });
  };

  const characterListViewProps: IGetCharacterViewProps = {
    isCharacterState,
    isLoginState,
    charList,
    isMainChar,
    handleSelect,
  };

  return <GetCharacterListView {...characterListViewProps} />;
};

export default GetCharacterList;
