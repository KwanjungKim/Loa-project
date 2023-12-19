import useProfile from "../../hooks/useProfile";
import { MediumButton } from "../common/Button";
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
          <MediumButton
            variant="contained"
            onClick={() => DelProfile({ profileData, setIsCharacterCheck })}
          >
            계정 삭제
          </MediumButton>
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
