import React, { SelectHTMLAttributes, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import dayjs from "dayjs";
import { useForm } from "react-hook-form";
import useArticles from "../../hooks/useArticles";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

interface FormValues {
  proficiency: "트라이" | "클경" | "반숙" | "숙련" | "";
  raid_difficulty: "normal" | "hard" | "extreme" | "";
  raid_leader: string;
  startDate: string;
  minGate: string;
}

const defaultValues: FormValues = {
  proficiency: "",
  raid_difficulty: "",
  raid_leader: "",
  startDate: "",
  minGate: "",
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

const Raid = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const { articles, isLoading, pageNo, handleParams } = useArticles();
  const { register, handleSubmit, setValue, watch, reset } =
    useForm<FormValues>({
      defaultValues,
    });
  const handleClickSubmit = handleSubmit((data) => {
    console.log("data", data);
    handleParams({
      prof: data.proficiency,
      diff: data.raid_difficulty,
      leader: data.raid_leader,
      start: data.startDate,
      min: data.minGate,
    });
    setSearchParams({
      proficiency: data.proficiency,
      raid_difficulty: data.raid_difficulty,
      raid_leader: data.raid_leader,
      startDate: data.startDate,
      minGate: data.minGate,
    });
    reset({
      ...defaultValues,
      startDate: data.startDate,
    });
  });

  const { proficiency, raid_difficulty, raid_leader, startDate, minGate } =
    watch();

  console.log(
    "prof:",
    proficiency,
    ", diff:",
    raid_difficulty,
    ", leader:",
    raid_leader,
    ", start:",
    startDate,
    ", min:",
    minGate,
  );

  useEffect(() => {
    console.log("searchParams", searchParams);
    console.log(searchParams.get("proficiency"));
  }, [searchParams, handleParams]);

  return (
    <div>
      <div>
        {/* filter */}
        <Select {...register("proficiency")}>
          {proficiencyOptions.map((option) => (
            <option value={option.value} key={`proficiency_${option.value}`}>
              {option.label}
            </option>
          ))}
        </Select>
        <Select {...register("raid_difficulty")}>
          {raidDifficultyOptions.map((option) => (
            <option
              value={option.value}
              key={`raid_difficulty_${option.value}`}
            >
              {option.label}
            </option>
          ))}
        </Select>
        <Select {...register("minGate")}>
          {minGateOptions.map((option) => (
            <option value={option.value} key={`minGate_${option.value}`}>
              {option.label}
            </option>
          ))}
        </Select>
        <LocalizationProvider adapterLocale="ko" dateAdapter={AdapterDayjs}>
          <DatePicker
            format="YYYY년 MM월 DD일"
            defaultValue={
              searchParams.get("startDate")
                ? dayjs(searchParams.get("startDate"))
                : dayjs()
            }
            onChange={(value) => {
              const isBeforeToday = dayjs(value).isBefore(dayjs(), "day");
              if (isBeforeToday) {
                alert("오늘 이전의 날짜를 선택할 수 없습니다.");
                return;
              }
              const isAfterThirtyDays = dayjs(value).isAfter(
                dayjs().add(29, "day"),
                "day",
              );
              if (isAfterThirtyDays) {
                alert("오늘부터 30일까지의 날짜만 선택할 수 있습니다.");
                return;
              }
              setValue("startDate", dayjs(value).format("YYYY-MM-DD"));
            }}
            // sx={{
            //   width: "355px",
            //   margin: "10px",
            // }}
          />
        </LocalizationProvider>
        <input
          type="text"
          placeholder="레이드장"
          {...register("raid_leader")}
        />
        <button onClick={handleClickSubmit}>submit</button>
      </div>
      <div></div>
      <div>
        {isLoading && pageNo === 0 ? (
          <p>loading...</p>
        ) : (
          <div>
            {articles.map((article) => (
              <div
                key={article.board_number}
                style={{
                  padding: "10px 12px",
                  cursor: "pointer",
                }}
                onClick={() => navigate(`/raid/${article.board_number}`)}
              >
                {/* articles */}
                <h3>
                  {article.title} ({article.member_count}명,{" "}
                  {article.raid_leader})
                </h3>
                <p>
                  {article.raid_type} (
                  {dayjs(article.startDate).format("YYYY.MM.DD")})
                </p>
                <div>
                  <p>
                    {article.minGate === article.maxGate
                      ? `${article.minGate}관문`
                      : `${article.minGate} - ${article.maxGate}관문`}
                  </p>
                  <p>
                    {article.raid_difficulty === "normal"
                      ? "노말"
                      : article.raid_difficulty === "hard"
                      ? "하드"
                      : "익스트림"}{" "}
                    | {article.proficiency}
                  </p>
                </div>
                {/* {article.content.length > 0 && (
                  <p dangerouslySetInnerHTML={{ __html: article.content }} />
                )} */}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Raid;

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  children: React.ReactNode;
}

const Select = React.forwardRef(function (
  { children, ...props }: SelectProps,
  ref: React.Ref<HTMLSelectElement>,
) {
  return (
    <select {...props} ref={ref}>
      {children}
    </select>
  );
});
