import { SmallButton } from "../common/Button";
import { IButtonProps } from "../common/Button";

const KakaoLogin = ({ children }: IButtonProps) => {
  const REDIRECT_URL = import.meta.env.VITE_APP_REDIRECT_URL;
  const loginKakao = () => {
    window.Kakao.Auth.authorize({
      redirectUri: REDIRECT_URL,
      prompt: "login",
      scope: "profile_nickname",
    });
  };

  return (
    <>
      <SmallButton variant="contained" onClick={loginKakao}>
        {children}
      </SmallButton>
    </>
  );
};

export default KakaoLogin;
