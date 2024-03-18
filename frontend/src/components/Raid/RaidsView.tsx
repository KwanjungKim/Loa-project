import React from "react";
import { useFormContext } from "react-hook-form";
import dayjs from "dayjs";

// styles
import styles from "./RaidsView.module.scss";

// libs
import {
  gateOptions,
  proficiencyOptions,
  raidDifficultyOptions,
} from "@libs/formOptions";

// components
import { IFormValues } from "./Raids";
import PostBox from "@components/boxes/PostBox";
import { IBoard } from "@/libs/types";
import IconButton from "../buttons/IconButton";
import DirectionDownSvg from "../svgs/DirectionDownSvg";
import Button from "../buttons/Button";
import Radios from "../inputs/Radios";

export interface RaidsViewProps
  extends React.AllHTMLAttributes<HTMLDivElement> {
  articles: IBoard[];
  status: "idle" | "loading" | "error";
  showDetail: boolean;
  handleSubmitData: (data: IFormValues) => void;
  resetType: () => void;
  handleViewDetail: (boardNumber: number) => void;
  toggleShowDetail: () => void;
}

const RaidsView = React.memo(function RaidsView({
  articles,
  status,
  showDetail,
  toggleShowDetail,
  handleSubmitData,
  resetType,
  handleViewDetail,
  ...props
}: RaidsViewProps) {
  const { register, handleSubmit } = useFormContext<IFormValues>();
  return (
    <div className={styles.wrapper} {...props}>
      <div>
        <div className={styles.topWrapper}>
          <div className={styles.topButtons}>
            <IconButton onClick={resetType} title="레이드 다시 선택하기">
              <DirectionDownSvg type="left" aria-hidden />
            </IconButton>
            <Button.Default onClick={toggleShowDetail}>
              {showDetail ? "상세 검색 닫기" : "상세 검색 열기"}
            </Button.Default>
          </div>
          {showDetail && (
            <div className={styles.detailWrapper}>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSubmit(handleSubmitData)();
                }}
              >
                <div>
                  <input
                    type="text"
                    placeholder="레이드 리더"
                    {...register("raid_leader")}
                  />
                </div>
                <div>
                  <input
                    type="text"
                    placeholder="제목"
                    {...register("title")}
                  />
                </div>
                <div>
                  <input
                    type="date"
                    placeholder="시작일"
                    {...register("startDate", {
                      setValueAs: (value) => {
                        return dayjs(value).format("YYYY-MM-DD");
                      },
                    })}
                  />
                </div>
                <Radios title="숙련도">
                  {proficiencyOptions.map((option) => (
                    <Radios.Radio
                      key={`proficiency_${option.value}`}
                      label={option.label}
                      value={option.value}
                      id={`proficiency_${option.value}`}
                      {...register("proficiency")}
                    />
                  ))}
                </Radios>
                <Radios title="난이도">
                  {raidDifficultyOptions.map((option) => (
                    <Radios.Radio
                      key={`raid_difficulty_${option.value}`}
                      label={option.label}
                      value={option.value}
                      id={`raid_difficulty_${option.value}`}
                      {...register("raid_difficulty")}
                    />
                  ))}
                </Radios>
                <Radios title="최소 관문">
                  {gateOptions.map((option) => (
                    <Radios.Radio
                      key={`minGate_${option.value}`}
                      label={option.label}
                      value={option.value}
                      id={`minGate_${option.value}`}
                      {...register("minGate")}
                    />
                  ))}
                </Radios>
                <Radios title="최대 관문">
                  {gateOptions.map((option) => (
                    <Radios.Radio
                      key={`maxGate_${option.value}`}
                      label={option.label}
                      value={option.value}
                      id={`maxGate_${option.value}`}
                      {...register("maxGate")}
                    />
                  ))}
                </Radios>
                <Button.Brand
                  isSmall
                  type="submit"
                  disabled={status === "loading"}
                >
                  검색
                </Button.Brand>
              </form>
            </div>
          )}
        </div>
        <div>
          {articles.length > 0 ? (
            articles.map((article) => (
              <div key={article.board_number}>
                <div>
                  <h4>
                    {article.title} ({article.raid_leader})
                  </h4>
                  <div>#{dayjs(article.startDate).format("M월D일 hh:mm")}</div>
                  <div>{article.member_count}명 참여 중</div>
                </div>
                <div
                  onClick={() => {
                    handleViewDetail(article.board_number);
                  }}
                >
                  상세 보기
                </div>
              </div>
            ))
          ) : (
            <div>검색 결과가 없습니다.</div>
          )}
          {status === "loading" && <div>loading...</div>}
        </div>
      </div>
      <div>
        <PostBox>extra infos</PostBox>
      </div>
    </div>
  );
});

export default RaidsView;
