import { useRecoilValue } from "recoil";
import { mainCharState } from "../../atoms/mainCharacter";
import fetchUtils from "../../utils/fetchUtils";
import { useState } from "react";
import { SmallButton } from "../common/Button";
import dayjs from "dayjs";
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
    startDate: dayjs(),
  };
  const applyRaid = () => {
    if (confirm(`${characterName.character_name}` + "으로 신청하시겠습니까?")) {
      fetchUtils.post("/board/apply", param).then((res) => {
        if (!res.success) {
          alert(res.message);
        } else {
          alert(
            res.message + "\n 신청 현황은 마이페이지에서 확인 할 수 있습니다.",
          );
        }
      });
    }
  };
  return (
    <>
      <input
        type="text"
        placeholder="공대장에게 자신을 어필해보세요."
        style={{ width: "210px", height: "35px" }}
        onChange={(e) => setMention(e.target.value)}
      />
      <SmallButton variant="contained" onClick={() => applyRaid()}>
        지원하기
      </SmallButton>
    </>
  );
};

export default ApplyRaid;
