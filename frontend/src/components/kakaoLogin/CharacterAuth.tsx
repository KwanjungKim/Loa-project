import useProfile from "../../hooks/useProfile";
import CharacterInput from "./CharacterInput";

const CharacterAuth = () => {
  // const load: boolean = false;
  const { profileData, isLoaded } = useProfile();

  return (
    <>
      {isLoaded ? (
        <div>
          {/* <h2>{profileData?.id}</h2> */}
          <h2>
            안녕하세요. {profileData?.properties.nickname}님. 캐릭터 인증이
            필요합니다.
          </h2>
          아래 코드를 로스트아크 타임라인에 게시 후 타입라인 주소를 기입하여
          인증 버튼을 눌러주세요.
          <CharacterInput profileData={profileData} />
        </div>
      ) : (
        <h2>로딩중</h2>
      )}
    </>
  );
};

export default CharacterAuth;
