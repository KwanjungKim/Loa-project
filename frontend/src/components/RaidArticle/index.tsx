import { useEffect, useState } from "react";
import fetchUtils from "../../utils/fetchUtils";
import ApplyRaid from "../RaidPost/applyRaid";
import { IparamMap } from "../RaidPost/RecruitmentPost";
import styled from "styled-components";
import CommonContents from "../MyPage/CommonContents";

interface Props {
  articleId: string;
}
export interface IParamProps extends IparamMap {
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
  const defaultParamMap: IParamProps = {
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
  const [data, setData] = useState<IParamProps>(defaultParamMap);

  const getArticle = async (id: string) => {
    await fetchUtils
      .post("/board/getArticle", {
        board_number: id,
      })
      .then((res) => {
        console.log(res);
        setData(res.data.boardModel);
      });
  };
  useEffect(() => {
    getArticle(articleId);
  }, [articleId]);
  return (
    <>
      <Wrapper>
        <CommonContents state={data} />
      </Wrapper>
      <div>
        <ApplyRaid articleId={articleId} />
      </div>
    </>
  );
}

const Wrapper = styled.div`
  width: 75%;
`;
