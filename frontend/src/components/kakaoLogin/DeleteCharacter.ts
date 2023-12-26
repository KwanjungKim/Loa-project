import { IProfileData } from "../../hooks/useProfile";
import fetchUtils from "../../utils/fetchUtils";

interface Iprops extends React.AllHTMLAttributes<HTMLDivElement> {
  profileData: IProfileData | null;
  setIsCharacterCheck: React.Dispatch<React.SetStateAction<boolean>>;
}
const DeleteCharacter = ({ profileData, setIsCharacterCheck }: Iprops) => {
  if (confirm("등록된 캐릭터를 삭제 하시겠습니까?")) {
    const paramMap = {
      user_number: profileData?.id.toString(),
    };

    fetchUtils.post("/user/delete", paramMap).then((res) => {
      alert(`${res.data.resultModel.message}`);
      setIsCharacterCheck(false);
    });
  }
};

export default DeleteCharacter;
