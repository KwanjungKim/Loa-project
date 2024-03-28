import { ChangeEvent, useCallback, useEffect, useMemo, useState } from "react";

// recoil
import { useRecoilState, useRecoilValue } from "recoil";
import { mainCharState } from "@atoms/mainCharacter";
import { characterState, loginState } from "@atoms/login";

// utils
import fetchUtils from "@utils/fetchUtils";

// libs
import { IChraracter } from "@libs/types";

// components
import MainCharacterSelectorView, {
  MainCharacterSelectorViewProps,
} from "./MainCharacterSelectorView";

const MainCharacterSelector = function MainCharacterSelector() {
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

  const handleChange = useCallback(
    (e: ChangeEvent<HTMLSelectElement>) => {
      setMainChar((prev) => ({
        ...prev,
        character_name: e.target.value,
      }));
    },
    [setMainChar],
  );

  const mainCharacterSelectorViewProps: MainCharacterSelectorViewProps =
    useMemo(
      () => ({
        mainCharacter: mainChar,
        characterList: charList,
        handleChange,
      }),
      [mainChar, charList, handleChange],
    );

  if (!hasCharacter || !isLoggedin) return null;

  return <MainCharacterSelectorView {...mainCharacterSelectorViewProps} />;
};

export default MainCharacterSelector;
