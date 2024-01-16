import { SetterOrUpdater } from "recoil";
import { ICharProps } from "../atoms/MainCharacter";
import fetchUtils from "./fetchUtils";

const characterUtils = {
  update: (data: ICharProps) => {
    fetchUtils.post("/user/updateCharacters", data).then((res) => {
      alert(`${res.data.resultModel.message}`);
    });
  },

  delete: (data: ICharProps, setIsData: SetterOrUpdater<boolean>) => {
    if (confirm("등록된 캐릭터를 삭제 하시겠습니까?")) {
      const paramMap = {
        user_number: data.user_number,
      };

      fetchUtils.post("/user/delete", paramMap).then((res) => {
        setIsData(false);
        alert(`${res.data.resultModel.message}`);
      });
    }
  },
};

export default characterUtils;
