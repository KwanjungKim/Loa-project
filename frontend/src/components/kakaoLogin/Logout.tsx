import { useSetRecoilState } from "recoil";
import { LoginState } from "../../atoms/login";
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
