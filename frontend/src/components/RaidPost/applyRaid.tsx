import { useRecoilValue } from "recoil";
import { mainCharState } from "../../atoms/mainCharacter";
import fetchUtils from "../../utils/fetchUtils";
import { useState } from "react";
import { MediumButton } from "../common/Button";
interface Props {
  articleId: string;
}

const ApplyRaid = ({ articleId }: Props) => {
  const characterName = useRecoilValue(mainCharState);
  const [mention, setMention] = useState<string>("");

  const param = {
    board_number: articleId,
    character_name: characterName.character_name,
    mention: mention,
  };
  const applyRaid = () => {
    fetchUtils.post("/board/apply", param).then((res) => {
      if (!res.success) {
        alert(res.message);
      } else {
        alert(res.message);
      }
    });
  };
  return (
    <>
      <input type="text" onChange={(e) => setMention(e.target.value)} />
      <MediumButton variant="contained" onClick={() => applyRaid()}>
        레이드 지원
      </MediumButton>
      <button onClick={() => console.log(characterName)}>123</button>
    </>
  );
};

export default ApplyRaid;
