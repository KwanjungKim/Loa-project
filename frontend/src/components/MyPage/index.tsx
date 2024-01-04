import useProfile from "../../hooks/useProfile";
import CharacterInput from "../kakaoLogin/CharacterInput";
import MyInfo from "./MyInfo";

const MyPage = () => {
  const {
    profileData,
    isLoaded,
    setIsLoaded,
    isCharacterState,
    setIsCharAuth,
  } = useProfile();

  return (
    <>
      {isLoaded ? (
        isCharacterState ? (
          <>
            <MyInfo setIsCharAuth={setIsCharAuth} />
          </>
        ) : (
          <div>
            <CharacterInput
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
