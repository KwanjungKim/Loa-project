import { useRecoilValue } from "recoil";
import useProfile from "../../hooks/useProfile";
import MyInfo from "./MyInfo";
import { characterState } from "../../atoms/login";
import CharacterAuth from "../kakaoLogin/CharacterAuth";
import { CircularProgress } from "@mui/material";

const MyPage = () => {
  const isCharacterState = useRecoilValue(characterState);
  const { profileData, isLoaded, setIsLoaded } = useProfile();

  return (
    <>
      {isLoaded && isCharacterState ? (
        <>
          <MyInfo />
        </>
      ) : isCharacterState ? (
        <div>
          <CharacterAuth profileData={profileData} setIsLoaded={setIsLoaded} />
        </div>
      ) : (
        <CircularProgress
          color="secondary"
          sx={{ width: "100%", height: "10px", marginTop: "100px" }}
        />
      )}
    </>
  );
};

export default MyPage;
