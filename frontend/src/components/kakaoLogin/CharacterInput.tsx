import axios from "axios";
import { useState } from "react";
import { IProfileData } from "../../hooks/useProfile";
import ContentCopyRoundedIcon from "@mui/icons-material/ContentCopyRounded";
import { SmallButton } from "../common/Button";

const auth_key = Math.random().toString(16).substring(2, 24);

const CharacterInput = ({
  profileData,
}: {
  profileData: IProfileData | null;
}) => {
  const [timeline_addr, setTimeLineAddr] = useState<string>("");
  const [isHover, setIsHover] = useState<boolean>(false);
  const [isCopy, setIsCopy] = useState<string>("");
  const handleCopyClipBoard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setIsCopy("복사 완료");
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <>
      <h2>
        코드 {auth_key}
        <ContentCopyRoundedIcon
          onMouseOver={() => setIsHover(true)}
          onMouseOut={() => setIsHover(false)}
          onClick={() => handleCopyClipBoard(auth_key)}
          focusable="false"
          aria-hidden="true"
          sx={{
            fontSize: "18px",
          }}
        />
        {isHover ? (isCopy ? isCopy : "복사") : ""}
      </h2>
      <input
        placeholder="timeline"
        onChange={(event) => {
          setTimeLineAddr(event.target.value);
        }}
      />
      <SmallButton
        type="submit"
        variant="contained"
        onClick={() => {
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
        }}
      >
        인증
      </SmallButton>
    </>
  );
};

export default CharacterInput;
