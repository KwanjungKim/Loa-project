import { MediumButton } from "../common/Button";
import { SetterOrUpdater, useRecoilValue } from "recoil";
import { MainCharState } from "../../atoms/MainCharacter";
import characterUtils from "../../utils/characterUtils";
import TestAtomData from "../kakaoLogin/characterDataInAtom";
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
          // UpdateChar(MainCharacterName);
        }}
      >
        갱신하기
      </MediumButton>

      <MediumButton
        variant="contained"
        // onClick={() => DeleteCharacter({ MainCharacterName, setIsCharAuth })}
        onClick={() => characterUtils.delete(MainCharacterName, setIsCharAuth)}
      >
        계정 삭제
      </MediumButton>
      <div>
        <TestAtomData />
      </div>
    </>
  );
};

export default MyInfo;
