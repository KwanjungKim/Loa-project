import { IParamProps } from "../RaidArticle";
import ArticleContents from "./ArticleContents";
import PartyMember from "./ArticleComponent/PartyMember copy";
import { useState } from "react";
import { IProps } from "@/hooks/useDetail";
import { useRecoilValue } from "recoil";
import { mainCharState } from "@/atoms/mainCharacter";
import UserSpec from "./ArticleComponent/UserSpec copy";

import styles from "./Common.module.scss";

const CommonContents = (props: { state: IParamProps }) => {
  const userCharacterName = useRecoilValue(mainCharState);
  const [userName, setUserName] = useState<IProps>({
    character_name: userCharacterName.CharacterName,
  });
  return (
    <div className={`${styles.wrapper}`}>
      <div className={`${styles.title_wrapper}`}>
        <div className={`${styles.board_number}`}>
          no.{props.state.board_number}{" "}
        </div>
        <div className={`${styles.title}`}>{props.state.title}</div>
        <div className={`${styles.writer}`}>
          {" "}
          작성자 : {props.state.raid_leader}
        </div>
      </div>

      <div className={`${styles.content_wrapper}`}>
        <div>
          <div
            style={{
              padding: "20px",
              backgroundColor: "rgb(35, 35, 35)",
              borderRadius: " 20px",
              marginBottom: "10px",
            }}
          >
            <PartyMember
              board_number={props.state.board_number}
              setUserName={setUserName}
            />
          </div>
          <div
            style={{
              padding: "20px",
              backgroundColor: "rgb(35, 35, 35)",
              borderRadius: " 20px",
            }}
          >
            <UserSpec userName={userName} />
          </div>
        </div>
        <div>
          <ArticleContents state={props.state} />
        </div>
      </div>
    </div>
  );
};

export default CommonContents;
