import React from "react";
import styled from "styled-components";
import { SmallButton } from "../common/Button";

interface IonClose {
  onClose(): void;
}

const AuthHelp = ({ onClose }: IonClose) => {
  return (
    <ModalWrapper>
      <div>
        인증 절차
        <SmallButton onClick={onClose} style={{ float: "right" }}>
          x
        </SmallButton>
      </div>
      <div>1. 복사 아이콘을 클릭하여 복사합니다.</div>
      <div>2. 로스크아크 자기 소개글에 복사한 코드를 붙혀넣기를 합니다.</div>
      <div>
        3. 타임라인 주소 전체를 복사하여 아래 입력란에 붙혀넣기 한후에 인증
        버튼을 클릭합니다.
      </div>
    </ModalWrapper>
  );
};

export default AuthHelp;

const ModalWrapper = styled.div`
  position: fixed;
  top: 200px;
  left: 35%;
  width: 100%;
  height: 200px;
  max-width: 480px;
  z-index: 1;
  overflow: auto;
  background-color: var(--light);
  border: 2px solid #fbc02d;
  padding: 10px;
  color: black;
`;
