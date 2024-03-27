import { useCallback, useEffect, useId, useState } from "react";

// recoil
import { useRecoilState, useRecoilValue } from "recoil";
import { mainCharState } from "@atoms/mainCharacter";
import { characterState, loginState } from "@atoms/login";

// utils
import fetchUtils from "@utils/fetchUtils";

// libs
import { IChraracter } from "@libs/types";

// components
import GamingSvg from "@/components/svgs/GamingSvg";

const MainCharacterSelector = function MainCharacterSelector() {
  const id = useId();
  const [charList, setCharList] = useState<IChraracter[]>([]);
  const [mainChar, setMainChar] = useRecoilState(mainCharState);
  const isLoggedin = useRecoilValue(loginState);
  const hasCharacter = useRecoilValue(characterState);
  const getCharacterList = useCallback(async () => {
    const user_number = mainChar.user_number;
    if (typeof user_number !== "string" || user_number.length < 1) return;
    if (!hasCharacter) return;
    const { data, success, message } = await fetchUtils.post(
      "/user/getAllCharacters",
      { user_number },
    );
    if (success) {
      setCharList(data.characterModelList);
    } else {
      alert(message);
    }
  }, [mainChar, hasCharacter]);

  useEffect(() => {
    getCharacterList();
  }, [getCharacterList]);

  if (!hasCharacter || !isLoggedin) return null;

  return (
    <label
      title="활동 캐릭터를 선택하세요."
      style={{
        position: "relative",
        padding: "0 8px",
        width: "100%",
        height: "40px",
        display: "flex",
        alignItems: "center",
        gap: "8px",
        borderRadius: "999px",
        border: "1px solid rgba(var(--divider), 1)",
      }}
      htmlFor={id}
    >
      <GamingSvg aria-hidden />
      <p
        style={{
          width: "100%",
          overflow: "hidden",
          whiteSpace: "nowrap",
          textOverflow: "ellipsis",
          fontSize: "12px",
          color: "rgba(var(--font), 1)",
        }}
      >
        {mainChar.character_name} ({mainChar.ServerName})
      </p>
      <select
        id={id}
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          top: 0,
          bottom: 0,
          opacity: 0,
          zIndex: 1,
          border: "none",
          color: "rgba(var(--font), 1)",
          textOverflow: "ellipsis",
          cursor: "pointer",
        }}
        value={mainChar.character_name}
        onChange={(e) => {
          setMainChar((prev) => ({
            ...prev,
            character_name: e.target.value,
          }));
        }}
      >
        {charList.map((char) => (
          <option
            key={`${char.user_number}_${char.character_name}`}
            value={char.character_name}
            title={`${char.serverName} ${char.character_name} Lv.${char.itemMaxLevel} 
          ${char.characterClassName}`}
          >
            {char.character_name} ({char.serverName}, Lv.{char.itemMaxLevel},{" "}
            {char.characterClassName})
          </option>
        ))}
      </select>
    </label>
  );
};

export default MainCharacterSelector;
