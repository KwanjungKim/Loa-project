import { AllHTMLAttributes } from "react";
import { useForm } from "react-hook-form";
import useAllArticles from "../../hooks/useAllArticles";

interface IFormValues {
  proficiency: "트라이" | "클경" | "반숙" | "숙련" | "";
  raid_difficulty: "normal" | "hard" | "extreme" | "";
  raid_leader: string;
  startDate: string;
  minGate: "1" | "2" | "3" | "4" | "";
  maxGate: "1" | "2" | "3" | "4" | "";
}

const defaultFormValues: IFormValues = {
  proficiency: "",
  raid_difficulty: "",
  raid_leader: "",
  startDate: "",
  minGate: "",
  maxGate: "",
};

const proficiencyOptions = [
  { value: "", label: "숙련도" },
  { value: "트라이", label: "트라이" },
  { value: "클경", label: "클경" },
  { value: "반숙", label: "반숙" },
  { value: "숙련", label: "숙련" },
];

const raidDifficultyOptions = [
  { value: "", label: "난이도" },
  { value: "normal", label: "노말" },
  { value: "hard", label: "하드" },
  { value: "extreme", label: "익스트림" },
];

const minGateOptions = [
  { value: "", label: "최소 관문" },
  { value: "1", label: "1" },
  { value: "2", label: "2" },
  { value: "3", label: "3" },
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
  const { register, watch, reset, handleSubmit } = useForm({
    defaultValues: defaultFormValues,
  });
  const { articles, handleSearchParams } = useAllArticles(type);

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

  return (
    <div {...props}>
      <div>
        <button onClick={resetType}>돌아가기</button>
      </div>
      <div>
        <h3>{type}</h3>
        <button
          onClick={handleSubmit((data) => {
            console.log(data);
          })}
        >
          search
        </button>
      </div>
      <div>
        {articles.map((article) => (
          <div
            key={article.board_number}
            style={{
              height: "560px",
            }}
          >
            <h4>{article.title}</h4>
            <div>#{article.member_count}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
