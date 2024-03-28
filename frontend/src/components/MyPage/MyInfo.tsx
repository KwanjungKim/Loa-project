import { MediumButton } from "../common/Button";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { mainCharState } from "../../atoms/mainCharacter";
import characterUtils from "../../utils/characterUtils";
import CharacterDetailData from "../kakaoLogin/CharacterDetailData";
import { characterState } from "../../atoms/login";

import { useNavigate } from "react-router-dom";
import GetRaid from "./ArticleComponent/Apply/ApplyingRaid";
import GetPostingRaid from "./ArticleComponent/Post/PostingRaid";
// import TestAtomData from "../kakaoLogin/characterDataInAtom";

const MyInfo = () => {
  const mainCharacterName = useRecoilValue(mainCharState);
  const setIsCharAuth = useSetRecoilState(characterState);
  const navigate = useNavigate();

  return (
    <>
      <GetPostingRaid />
      <GetRaid />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <MediumButton variant="contained" onClick={() => navigate("posting")}>
        글 작성{" "}
      </MediumButton>
      <MediumButton
        variant="contained"
        onClick={() => {
          characterUtils.update(mainCharacterName);
        }}
      >
        갱신하기
      </MediumButton>

      <MediumButton
        variant="contained"
        onClick={() => characterUtils.delete(mainCharacterName, setIsCharAuth)}
      >
        계정 삭제
      </MediumButton>
      <div>
        <CharacterDetailData />
      </div>
    </>
  );
};

export default MyInfo;
