import useProfile from "../../hooks/useProfile";
import { MediumButton } from "../common/Button";
import DeleteCharacter from "../kakaoLogin/DeleteCharacter";
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
            onClick={() =>
              DeleteCharacter({ profileData, setIsCharacterCheck })
            }
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
