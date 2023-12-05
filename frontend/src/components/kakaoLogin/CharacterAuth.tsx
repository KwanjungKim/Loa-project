import useProfile from "../../hooks/useProfile";
import CharacterInput from "./CharacterInput";

const CharacterAuth = () => {
  const { profileData, isLoaded } = useProfile();

  return (
    <>
      {isLoaded ? (
        <div>
          <CharacterInput profileData={profileData} />
        </div>
      ) : (
        <h2>로딩중</h2>
      )}
    </>
  );
};

export default CharacterAuth;
