import axios from "axios";
import { IProfileData } from "../../hooks/useProfile";
import { MediumButton } from "../common/Button";

interface Iprops extends React.AllHTMLAttributes<HTMLDivElement> {
  profileData: IProfileData | null;
  setIsCharacterCheck: React.Dispatch<React.SetStateAction<boolean>>;
}
const DelProfile = ({ profileData, setIsCharacterCheck }: Iprops) => {
  const DelUser = () => {
    if (confirm("등록된 캐릭터를 삭제 하시겠습니까?")) {
      const paramMap = {
        user_number: profileData?.id.toString(),
      };
      axios
        .post("/api/deleteUser", paramMap, {
          headers: {
            // headers: API 응답에 대한 정보를 담음
            "content-type": "application/json",
            "Access-Control-Allow-Origin": "*",
          },
          timeout: 5000,
        })
        .then((response) => {
          console.log("!", { response });
          setIsCharacterCheck(false);
        });
    }
  };
  return (
    <>
      <MediumButton variant="contained" onClick={() => DelUser()}>
        계정 삭제
      </MediumButton>
    </>
  );
};

export default DelProfile;
