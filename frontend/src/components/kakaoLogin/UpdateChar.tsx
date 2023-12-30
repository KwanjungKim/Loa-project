import { IProfileData } from "../../hooks/useProfile";
import fetchUtils from "../../utils/fetchUtils";

interface Iprops extends React.AllHTMLAttributes<HTMLDivElement> {
  profileData: IProfileData | null;
}
const UpdateChar = ({ profileData }: Iprops) => {
  const paramMap = {
    user_number: profileData?.id.toString(),
    character_name: "성인범",
  };
  fetchUtils.post("/user/updateCharacters", paramMap).then(() => {
    alert("갱신되었습니다.");
    // if (res.data.resultModel.status === "success") {
    //   alert("업데이트 되었습니다.");
    // }
  });
};

export default UpdateChar;
