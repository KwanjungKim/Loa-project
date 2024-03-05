import { useForm } from "react-hook-form";
import useArticles from "../../hooks/useArticles";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import { useNavigate } from "react-router-dom";

interface FormValues {
  proficiency: "트라이" | "클경" | "반숙" | "숙련" | "";
  raid_difficulty: "normal" | "hard" | "extreme" | "";
  raid_leader: string;
  startDate: string;
  minGate: string;
}

const Raid = () => {
  const navigate = useNavigate();
  const { articles, handleParams } = useArticles();
  const { register, handleSubmit, setValue, watch } = useForm<FormValues>();
  const handleClickSubmit = handleSubmit((data) => {
    console.log("data", data);
    handleParams({
      prof: data.proficiency,
      diff: data.raid_difficulty,
      leader: data.raid_leader,
      start: data.startDate,
      min: data.minGate,
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

  return (
    <div>
      <div>
        {/* filter */}
        <select {...register("proficiency")}>
          <option value="">숙련도</option>
          <option value="트라이">트라이</option>
          <option value="클경">클경</option>
          <option value="반숙">반숙</option>
          <option value="숙련">숙련</option>
        </select>
        <select {...register("raid_difficulty")}>
          <option value="">난이도</option>
          <option value="normal">노말</option>
          <option value="hard">하드</option>
          <option value="extreme">익스트림</option>
        </select>
        <select {...register("minGate")}>
          <option value="">최소 관문</option>
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
        </select>
        <LocalizationProvider adapterLocale="ko" dateAdapter={AdapterDayjs}>
          <DatePicker
            format="YYYY년 MM월 DD일"
            defaultValue={null}
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
            sx={{
              width: "355px",
              margin: "10px",
            }}
          />
        </LocalizationProvider>
        <input
          type="text"
          placeholder="레이드장"
          {...register("raid_leader")}
        />
        <button onClick={handleClickSubmit}>submit</button>
      </div>
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
            {article.title} ({article.member_count}명)
          </h3>
          <p>
            {article.raid_type} ({dayjs(article.startDate).format("YYYY.MM.DD")}
            )
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
      <button>add</button>
    </div>
  );
};

export default Raid;
