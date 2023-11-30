import useProfile from "../../hooks/useProfile";
import CharacterInput from "./CharacterInput";

const CharacterAuth = () => {
  // const load: boolean = false;
  const { profileData, isLoaded } = useProfile();

  return (
    <>
      {isLoaded ? (
        <div>
          <h2>{profileData?.id}</h2>
          <h2>{profileData?.properties.nickname}</h2>

          <h1>
            <CharacterInput profileData={profileData} />
          </h1>
        </div>
      ) : (
        <h1>로딩중</h1>
      )}
    </>
  );
};

export default CharacterAuth;
