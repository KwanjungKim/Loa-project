import { SetterOrUpdater } from "recoil";
import fetchUtils from "../../utils/fetchUtils";
import { ICharProps } from "../../atoms/MainCharacter";

interface Iprops extends React.AllHTMLAttributes<HTMLDivElement> {
  MainCharacterName: ICharProps;
  setIsCharAuth: SetterOrUpdater<boolean>;
}
const DeleteCharacter = ({ MainCharacterName, setIsCharAuth }: Iprops) => {
  if (confirm("등록된 캐릭터를 삭제 하시겠습니까?")) {
    const paramMap = {
      user_number: MainCharacterName.user_number,
    };

    fetchUtils.post("/user/delete", paramMap).then((res) => {
      setIsCharAuth(false);
      alert(`${res.data.resultModel.message}`);
    });
  }
};

export default DeleteCharacter;
