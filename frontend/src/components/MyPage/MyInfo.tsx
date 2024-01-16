import { MediumButton } from "../common/Button";
import { SetterOrUpdater, useRecoilValue } from "recoil";
import { MainCharState } from "../../atoms/MainCharacter";
import characterUtils from "../../utils/characterUtils";
import CharacterDetailData from "../kakaoLogin/CharacterDetailData";
// import TestAtomData from "../kakaoLogin/characterDataInAtom";

export interface Iprops extends React.AllHTMLAttributes<HTMLDivElement> {
  setIsCharAuth: SetterOrUpdater<boolean>;
}

const MyInfo = ({ setIsCharAuth }: Iprops) => {
  const MainCharacterName = useRecoilValue(MainCharState);

  return (
    <>
      <MediumButton
        variant="contained"
        onClick={() => {
          characterUtils.update(MainCharacterName);
        }}
      >
        갱신하기
      </MediumButton>

      <MediumButton
        variant="contained"
        onClick={() => characterUtils.delete(MainCharacterName, setIsCharAuth)}
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
