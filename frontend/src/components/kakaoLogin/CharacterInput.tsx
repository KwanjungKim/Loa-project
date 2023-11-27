import axios from "axios";
import { useState } from "react";

type postType = {
  user_number: string;
};
const auth_key = Math.random().toString(16).substring(2, 24);

const CharacterInput = ({ user_number }: postType) => {
  const [timeline_addr, setTimeLineAddr] = useState("");
  console.log(typeof user_number);
  return (
    <>
      1문자열 {auth_key}
      <input
        placeholder="timeline"
        onChange={(event) => {
          setTimeLineAddr(event.target.value);
        }}
      />
      <input
        type="submit"
        value="인증"
        onClick={() => {
          const paramMap = {
            user_number,
            auth_key,
            timeline_addr,
          };
          console.log(paramMap);
          axios.post("http://localhost:8080/Member/join", {
            headers: {
              // headers: API 응답에 대한 정보를 담음
              "content-type": "application/json",
            },
            body: JSON.stringify(paramMap), //userData라는 객체를 보냄
          });
        }}
      />
    </>
  );
};

export default CharacterInput;
