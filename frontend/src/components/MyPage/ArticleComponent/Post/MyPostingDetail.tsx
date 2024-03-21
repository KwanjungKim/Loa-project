import fetchUtils from "@/utils/fetchUtils";
import { useCallback, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import Button from "../../../buttons/Button";
import styled from "styled-components";
import CommonContents from "../../CommonContents";

import { IProps } from "@/hooks/useDetail";
import UserSpec from "../UserSpec copy";

const MyPostingDetail = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const [partyMember, setPartyMember] = useState<[]>([]);
  const [applyMember, setApplyMember] = useState([]);
  const [memberName, setMemberName] = useState<IProps>({
    character_name: state.character_name,
  });

  // 파티 신청 수락  (최대 인원 8명)------------------------------------------
  const handleAccept = (characterName: string) => {
    const param = {
      board_number: state.board_number,
      character_name: characterName,
    };

    if (partyMember.length >= 8) {
      alert("공대원이 가득 찼어요. (최대 8명)");
    }
    if (partyMember.length < 8) {
      if (confirm(`${characterName}` + "의 신청을 수락하시겠습니까?")) {
        fetchUtils.post("/board/acceptApplication", param).then((res) => {
          if (!res.success) {
            alert(res.message);
          } else {
            alert(res.message);
            navigate(0);
          }
        });
      }
    }
  };
  //-------------------------------------------------------------------------

  // 파티 신청 거절-----------------------------------------------------------
  const handleReject = (characterName: string) => {
    const param = {
      board_number: state.board_number,
      character_name: characterName,
    };
    if (confirm(`${characterName}` + "님을 거절하시겠습니까?")) {
      fetchUtils.post("/board/rejectApplication", param).then((res) => {
        if (!res.success) {
          alert(res.message);
        } else {
          alert(res.message);
          navigate(0);
        }
      });
    }
  };
  //--------------------------------------------------------------------------

  // 파티 멤버 및 신청자 리스트 ------------------------------------------------
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
    fetchUtils.post("/board/getAllApplicants", param).then((res) => {
      if (!res.success) {
        alert(res.message);
      } else {
        console.log(res);
        setApplyMember(res.data.boardModelList);
      }
    });
  }, [state.board_number]);
  //--------------------------------------------------------------------------

  useEffect(() => {
    getPartyMember();
  }, [getPartyMember]);

  return (
    <Wrapper>
      <CommonContents state={state} />
      <ApplyList>
        <p>신청자 리스트</p>
        {!applyMember[0] && (
          <p style={{ color: "grey", fontSize: "12px" }}>
            신청중인 유저가 없어요.
          </p>
        )}
        {Object.values(applyMember).map((value: any, i: number) => (
          <ApplyMemberDiv key={i}>
            <div style={{ display: "flex" }}>
              <div
                onClick={() =>
                  setMemberName({ character_name: `${value.character_name}` })
                }
                style={{ width: "200px", margin: "6px", display: "flex" }}
              >
                {value.character_name} : {value.mention}
              </div>
              <ButtonDIV>
                <Button onClick={() => handleAccept(value.character_name)}>
                  수락
                </Button>
                <Button onClick={() => handleReject(value.character_name)}>
                  거절
                </Button>
              </ButtonDIV>
            </div>
            <div>
              {memberName.character_name === value.character_name && (
                <UserSpec userName={memberName} />
              )}
            </div>
          </ApplyMemberDiv>
        ))}
      </ApplyList>
    </Wrapper>
  );
};

export default MyPostingDetail;

const ApplyMemberDiv = styled.div`
  display: flex;
  width: 360px;
  border: 2px solid grey;
  border-radius: 10px;
  margin-top: 2px;
  flex-direction: column;
  &:hover {
    border: 2px solid red;
  }
`;

const Wrapper = styled.div`
  width: 75%;
`;

const ButtonDIV = styled.div`
  width: 140px;
  display: flex;
  justifycontent: end;
`;

const ApplyList = styled.div`
  width: 410px;
  margin: 10px;
  padding: 20px;
  background-color: rgb(35, 35, 35);
  border-radius: 10px;
`;
