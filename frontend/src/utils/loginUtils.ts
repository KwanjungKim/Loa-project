const REDIRECT_URL = import.meta.env.VITE_APP_REDIRECT_URL;
const loginUtils = {
  loginKakao: () => {
    window.Kakao.Auth.authorize({
      redirectUri: REDIRECT_URL,
      prompt: "login",
      scope: "profile_nickname",
    });
  },
  logoutKakao: () => window.Kakao.Auth.logout(),
};

export default loginUtils;
