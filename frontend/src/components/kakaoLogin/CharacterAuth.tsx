import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import CharacterInput from "./CharacterInput";

const CharacterAuth = () => {
  const { state } = useLocation();
  const [user_id, setUserId] = useState("");
  const [nickName, setNickName] = useState("");

  const REST_API_KEY = import.meta.env.VITE_APP_REST_API_KEY;
  const REDIRECT_URI = import.meta.env.VITE_APP_LOGOUT_URL;
  const KAKAO_LOGOUT_URL = `https://kauth.kakao.com/oauth/logout?client_id=${REST_API_KEY}&logout_redirect_uri=${REDIRECT_URI}`;
  // const navigate = useNavigate();
  const getProfile = async () => {
    console.log(state);
    if (state !== null) {
      try {
        // Kakao SDK API를 이용해 사용자 정보 획득
        const data = await window.Kakao.API.request({
          url: "/v2/user/me",
        });
        // 사용자 정보 변수에 저장
        setUserId(data.id);
        setNickName(data.properties.nickname);
        console.log("123");
      } catch (err) {
        console.log(err);
      }
    } else {
      //navigate("/")
      alert("로그인이 필요한 페이지 입니다.");
      location.href = "http://localhost:5173/";
    }
  };

  useEffect(() => {
    getProfile();
  }, []);
  return (
    <div>
      <h2>{user_id}</h2>
      <h2>{nickName}</h2>

      <h1>
        <CharacterInput user_number={user_id} />
      </h1>
      {/* 임시 */}
      <Link to={KAKAO_LOGOUT_URL}>로그아웃 </Link>
    </div>
  );
};

export default CharacterAuth;
