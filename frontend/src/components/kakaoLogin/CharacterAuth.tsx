import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const CharacterAuth = () => {
  const [user_id, setUserId] = useState();
  const [nickName, setNickName] = useState("");
  const [profileImage, setProfileImage] = useState("");
  const REST_API_KEY = import.meta.env.VITE_APP_REST_API_KEY;
  const REDIRECT_URI = import.meta.env.VITE_APP_LOGOUT_URL;
  const KAKAO_LOGOUT_URL = `https://kauth.kakao.com/oauth/logout?client_id=${REST_API_KEY}&logout_redirect_uri=${REDIRECT_URI}`;

  const getProfile = async () => {
    try {
      // Kakao SDK API를 이용해 사용자 정보 획득
      const data = await window.Kakao.API.request({
        url: "/v2/user/me",
      });
      // 사용자 정보 변수에 저장
      setUserId(data.id);
      setNickName(data.properties.nickname);
      setProfileImage(data.properties.profile_image);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getProfile();
  }, []);
  return (
    <div>
      <h2>{user_id}</h2>
      <h2>{nickName}</h2>
      <img src={profileImage}></img>

      {/* 임시 */}
      <Link to={KAKAO_LOGOUT_URL}>로그아웃 </Link>
    </div>
  );
};

export default CharacterAuth;
