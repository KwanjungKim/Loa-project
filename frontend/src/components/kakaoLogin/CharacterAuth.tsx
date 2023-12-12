import useProfile from "../../hooks/useProfile";
import CharacterInput from "./CharacterInput";

const CharacterAuth = () => {
  const { profileData, isLoaded, isCharacterCheck } = useProfile();

  return (
    <>
      {isLoaded ? (
        isCharacterCheck ? (
          123
        ) : (
          <div>
            <CharacterInput profileData={profileData} />
          </div>
        )
      ) : (
        <h2>로딩중</h2>
      )}
    </>
  );
};

export default CharacterAuth;
