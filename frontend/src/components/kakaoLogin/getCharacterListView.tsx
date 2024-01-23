import { ICharProps } from "../../atoms/1234";
import React from "react";

export interface IGetCharacterViewProps
  extends React.AllHTMLAttributes<HTMLDivElement> {
  isCharacterState: boolean;
  isLoginState: boolean;
  charList: object;
  isMainChar: ICharProps;
  handleSelect: (e: any) => void;
}

const GetCharacterListView = ({
  isCharacterState,
  isLoginState,
  charList,
  isMainChar,
  handleSelect,
}: IGetCharacterViewProps) => {
  return (
    <>
      <select
        onChange={(e) => handleSelect(e.target.value)}
        value={isMainChar.character_name}
        style={{
          display: isCharacterState && isLoginState ? "block" : "none",
          height: "35px",
          borderRadius: "5px",
          border: "3px solid #fbc02d",
        }}
      >
        {Object.values(charList).map((value: any, i: any) => (
          <option key={i} value={value.character_name}>
            {value.serverName} {value.character_name}
            Lv.{value.itemMaxLevel} {value.characterClassName}
          </option>
        ))}
      </select>
    </>
  );
};

export default GetCharacterListView;
