import { useRecoilValue } from "recoil";
import fetchUtils from "../../utils/fetchUtils";
import { mainCharState } from "../../atoms/mainCharacter";
import { useEffect, useState } from "react";
import { IparamMap } from "../RaidPost/RecruitmentPost";
export interface IgetRaid extends IparamMap {
  board_number: number;
  party_member: string;
}
const GetRaid = () => {
  const isMainChar = useRecoilValue(mainCharState);
  const [raidDate, setRaidDate] = useState<any>();

  useEffect(() => {
    const param = {
      user_number: isMainChar.user_number,
    };
    fetchUtils.post("/board/getRaid", param).then((res) => {
      console.log(res.data.boardModel.board_list);
      setRaidDate(res.data.boardModel.board_list);
    });
  }, [isMainChar.user_number]);
  return (
    <>
      <button onClick={() => console.log(raidDate)}>1234</button>
      {raidDate &&
        raidDate.map((value: IgetRaid, id: number) => (
          <p key={id}>
            {value.character_name}-{value.raid_type}-{value.raid_difficulty}
          </p>
        ))}
    </>
  );
};

export default GetRaid;
