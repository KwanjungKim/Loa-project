import { useNavigate } from "react-router-dom";
import { SmallButton } from "../common/Button";
import KakaoLogin from "../kakaoLogin/Login";

const Home = () => {
  const navigate = useNavigate();
  return (
    <div>
      <h2>home</h2>
      <SmallButton variant="outlined" onClick={() => navigate("/test")}>
        테스트
      </SmallButton>

      <KakaoLogin>카카오로그인</KakaoLogin>
    </div>
  );
};

export default Home;
