import { useRecoilValue } from "recoil";
import fetchUtils from "../utils/fetchUtils";
import { mainCharState } from "../atoms/mainCharacter";
import { useState } from "react";
import { IparamMap } from "../components/kakaoLogin/RecruitmentPost";
export interface IgetRaid extends IparamMap {
  board_number: number;
  party_member: string;
}
const GetRaid = () => {
  const defaultParamMap: IgetRaid = {
    board_number: 1,
    party_member: "",
    title: "",
    content: "",
    user_number: "",
    character_name: "",
    raid_leader: "",
    raid_difficulty: "normal",
    raid_type: "발탄",
    proficiency: "트라이",
    minGate: 1,
    maxGate: 1,
    card_level: "조건 없음",
    startDate: "",
    member: [],
  };
  const isMainChar = useRecoilValue(mainCharState);
  const [raidDate, setRaidDate] = useState<IgetRaid>();

  const getRaidDate = () => {
    const param = {
      user_number: isMainChar.user_number,
    };
    fetchUtils.post("/board/getRaid", param).then((res) => {
      console.log(res.data.boardModel.board_list);
      setRaidDate(res.data.boardModel.board_list);
    });

  return (
    <>
      <button onClick={() => getRaidDate()}>123</button>;
      <button onClick={() => console.log(raidDate)}>1234</button>
      {raidDate &&
        raidDate.map((value: IgetRaid, id: number) => (
          <p key={id}>{value.board_number}</p>
        ))}
    </>
  );
};

export default GetRaid;
