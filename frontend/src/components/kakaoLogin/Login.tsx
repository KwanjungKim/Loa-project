import { MediumButton } from "../common/Button";
import { IButtonProps } from "../common/Button";

const KakaoLogin = ({ children }: IButtonProps) => {
  const REDIRECT_URL = import.meta.env.VITE_APP_REDIRECT_URL;
  const loginKakao = () => {
    window.Kakao.Auth.authorize({
      redirectUri: REDIRECT_URL,
      scope: "profile_nickname",
    });
  };

  return (
    <>
      <MediumButton variant="contained" onClick={loginKakao}>
        {children}
      </MediumButton>
    </>
  );
};

export default KakaoLogin;
