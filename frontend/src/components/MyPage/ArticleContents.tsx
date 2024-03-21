import dayjs from "dayjs";
import styled from "styled-components";
import { IParamProps } from "../RaidArticle";

const ArticleContents = (props: { state: IParamProps }) => {
  const datePickerFormat = "YYYY년 MM월 DD일 A HH시 mm분";
  const formattedDate = dayjs(props.state.startDate).format(datePickerFormat);
  return (
    <Wrapper>
      {/* <TitleDIV>
        <BoardNo>no.{state.board_number} </BoardNo>
        <Title>{state.title}</Title>
        <Writer> 작성자 : {state.raid_leader}</Writer>
      </TitleDIV> */}
      <Condition>
        <li>레이드 명 : {props.state.raid_type} </li>
        <li>난이도 : {props.state.raid_difficulty}</li>
        <li>숙련도 : {props.state.proficiency}</li>
        <li>
          관문 : {props.state.minGate} - {props.state.maxGate} 관문
        </li>
        <li> 카드 : {props.state.card_level}</li>
        <li> 출발 시간 : {formattedDate}</li>
      </Condition>
      <br />
      <label>[상세내용]</label>
      <ContentDIV>{props.state.content}</ContentDIV>
    </Wrapper>
  );
};

export default ArticleContents;

const Wrapper = styled.div`
  padding: 20px;
  background-color: rgb(35, 35, 35);
  border-radius: 20px;
`;

const Condition = styled.div`
  padding: 10px;
`;
const ContentDIV = styled.div`
  width: 100%;
  height: auto;
  max-height: 300px;
  white-space: pre-line;

  overflow: auto;
`;
