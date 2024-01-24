import { useEffect, useState } from "react";
import fetchUtils from "../../utils/fetchUtils";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { mainCharState } from "../../atoms/mainCharacter";
import { characterState } from "../../atoms/login";
import GetCharacterListView, {
  IGetCharacterViewProps,
} from "./getCharacterListView";

const GetCharacterList = () => {
  const [charList, setCharList] = useState({});
  const setMainCharState = useSetRecoilState(mainCharState);
  const isMainChar = useRecoilValue(mainCharState);
  const isCharacterState = useRecoilValue(characterState);
  const isLoginState = useRecoilValue(characterState);

  useEffect(() => {
    const paramMap = {
      user_number: isMainChar.user_number?.toString(),
    };
    fetchUtils.post("/user/getAllCharacters", paramMap).then((res) => {
      if (!res.success) {
        alert(`${res.message}`);
      }
      if (res.success) {
        setCharList(res.data.characterModelList);
      }
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
