import { ChangeEvent, useId } from "react";

// recoil
import { ICharProps } from "@atoms/mainCharacter";

// styles
import styles from "./MainCharacterSelectorView.module.scss";

// libs
import { IChraracter } from "@libs/types";

// components
import GamingSvg from "@components/svgs/GamingSvg";

export interface MainCharacterSelectorViewProps {
  mainCharacter: ICharProps;
  handleChange: (e: ChangeEvent<HTMLSelectElement>) => void;
  characterList: IChraracter[];
}

export default function MainCharacterSelectorView({
  mainCharacter,
  characterList,
  handleChange,
}: MainCharacterSelectorViewProps) {
  const id = useId();
  return (
    <label
      title="활동 캐릭터를 선택하세요."
      className={styles.wrapper}
      htmlFor={id}
    >
      <GamingSvg aria-hidden />
      <p className={styles.text}>
        {mainCharacter.character_name} ({mainCharacter.ServerName})
      </p>
      <select
        id={id}
        name={id}
        className={styles.select}
        value={mainCharacter.character_name}
        onChange={handleChange}
      >
        {characterList.map((char) => (
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
}
