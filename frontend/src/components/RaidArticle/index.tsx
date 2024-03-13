import { useEffect, useState } from "react";
import fetchUtils from "../../utils/fetchUtils";
import ApplyRaid from "../RaidPost/applyRaid";
import { IparamMap } from "../RaidPost/RecruitmentPost";
import useDetail, { IProps } from "../../hooks/useDetail";
import { useRecoilValue } from "recoil";
import { mainCharState } from "../../atoms/mainCharacter";

interface Props {
  articleId: string;
}
interface ParamProps extends IparamMap {
  board_list: any;
  board_number: number;
  limit: number;
  member_count: number;
  offset: number;
  party_member: string;
  mention: string;
  maxGate: string;
  minGate: string;
}

export default function RaidArticle({ articleId }: Props) {
  const isMainChar = useRecoilValue(mainCharState);
  const defaultParamMap: ParamProps = {
    board_list: "",
    board_number: 75,
    card_level: "",
    character_name: "",
    content: "",
    limit: 0,
    maxGate: "",
    member: [],
    member_count: 0,
    mention: "",
    minGate: "1",
    offset: 0,
    party_member: "",
    proficiency: "클경",
    raid_difficulty: "extream",
    raid_leader: "",
    raid_type: "카멘",
    startDate: "2024-03-13 16:00:00",
    title: "테스트용",
    user_number: "3212642325",
  };
  const [data, setData] = useState<ParamProps>(defaultParamMap);
  const [userName, setUserName] = useState<IProps>({
    character_name: isMainChar.CharacterName,
  });
  const { userData } = useDetail(userName);

  const getArticle = async (id: string) => {
    await fetchUtils
      .post("/board/getArticle", {
        board_number: id,
      })
      .then((res) => {
        console.log(res);
        setData(res.data.boardModel);
        setUserName({
          character_name: res.data.boardModel.raid_leader,
        });
      });
  };
  useEffect(() => {
    getArticle(articleId);
  }, [articleId]);
  return (
    <>
      <div>
        no.{articleId} {"   "} {data.title}
        {"   "}
        작성자 : {data.raid_leader}
      </div>

      <div>
        {data.raid_type} | {data.raid_difficulty} |{data.proficiency} |{" "}
        {data.card_level} | {data.minGate} - {data.maxGate} 관문 |
      </div>
      <div>출발 시간 : {data.startDate}</div>
      <div>{data.content}</div>

      <div
        style={{
          width: "60%",
          height: "100px",
          flexWrap: "wrap",
        }}
      >
        {data.member.map((value, i) => (
          <div
            key={i}
            onClick={() => setUserName({ character_name: value })}
            style={{
              border: "1px solid #fbc02d",
              width: "25%",
              float: "left",
            }}
          >
            {value}
          </div>
        ))}
      </div>
      <br />

      <div>
        {userData.CharacterName} Lv.{userData.ItemMaxLevel}
      </div>
      <div>
        {Object.values(userData.CardEffects).map((value, i) => (
          <div key={i} style={{ color: "#fbc02d" }}>
            {value.Name}
          </div>
        ))}
        {Object.values(userData.ArmoryEngraving).map((value, i) => (
          <div style={{ fontSize: "15px", display: "block" }} key={i}>
            <img
              src={value.Icon}
              style={{ width: "25px", height: "25px", borderRadius: "50px" }}
            />{" "}
            {value.Name}
          </div>
        ))}
        {Object.values(userData.ArmoryGems).map((value, i) => (
          <div key={i} style={{ width: "25%" }}>
            <p dangerouslySetInnerHTML={{ __html: value.Name }} />
          </div>
        ))}
      </div>

      <div>
        {" "}
        <ApplyRaid articleId={articleId} />
      </div>
    </>
  );
}
