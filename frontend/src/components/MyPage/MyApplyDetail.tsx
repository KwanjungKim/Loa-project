import { useCallback, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import useDetail, { IProps } from "../../hooks/useDetail";
import { useRecoilValue } from "recoil";
import { mainCharState } from "../../atoms/mainCharacter";
import fetchUtils from "../../utils/fetchUtils";
import { SmallButton } from "../common/Button";

const MyApplyDetail = () => {
  const { state } = useLocation();
  const userCharacterName = useRecoilValue(mainCharState);
  const [partyMember, setPartyMember] = useState([]);
  const [userName, setUserName] = useState<IProps>({
    character_name: userCharacterName.CharacterName,
  });
  const { userData } = useDetail(userName);

  const getPartyMember = useCallback(() => {
    const param = {
      board_number: state.board_number,
    };
    fetchUtils.post("/board/getPartyMember", param).then((res) => {
      if (!res.success) {
        alert(res.message);
      } else {
        setPartyMember(res.data.boardModel.member);
      }
    });
  }, [state.board_number]);

  const handleApplyCancle = () => {
    const param = {
      board_number: state.board_number,
      character_name: state.character_name,
    };
    fetchUtils.post("/board/cancelApplication", param).then((res) => {
      if (!res.message) {
        alert(res.message);
      } else {
        alert(res.message);
      }
    });
  };
  useEffect(() => {
    getPartyMember();
  }, [getPartyMember]);

  return (
    <>
      <div>
        no.{state.board_number} {"   "} {state.title}
        {"   "}
        작성자 : {state.raid_leader}
      </div>

      <div>
        {state.raid_type} | {state.raid_difficulty} |{state.proficiency} |{" "}
        {state.card_level} | {state.minGate} - {state.maxGate} 관문 |
      </div>

      <div>출발 시간 : {state.startDate}</div>
      <label>상세내용</label>
      <div>{state.content}</div>

      <div
        style={{
          width: "60%",
          height: "100px",
          flexWrap: "wrap",
        }}
      >
        {partyMember.map((value: any, i: number) => (
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
      <SmallButton
        style={{
          width: "100px",
          margin: "8px",
        }}
        variant="outlined"
        onClick={() => handleApplyCancle()}
      >
        신청 취소
      </SmallButton>
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
    </>
  );
};

export default MyApplyDetail;
