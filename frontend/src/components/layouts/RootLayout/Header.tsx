import { useNavigate } from "react-router-dom";

// utils
import loginUtils from "../../../utils/loginUtils";

// components
import { SmallButton } from "../../common/Button";
import HeaderView from "./HeaderView";

const Header = () => {
  const navigate = useNavigate();
  const isLoggedin = loginUtils.isLoggedin();
  return (
    <HeaderView>
      <HeaderView.Logo onClick={() => navigate("/")}>LOGO</HeaderView.Logo>
      <HeaderView.Links>
        {isLoggedin ? (
          <SmallButton
            variant="contained"
            onClick={() => console.log("logout")}
          >
            로그아웃
          </SmallButton>
        ) : (
          <SmallButton variant="contained" onClick={() => navigate("/login")}>
            로그인
          </SmallButton>
        )}
      </HeaderView.Links>
    </HeaderView>
  );
};

export default Header;
