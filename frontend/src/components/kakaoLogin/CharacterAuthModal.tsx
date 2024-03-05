import styled from "styled-components";
import { SmallButton } from "../common/Button";
import timelineAddr from "./helpImage/timelineAddr.svg";
import timelineIcon from "./helpImage/timelineIcon.svg";
import timelineInput from "./helpImage/timelineInput.svg";
import timelineLocation from "./helpImage/timelineLocation.svg";

interface IonClose {
  onClose(): void;
}

const AuthHelp = ({ onClose }: IonClose) => {
  return (
    <ModalWrapper>
      <div>
        캐릭터 인증
        <SmallButton onClick={onClose} style={{ float: "right" }}>
          x
        </SmallButton>
      </div>
      <div>1. 사용자님의 타임라인으로 이동합니다.</div>
      <img src={timelineLocation} />

      <div>2. 톱니바퀴 아이콘을 클릭하여 이동합니다.</div>
      <img src={timelineIcon} />
      <div>
        3. 랜덤으로 생성된 코드를 입력 또는 복사/붙혀넣기 후 변경을 클릭합니다.
      </div>
      <img src={timelineInput} />
      <div>
        4. timeline 입력란에 사용자님의 timeline주소 9자를 넣은 후 인증 버튼을
        클릭해주세요.
      </div>
      <img src={timelineAddr} />
    </ModalWrapper>
  );
};

export default AuthHelp;

const ModalWrapper = styled.div`
  position: fixed;
  top: 200px;
  left: 35%;
  width: 100%;
  height: 500px;
  max-width: 480px;
  z-index: 1;
  overflow: auto;
  background-color: var(--light);
  border: 2px solid #fbc02d;
  padding: 10px;
  color: black;
`;
