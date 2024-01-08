import { useEffect, useState } from "react";
import fetchUtils from "../../utils/fetchUtils";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { MainCharState } from "../../atoms/MainCharacter";
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
    };
    fetchUtils.post("/user/getAllCharacters", paramMap).then((res) => {
      setCharList(res.data.characterModel);
    });
  }, [mainCharState.user_number]);

  const handleSelect = (e: any) => {
    setMainCharState((prev) => {
      return {
        ...prev,
        character_name: e,
      };
    });
  };
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
};

export default GetCharacterList;
