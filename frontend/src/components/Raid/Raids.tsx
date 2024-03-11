import { AllHTMLAttributes } from "react";
import { useForm } from "react-hook-form";
import useAllArticles from "../../hooks/useAllArticles";
import { useNavigate } from "react-router-dom";
import dayjs from "dayjs";

interface IFormValues {
  proficiency: "트라이" | "클경" | "반숙" | "숙련" | "";
  raid_difficulty: "normal" | "hard" | "extreme" | "";
  raid_leader: string;
  startDate: string;
  minGate: "1" | "2" | "3" | "4" | "";
  maxGate: "1" | "2" | "3" | "4" | "";
  title: string;
}

const defaultFormValues: IFormValues = {
  proficiency: "",
  raid_difficulty: "",
  raid_leader: "",
  startDate: "",
  minGate: "",
  maxGate: "",
  title: "",
};

const proficiencyOptions = [
  { value: "", label: "전체" },
  { value: "트라이", label: "트라이" },
  { value: "클경", label: "클경" },
  { value: "반숙", label: "반숙" },
  { value: "숙련", label: "숙련" },
];

const raidDifficultyOptions = [
  { value: "", label: "전체" },
  { value: "normal", label: "노말" },
  { value: "hard", label: "하드" },
  { value: "extreme", label: "익스트림" },
];

const gateOptions = [
  { value: "", label: "전체" },
  { value: "1", label: "1" },
  { value: "2", label: "2" },
  { value: "3", label: "3" },
  { value: "4", label: "4" },
];

type IRaidType =
  | "발탄"
  | "비아키스"
  | "쿠크세이튼"
  | "아브렐슈드"
  | "일리아칸"
  | "카멘"
  | "에키드나"
  | "상아탑"
  | "카양겔";

interface Props extends AllHTMLAttributes<HTMLDivElement> {
  type: IRaidType | "";
  resetType: () => void;
}

export default function Raids({ type, resetType, ...props }: Props) {
  const navigate = useNavigate();
  function handleViewDetail(boardNumber: number) {
    navigate(`/raid/${boardNumber}`);
  }
  const { register, watch, handleSubmit } = useForm({
    defaultValues: defaultFormValues,
  });
  const { status, articles, handleSearchParams } = useAllArticles(type);

  const {
    startDate,
    proficiency,
    raid_difficulty,
    raid_leader,
    minGate,
    maxGate,
  } = watch();
  console.log(
    "startDate",
    startDate,
    "proficiency",
    proficiency,
    "raid_difficulty",
    raid_difficulty,
    "raid_leader",
    raid_leader,
    "minGate",
    minGate,
    "maxGate",
    maxGate,
  );

  function onSubmit(formData: IFormValues) {
    if (
      formData.minGate !== "" &&
      formData.maxGate !== "" &&
      Number(formData.minGate) > Number(formData.maxGate)
    ) {
      alert("최소 관문은 최대 관문보다 클 수 없습니다.");
      return;
    }

    if (formData.startDate === "") {
      formData.startDate = dayjs().format("YYYY-MM-DD");
    }

    const isBeforeToday = dayjs(formData.startDate).isBefore(
      dayjs().format("YYYY-MM-DD"),
    );
    const isAfterThirtyDays = dayjs(formData.startDate).isAfter(
      dayjs().add(29, "day").format("YYYY-MM-DD"),
    );

    if (isBeforeToday || isAfterThirtyDays) {
      alert("시작일은 오늘부터 30일 이내여야 합니다.");
      return;
    }

    handleSearchParams({ ...formData, type });
  }

  return (
    <div {...props}>
      <div>
        <button onClick={resetType}>돌아가기</button>
      </div>
      <div>
        <h3>{type}</h3>
        <div>
          <input
            type="text"
            placeholder="레이드 리더"
            {...register("raid_leader")}
          />
        </div>
        <div>
          <input type="text" placeholder="제목" {...register("title")} />
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
        <div
          style={{
            display: "flex",
            alignItems: "center",
          }}
        >
          <div>숙련도</div>
          {proficiencyOptions.map((option) => (
            <div key={`proficiency_${option.value}`}>
              <input
                type="radio"
                id={`proficiency_${option.value}`}
                value={option.value}
                {...register("proficiency")}
              />
              <label htmlFor={`proficiency_${option.value}`}>
                {option.label}
              </label>
            </div>
          ))}
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
          }}
        >
          <div>난이도</div>
          {raidDifficultyOptions.map((option) => (
            <div key={`raid_difficulty_${option.value}`}>
              <input
                type="radio"
                id={`raid_difficulty_${option.value}`}
                value={option.value}
                {...register("raid_difficulty")}
              />
              <label htmlFor={`raid_difficulty_${option.value}`}>
                {option.label}
              </label>
            </div>
          ))}
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
          }}
        >
          <div>최소 관문</div>
          {gateOptions.map((option) => (
            <div key={`minGate_${option.value}`}>
              <input
                type="radio"
                id={`minGate_${option.value}`}
                value={option.value}
                {...register("minGate")}
              />
              <label htmlFor={`minGate_${option.value}`}>{option.label}</label>
            </div>
          ))}
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
          }}
        >
          <div>최대 관문</div>
          {gateOptions.map((option) => (
            <div key={`maxGate_${option.value}`}>
              <input
                type="radio"
                id={`maxGate_${option.value}`}
                value={option.value}
                {...register("maxGate")}
              />
              <label htmlFor={`maxGate_${option.value}`}>{option.label}</label>
            </div>
          ))}
        </div>
        <button onClick={handleSubmit(onSubmit)}>search</button>
      </div>
      <div>
        {articles.map((article) => (
          <div
            key={article.board_number}
            style={{
              height: "560px",
            }}
          >
            <div>
              <h4>
                {article.title} ({article.startDate})
              </h4>
              <div>#{article.member_count}</div>
            </div>
            <div
              onClick={() => {
                handleViewDetail(article.board_number);
              }}
            >
              상세 보기
            </div>
          </div>
        ))}
        {status === "loading" && <div>loading...</div>}
      </div>
    </div>
  );
}
