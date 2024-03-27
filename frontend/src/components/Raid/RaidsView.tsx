import { AllHTMLAttributes } from "react";
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
import { IBoard } from "@libs/types";

// components
import { IFormValues } from "./Raids";
import RaidList from "./RaidList";
import PostBox from "@components/boxes/PostBox";
import IconButton from "@components/buttons/IconButton";
import DirectionDownSvg from "@components/svgs/DirectionDownSvg";
import Button from "@components/buttons/Button";
import Input from "@components/inputs/Input";
import RadioInputWrapper from "@components/inputs/RadioInput";
import Spinner from "../common/Spinner";

export interface RaidsViewProps extends AllHTMLAttributes<HTMLDivElement> {
  articles: IBoard[];
  status: "idle" | "loading" | "error";
  showDetail: boolean;
  handleSubmitData: (data: IFormValues) => void;
  resetType: () => void;
  handleViewDetail: (boardNumber: number) => void;
  toggleShowDetail: () => void;
}

const RaidsView = function RaidsView({
  articles,
  status,
  showDetail,
  toggleShowDetail,
  handleSubmitData,
  resetType,
  handleViewDetail,
  ...props
}: RaidsViewProps) {
  const { handleSubmit } = useFormContext<IFormValues>();
  return (
    <div className={styles.wrapper} {...props}>
      <div>
        <div className={styles.topWrapper}>
          <div className={styles.topButtons}>
            <IconButton onClick={resetType} title="레이드 다시 선택하기">
              <DirectionDownSvg type="left" aria-hidden />
            </IconButton>
            <Button.Default isSmall onClick={toggleShowDetail}>
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
                <SearchForm />
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
        <div className={styles.bottomWrapper}>
          <RaidList articles={articles} handleViewDetail={handleViewDetail} />
          {status === "loading" && (
            <div>
              <Spinner />
            </div>
          )}
        </div>
      </div>
      <div>
        <PostBox>extra infos</PostBox>
      </div>
    </div>
  );
};

export default RaidsView;

const SearchForm = function SearchForm() {
  const { register, watch } = useFormContext<IFormValues>();
  const { minGate, maxGate, raid_difficulty, proficiency } = watch();
  return (
    <div className={styles.searchForm}>
      <Input
        type="text"
        placeholder="레이드 리더"
        maxLength={20}
        label="레이드 리더"
        {...register("raid_leader")}
      />
      <Input
        type="text"
        placeholder="제목"
        label="제목"
        {...register("title")}
      />
      <Input
        type="date"
        placeholder="시작일"
        label="시작일"
        min={dayjs().format("YYYY-MM-DD")}
        max={dayjs().add(30, "days").format("YYYY-MM-DD")}
        {...register("startDate", {
          setValueAs: (value) => {
            return dayjs(value).format("YYYY-MM-DD");
          },
        })}
      />
      <RadioInputWrapper label="숙련도" title="숙련도">
        {proficiencyOptions.map((option) => {
          return (
            <RadioInputWrapper.RadioInput
              key={`proficiency_${option.value}`}
              isChecked={proficiency === option.value}
              label={option.label}
              value={option.value}
              id={`proficiency_${option.value}`}
              {...register("proficiency")}
            />
          );
        })}
      </RadioInputWrapper>
      <RadioInputWrapper label="난이도" title="난이도">
        {raidDifficultyOptions.map((option) => {
          return (
            <RadioInputWrapper.RadioInput
              key={`raid_difficulty_${option.value}`}
              isChecked={raid_difficulty === option.value}
              label={option.label}
              value={option.value}
              id={`raid_difficulty_${option.value}`}
              {...register("raid_difficulty")}
            />
          );
        })}
      </RadioInputWrapper>

      <RadioInputWrapper label="최소 관문" title="최소 관문">
        {gateOptions.map((option) => {
          return (
            <RadioInputWrapper.RadioInput
              key={`minGate_${option.value}`}
              isChecked={minGate === option.value}
              label={option.label}
              value={option.value}
              id={`minGate_${option.value}`}
              {...register("minGate")}
            />
          );
        })}
      </RadioInputWrapper>
      <RadioInputWrapper label="최대 관문" title="최대 관문">
        {gateOptions.map((option) => {
          return (
            <RadioInputWrapper.RadioInput
              key={`maxGate_${option.value}`}
              isChecked={maxGate === option.value}
              label={option.label}
              value={option.value}
              id={`maxGate_${option.value}`}
              {...register("maxGate")}
            />
          );
        })}
      </RadioInputWrapper>
    </div>
  );
};
