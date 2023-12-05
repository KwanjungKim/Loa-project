import { useEffect } from "react";
import axios from "axios";
import qs from "qs";
import { useNavigate } from "react-router-dom";

const Auth = () => {
  const REST_API_KEY = import.meta.env.VITE_APP_REST_API_KEY;
  const REDIRECT_URI = import.meta.env.VITE_APP_REDIRECT_URL;
  const CLIENT_SECRET = import.meta.env.VITE_APP_CLIENT_SECRET;
  // callback으로 받은 인가코드
  const code = new URL(window.location.href).searchParams.get("code");

  const navigate = useNavigate();
  useEffect(() => {
    const getToken = async () => {
      const payload = qs.stringify({
        grant_type: "authorization_code",
        client_id: REST_API_KEY,
        redirect_uri: REDIRECT_URI,
        code: code,
        client_secret: CLIENT_SECRET,
      });

      try {
        //access token 가져오기
        const res = await axios.post(
          "https://kauth.kakao.com/oauth/token",
          payload,
        );
        // access token 설정
        window.Kakao.Auth.setAccessToken(res.data.access_token);
        navigate("/character-auth");
      } catch (err) {
        console.log(err);
      }
    };
    getToken();
  }, [REST_API_KEY, REDIRECT_URI, CLIENT_SECRET, code, navigate]);

  return null;
};

export default Auth;
