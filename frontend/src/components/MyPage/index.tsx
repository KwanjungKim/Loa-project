import { useRecoilValue } from "recoil";
import useProfile from "../../hooks/useProfile";
import MyInfo from "./MyInfo";
import { characterState } from "../../atoms/123";
import CharacterAuth from "../kakaoLogin/CharacterAuth";

const MyPage = () => {
  const isCharacterState = useRecoilValue(characterState);
  const { profileData, isLoaded, setIsLoaded } = useProfile();

  return (
    <>
      {isLoaded ? (
        isCharacterState ? (
          <>
            <MyInfo />
          </>
        ) : (
          <div>
            <CharacterAuth
              profileData={profileData}
              setIsLoaded={setIsLoaded}
            />
          </div>
        )
      ) : (
        <h2>로딩중</h2>
      )}
    </>
  );
};

export default MyPage;
