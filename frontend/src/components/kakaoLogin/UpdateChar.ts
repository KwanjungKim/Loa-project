import { ICharProps } from "../../atoms/MainCharacter";
import fetchUtils from "../../utils/fetchUtils";

const UpdateChar = (MainCharacterName: ICharProps) => {
  const paramMap = {
    user_number: MainCharacterName.user_number,
    character_name: MainCharacterName.character_name,
  };
  fetchUtils.post("/user/updateCharacters", paramMap).then(() => {
    alert("갱신되었습니다.");
  });
};

export default UpdateChar;
