import { useLocation, useNavigate } from "react-router-dom";
import fetchUtils from "../../../../utils/fetchUtils";
import { SmallButton } from "../../../common/Button";
import CommonContents from "../../CommonContents";
import styled from "styled-components";

const MyApplyDetail = () => {
  const { state } = useLocation(); // 이전 페이지에서 전달 받은 데이터
  const navigate = useNavigate();

  // 신청 취소 --------------------------------------------------------
  const handleApplyCancle = () => {
    const param = {
      board_number: state.board_number,
      character_name: state.character_name,
    };
    if (confirm(`${state.character_name}` + "의 신청을 취소 하시겠습니까?")) {
      fetchUtils.post("/board/cancelApplication", param).then((res) => {
        if (!res.message) {
          alert(res.message);
        } else {
          alert(res.message);
          navigate(-1);
        }
      });
    }
  };
  //------------------------------------------------------------------

  return (
    <Wrapper>
      <CommonContents state={state} />

      {/* 신청 취소 버튼 */}
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
    </Wrapper>
  );
};

export default MyApplyDetail;

const Wrapper = styled.div`
  width: 75%;
`;
