import { useEffect, useState } from "react";
import fetchUtils from "../../utils/fetchUtils";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { MainCharState } from "../../atoms/MainCharacter";
<<<<<<< HEAD
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
=======
import { characterState, loginState } from "../../atoms/Login";

const GetCharacterList = () => {
  const [charList, setCharList] = useState({});

  const mainCharState = useRecoilValue(MainCharState);
  const setMainCharState = useSetRecoilState(MainCharState);
  const CharacterState = useRecoilValue(characterState);
  const LoginState = useRecoilValue(loginState);

  useEffect(() => {
    const paramMap = {
      user_number: mainCharState.user_number?.toString(),
>>>>>>> 26d51b0e9a5ca363748f185843d9916c100740fe
    };
    fetchUtils.post("/user/getAllCharacters", paramMap).then((res) => {
      setCharList(res.data.characterModelList);
    });
<<<<<<< HEAD
  }, [isMainChar.user_number]);
=======
  }, [mainCharState.user_number]);
>>>>>>> 26d51b0e9a5ca363748f185843d9916c100740fe

  const handleSelect = (e: any) => {
    setMainCharState((prev) => {
      return {
        ...prev,
        character_name: e,
      };
    });
  };
<<<<<<< HEAD

  const characterListViewProps: IGetCharacterViewProps = {
    isCharacterState,
    isLoginState,
    charList,
    isMainChar,
    handleSelect,
  };

  return <GetCharacterListView {...characterListViewProps} />;
=======
  return (
    <>
      <button onClick={() => console.log(mainCharState)}>123</button>
      <select
        onChange={(e) => handleSelect(e.target.value)}
        value={mainCharState.character_name.toString()}
        style={{
          display: CharacterState && LoginState ? "block" : "none",
          height: "35px",
          borderRadius: "5px",
          border: "3px solid #fbc02d",
        }}
      >
        {Object.values(charList).map((value: any, i: any) => (
          <option key={i} value={value.character_name}>
            {value.serverName} {value.character_name}
            Lv.{value.itemMaxLevel} {value.characterClassName}
          </option>
        ))}
      </select>
    </>
  );
>>>>>>> 26d51b0e9a5ca363748f185843d9916c100740fe
};

export default GetCharacterList;
