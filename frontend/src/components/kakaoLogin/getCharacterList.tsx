import { useEffect, useState } from "react";
import fetchUtils from "../../utils/fetchUtils";
import { useRecoilValue } from "recoil";
import { MainCharState } from "../../atoms/MainCharacter";
import { characterState } from "../../atoms/Login";

const GetCharacterList = () => {
  const [charList, setCharList] = useState({});

  const user_number = useRecoilValue(MainCharState);
  const CharacterState = useRecoilValue(characterState);

  useEffect(() => {
    const paramMap = {
      user_number: user_number.user_number?.toString(),
    };
    fetchUtils.post("/user/getAllCharacters", paramMap).then((res) => {
      setCharList(res.data.characterModel);
    });
  }, [user_number.user_number]);
  console.log(charList);
  return (
    <select
      style={{
        display: CharacterState ? "block" : "none",
        height: "35px",
        borderRadius: "5px",
        border: "3px solid #fbc02d",
      }}
    >
      {Object.values(charList).map((value: any, i: any) => (
        <option key={i}>
          {value.serverName} {value.character_name}
          Lv.{value.itemMaxLevel} {value.characterClassName}
        </option>
      ))}
    </select>
  );
};

export default GetCharacterList;
