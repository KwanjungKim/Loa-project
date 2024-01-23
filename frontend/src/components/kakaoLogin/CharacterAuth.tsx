import { useState } from "react";
import { IProfileData } from "../../hooks/useProfile";
import fetchUtils from "../../utils/fetchUtils";
import { useSetRecoilState } from "recoil";
import { mainCharState } from "../../atoms/mainCharacter";
import CharacterAuthView, {
  ICharacterListViewProps,
} from "./CharacterAuthView";

const auth_key = Math.random().toString(16).substring(2, 24);
interface Iprops extends React.AllHTMLAttributes<HTMLDivElement> {
  profileData: IProfileData | null;
  setIsLoaded: React.Dispatch<React.SetStateAction<boolean>>;
}
const CharacterAuth = ({ profileData, setIsLoaded }: Iprops) => {
  const [timeline_addr, setTimeLineAddr] = useState<string>("");
  const setIsMainCharacter = useSetRecoilState(mainCharState);
  const handleAuth = () => {
    const paramMap = {
      user_number: profileData?.id.toString(),
      auth_key: auth_key,
      memberNo: timeline_addr,
    };

    fetchUtils.post("/user/join", paramMap).then((res) => {
      console.log(res);
      alert(`${res.data.resultModel.message}`);
      setIsMainCharacter((prev) => {
        return {
          ...prev,
          user_number: profileData?.id,
          character_name: res.data.userModel.character_name,
        };
      });
      setIsLoaded(false);
    });
  };

  const handleCopyClipBoard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
    } catch (err) {
      console.log(err);
      alert("다시 시도해주세요");
    }
  };

  const characterAuthViewProps: ICharacterListViewProps = {
    auth_key,
    profileData,
    setTimeLineAddr,
    handleAuth,
    handleCopyClipBoard,
  };
  return <CharacterAuthView {...characterAuthViewProps} />;
};

export default CharacterAuth;
