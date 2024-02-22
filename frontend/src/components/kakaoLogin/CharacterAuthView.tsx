import IconWrapper from "../common/Wrapper/IconWrapper";
import ContentCopyRoundedIcon from "@mui/icons-material/ContentCopyRounded";
import ModalPortal from "./Modal";
import { SmallButton } from "../common/Button";
import { IProfileData } from "../../hooks/useProfile";

export interface ICharacterListViewProps
  extends React.AllHTMLAttributes<HTMLDivElement> {
  auth_key: string;
  profileData: IProfileData | null;
  setTimeLineAddr: React.Dispatch<React.SetStateAction<string>>;
  handleAuth: () => void;
  handleCopyClipBoard: (text: string) => void;
}

const CharacterAuthView = ({
  auth_key,
  profileData,
  setTimeLineAddr,
  handleAuth,
  handleCopyClipBoard,
}: ICharacterListViewProps) => {
  return (
    <>
      <div>
        캐릭터 인증 <ModalPortal />
      </div>
      <p>안녕하세요. {profileData?.properties.nickname}님. </p>
      <p>서비스 이용을 위해서는 캐릭터 인증이 필요합니다. </p>
      아래 코드를 로스트아크 타임라인에 게시 후 타입라인 주소를 기입하여 인증
      버튼을 눌러주세요.
      <p>
        코드 : {auth_key}
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
          {/* 클립보드  */}
          <ContentCopyRoundedIcon
            onClick={() => handleCopyClipBoard(auth_key)}
            focusable="false"
            aria-hidden="false"
            sx={{
              fontSize: "18px",
            }}
          />
        </IconWrapper>
      </p>
      <input
        placeholder="timeline"
        onChange={(e) => {
          setTimeLineAddr(e.target.value);
        }}
      />{" "}
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

export default CharacterAuthView;
