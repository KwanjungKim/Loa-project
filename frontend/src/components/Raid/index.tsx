import { useForm } from "react-hook-form";
import useArticles from "../../hooks/useArticles";

interface FormValues {
  proficiency: "트라이" | "클경" | "반숙" | "숙련" | "";
  raid_difficulty: "노말" | "하드" | "익스트림" | "";
  raid_leader: string;
  startDate: string;
  minGate: string;
}

const Raid = () => {
  const { articles, handleParams } = useArticles();
  const { register, handleSubmit } = useForm<FormValues>();
  const handleClickSubmit = handleSubmit((data) => {
    console.log("data", data);
    handleParams({
      prof: data.proficiency,
      diff: data.raid_difficulty,
      leader: data.raid_leader,
    });
  });

  return (
    <div>
      <div>
        {/* filter */}
        <select {...register("proficiency")}>
          <option value="">숙련도</option>
          <option value="트라이">트라이</option>
          <option value="반숙">클경</option>
          <option value="반숙">반숙</option>
          <option value="숙련">숙련</option>
        </select>
        <select {...register("raid_difficulty")}>
          <option value="">난이도</option>
          <option value="노말">노말</option>
          <option value="하드">하드</option>
          <option value="익스트림">익스트림</option>
        </select>
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
            height: "480px",
          }}
        >
          {/* articles */}
          <p>{article.title}</p>
          <p>{article.content}</p>
        </div>
      ))}
      <button>add</button>
    </div>
  );
};

export default Raid;
