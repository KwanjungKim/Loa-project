import useProfile from "../../hooks/useProfile";
import CharacterInput from "../kakaoLogin/CharacterInput";

const MyPage = () => {
  const { profileData, isLoaded, isCharacterCheck, setIsLoaded } = useProfile();

  console.log("1", isCharacterCheck);
  return (
    <>
      {isLoaded ? (
        isCharacterCheck ? (
          123
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
