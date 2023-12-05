import axios from "axios";
import { useState } from "react";
import { IProfileData } from "../../hooks/useProfile";
import ContentCopyRoundedIcon from "@mui/icons-material/ContentCopyRounded";
import HelpOutlineRoundedIcon from "@mui/icons-material/HelpOutlineRounded";
import { SmallButton } from "../common/Button";
import IconWrapper from "../common/Wrapper/IconWrapper";
import AuthHelp from "./CharacterAuthHelp";
import styled from "styled-components";

const auth_key = Math.random().toString(16).substring(2, 24);

const CharacterInput = ({
  profileData,
}: {
  profileData: IProfileData | null;
}) => {
  const [timeline_addr, setTimeLineAddr] = useState<string>("");
  const [isHelpHover, setIsHelpHover] = useState<boolean>(false);
  const [isCopyHover, setIsCopyHover] = useState<boolean>(false);
  const handleCopyClipBoard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
    } catch (err) {
      console.log(err);
      alert("다시 시도해주세요");
    }
  };

  const handleAuth = () => {
    const paramMap = {
      user_number: profileData?.id,
      auth_key,
      timeline_addr,
    };
    console.log(paramMap);
    axios.post("http://localhost:8080/Member/join", {
      headers: {
        // headers: API 응답에 대한 정보를 담음
        "content-type": "application/json",
      },
      body: JSON.stringify(paramMap), //userData라는 객체를 보냄
      timeout: 5000,
    });
  };
  return (
    <>
      <div>
        캐릭터 인증{" "}
        <HelpOutlineRoundedIcon
          onMouseOver={() => setIsHelpHover(true)}
          onMouseOut={() => setIsHelpHover(false)}
          sx={{
            fontSize: "18px",
          }}
        />
        <HoverDiv>{isHelpHover ? <AuthHelp /> : ""}</HoverDiv>
      </div>
      <p>안녕하세요. {profileData?.properties.nickname}님. </p>
      <p>캐릭터 인증이 필요합니다. </p>
      아래 코드를 로스트아크 타임라인에 게시 후 타입라인 주소를 기입하여 인증
      버튼을 눌러주세요.
      <p>
        코드 {auth_key}
        <IconWrapper
          // size={20}
          style={{
            display: "inline",
            width: "25px",
            height: "20px",
            verticalAlign: "-4px",
            borderRadius: "20%",
          }}
        >
          <ContentCopyRoundedIcon
            onMouseOver={() => setIsCopyHover(true)}
            onMouseOut={() => setIsCopyHover(false)}
            onClick={() => handleCopyClipBoard(auth_key)}
            focusable="false"
            aria-hidden="false"
            sx={{
              fontSize: "18px",
            }}
          />{" "}
          <HoverDiv
            style={{
              fontSize: "10px",
            }}
          >
            {isCopyHover ? "복사" : ""}
          </HoverDiv>
        </IconWrapper>
      </p>
      <input
        placeholder="timeline"
        onChange={(e) => {
          setTimeLineAddr(e.target.value);
        }}
      />
      <SmallButton
        type="submit"
        variant="contained"
        onClick={() => handleAuth()}
      >
        인증
      </SmallButton>
    </>
  );
};

export default CharacterInput;

const HoverDiv = styled.div`
  display: inline;
  position: absolute;
  background-color: black;
  color: white;
`;
