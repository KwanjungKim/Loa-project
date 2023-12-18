import useProfile from "../../hooks/useProfile";
import DelProfile from "../kakaoLogin/CharacterDel";
import CharacterInput from "../kakaoLogin/CharacterInput";

const MyPage = () => {
  const {
    profileData,
    isLoaded,
    isCharacterCheck,
    setIsLoaded,
    setIsCharacterCheck,
  } = useProfile();

  return (
    <>
      {isLoaded ? (
        isCharacterCheck ? (
          <DelProfile
            profileData={profileData}
            setIsCharacterCheck={setIsCharacterCheck}
          />
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
