import axios from "axios";
import { IProfileData } from "../../hooks/useProfile";

export const HandleCopyClipBoard = async (text: string) => {
  try {
    await navigator.clipboard.writeText(text);
  } catch (err) {
    console.log(err);
    alert("다시 시도해주세요");
  }
};

export const auth_key = Math.random().toString(16).substring(2, 24);

export const HandleAuth = (
  profileData: IProfileData | null,
  timeline_addr: string,
) => {
  const paramMap = {
    user_number: profileData?.id.toString(),
    auth_key: auth_key,
    memberNo: timeline_addr,
  };
  console.log(paramMap);
  axios
    .post("/api/addUser2", paramMap, {
      headers: {
        // headers: API 응답에 대한 정보를 담음
        "content-type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      timeout: 5000,
    })
    .then((response) => {
      console.log({ response });
    });
};

export const CharacterCheck = (profileData: IProfileData | null) => {
  const paramMap = {
    user_number: profileData?.id.toString(),
  };
  axios
    .post("/api/login", paramMap, {
      headers: {
        "Content-Type": "application/json",
      },
      timeout: 5000,
    })
    .then((response: any) => {
      console.log(response);
    });
};
