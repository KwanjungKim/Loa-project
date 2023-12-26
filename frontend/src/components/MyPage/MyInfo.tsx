import { IProfileData } from "../../hooks/useProfile";
import { MediumButton } from "../common/Button";
import DeleteCharacter from "../kakaoLogin/DeleteCharacter";
import GetCharacterList from "../kakaoLogin/getCharacterList";

interface Iprops extends React.AllHTMLAttributes<HTMLDivElement> {
  profileData: IProfileData | null;
  setIsCharacterCheck: React.Dispatch<React.SetStateAction<boolean>>;
}

const MyInfo = ({ profileData, setIsCharacterCheck }: Iprops) => {
  return (
    <>
      <GetCharacterList profileData={profileData} />
      <MediumButton
        variant="contained"
        onClick={() => DeleteCharacter({ profileData, setIsCharacterCheck })}
      >
        계정 삭제
      </MediumButton>
    </>
  );
};

export default MyInfo;
