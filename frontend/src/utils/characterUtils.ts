import { SetterOrUpdater } from "recoil";
import { ICharProps } from "../atoms/1234";
import fetchUtils from "./fetchUtils";

const characterUtils = {
  update: (data: ICharProps) => {
    const paramMap = {
      user_number: data.user_number,
      character_name: data.character_name,
    };
    fetchUtils.post("/user/updateCharacters", paramMap).then((res) => {
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
