import { useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useSetRecoilState } from "recoil";
import { LoginState } from "../atoms/Login";
import fetchUtils from "../utils/fetchUtils";
import { MainCharState } from "../atoms/MainCharacter";

export interface IProfileData {
  id: string;
  properties: {
    nickname: string;
  };
}

const useProfile = () => {
  const [profileData, setProfileData] = useState<IProfileData | null>(null);
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const [isCharacterCheck, setIsCharacterCheck] = useState<boolean>(false);
  const navigate = useNavigate();
  const setIsLoggedIn = useSetRecoilState(LoginState);
  const setIsCharId = useSetRecoilState(MainCharState);
  const handleError = (str: string, callback?: () => void) => {
    alert(str);
    if (callback) {
      callback();
    }
  };

  const getProfile = useCallback(async () => {
    if (isLoaded) return;
    const accessToken = window.Kakao?.Auth?.getAccessToken();
    if (!accessToken) {
      handleError("로그인이 필요한 페이지입니다.", () => {
        navigate("/");
      });
      return;
    }
    try {
      // Kakao SDK API를 이용해 사용자 정보 획득
      const data = await window.Kakao.API.request({
        url: "/v2/user/me",
      });
      // 사용자 정보 변수에 저장
      setProfileData({
        id: data.id,
        properties: data.properties,
      });
      setIsLoggedIn(true);
      setIsLoaded(true);

      const paramMap = {
        user_number: data?.id.toString(),
      };
      fetchUtils.post("/user/login", paramMap).then((res) => {
        setIsCharId({
          user_number: res.data.userModel.user_number,
          character_name: res.data.userModel.character_name,
        });
        if (res.data.userModel.character_name != null) {
          setIsCharacterCheck(true);
        }
      });
    } catch (err) {
      handleError("프로필 정보를 불러오는데 실패했습니다.", () => {
        navigate("/");
      });
    }
  }, [isLoaded, navigate, setIsLoggedIn, setIsCharId]);

  useEffect(() => {
    getProfile();
  }, [getProfile]);

  return {
    profileData,
    isLoaded,
    isCharacterCheck,
    setIsLoaded,
    setIsCharacterCheck,
  };
};

export default useProfile;
