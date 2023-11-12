import { useNavigate } from "react-router-dom";
import { SmallButton } from "../common/Button";

const Home = () => {
  const navigate = useNavigate();
  return (
    <div>
      <h2>home</h2>
      <SmallButton variant="outlined" onClick={() => navigate("/test")}>
        테스트
      </SmallButton>
    </div>
  );
};

export default Home;
