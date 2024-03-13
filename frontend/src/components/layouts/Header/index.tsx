import React from "react";

// recoil
import { useRecoilValue } from "recoil";
import { loginState } from "../../../atoms/login";

// components
import IconButton from "../buttons/IconButton";
import BurgerSvg from "../../svgs/BurgerSvg";
import GetCharacterList from "../../kakaoLogin/getCharacterList";
import Button from "../buttons/Button";

interface Props extends React.AllHTMLAttributes<HTMLDivElement> {}

export default function Header({ ...props }: Props) {
  const isLoggedin = useRecoilValue(loginState);
  return (
    <header style={{ height: "57px" }} {...props}>
      <div>
        <div>
          <IconButton>
            <BurgerSvg />
          </IconButton>
        </div>
        <h1>logo</h1>
      </div>
      <div>
        <GetCharacterList />
      </div>
      <div>
        {isLoggedin ? (
          <Button.Brand>로그아웃</Button.Brand>
        ) : (
          <Button.Brand>로그인</Button.Brand>
        )}
      </div>
    </header>
  );
}
