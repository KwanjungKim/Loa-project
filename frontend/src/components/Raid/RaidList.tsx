import React from "react";
import dayjs from "dayjs";

// styles
import styles from "./RaidList.module.scss";

// libs
import { IBoard } from "@libs/types";

// components
import IconButton from "@components/buttons/IconButton";
import CommentSvg from "@components/svgs/CommentSvg";

interface Props extends React.AllHTMLAttributes<HTMLDivElement> {
  articles: IBoard[];
  handleViewDetail: (boardNumber: number) => void;
}

const RaidList = React.memo(function Articles({
  articles,
  handleViewDetail,
  ...props
}: Props) {
  return (
    <div
      className={`${styles.articlesWrapper} ${
        articles.length > 0 ? "" : styles.noData
      }`}
      {...props}
    >
      {articles.length > 0 ? (
        articles.map((article) => (
          <div className={styles.article} key={article.board_number}>
            <div>
              <div>
                <h4>{article.title}</h4>
                <p>({dayjs(article.startDate).format("YYYY-MM-DD HH:mm")})</p>
              </div>
              <p>
                {article.raid_type} | {article.raid_difficulty} |{" "}
                {article.proficiency} | {article.minGate} - {article.maxGate}
              </p>
            </div>
            <div>
              <IconButton
                onClick={() => {
                  handleViewDetail(article.board_number);
                }}
              >
                <CommentSvg />
              </IconButton>
            </div>
          </div>
        ))
      ) : (
        <p className={styles.noData}>검색 결과가 없습니다.</p>
      )}
    </div>
  );
});

export default RaidList;
