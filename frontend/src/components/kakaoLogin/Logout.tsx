// const REST_API_KEY = import.meta.env.VITE_APP_REST_API_KEY;
// const LOGOUT_URL = import.meta.env.VITE_APP_LOGOUT_URL;
// const KAKAO_LOGOUT_URL = `https://kauth.kakao.com/oauth/logout?client_id=${REST_API_KEY}&logout_redirect_uri=${LOGOUT_URL}`;

import { useSetRecoilState } from "recoil";
import { LoginState } from "../../atoms/Login";
import { SmallButton } from "../common/Button";
import { useNavigate } from "react-router-dom";

const KakaoLogout = () => {
  const navigate = useNavigate();
  const setIsLoggedIn = useSetRecoilState(LoginState);
  const logout = () => {
    window.Kakao.Auth.logout();
    setIsLoggedIn(false);
    navigate("/");
  };
  return (
    <SmallButton variant="contained" onClick={() => logout()}>
      logout
    </SmallButton>
  );
};
export default KakaoLogout;
