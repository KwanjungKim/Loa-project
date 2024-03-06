import {
  FieldErrors,
  SubmitHandler,
  UseFormHandleSubmit,
  UseFormRegister,
} from "react-hook-form";
import { FormValue, IparamMap } from "./RecruitmentPost";
import { IPropsSelectList } from "./raidData";
import HandleSelect from "./HandleSelect";
import RaidDate from "./RaidDate";

export interface IRecruitmentPostViewProps
  extends React.AllHTMLAttributes<HTMLDivElement> {
  handleData: (data: string, e: any) => void;
  paramMap: IparamMap;
  register: UseFormRegister<FormValue>;
  handleSubmit: UseFormHandleSubmit<FormValue, FormValue>;
  errors: FieldErrors<FormValue>;
  onSubmitHandler: SubmitHandler<FormValue>;
  getCharacter: () => void;
  gateFilter: () => number[];
  setParamMap: React.Dispatch<React.SetStateAction<IparamMap>>;
  setGate: React.Dispatch<React.SetStateAction<number>>;
  characterName: string;
  setCharacterName: React.Dispatch<React.SetStateAction<string>>;
  selectRaidType: IPropsSelectList;
}

const RecruitmentPostView = ({
  handleData,
  paramMap,
  register,
  handleSubmit,
  errors,
  onSubmitHandler,
  getCharacter,
  gateFilter,
  setParamMap,
  setGate,
  characterName,
  setCharacterName,
  selectRaidType,
}: IRecruitmentPostViewProps) => {
  return (
    <>
      <form onSubmit={handleSubmit(onSubmitHandler)}>
        <input
          placeholder="제목을 입력해주세요."
          type="text"
          maxLength={50}
          style={{
            width: "280px",
            borderRadius: "5px",
            border: "3px solid #fbc02d",
            margin: "5px",
            marginBottom: "10px",
          }}
          {...register("title")}
          onChange={(e) => handleData("title", e.target.value)}
        />{" "}
        <p style={{ color: "red", fontSize: "12px" }}>
          {errors.title?.message}
        </p>
        <RaidDate setParamMap={setParamMap} />
        <br />
        <input
          type="radio"
          value="normal"
          style={{
            margin: "10px",
          }}
          {...register("raid_difficulty")}
          onChange={(e) => handleData("raid_difficulty", e.target.value)}
        />{" "}
        Normal
        <input
          type="radio"
          value="hard"
          style={{
            margin: "10px",
          }}
          {...register("raid_difficulty")}
          onChange={(e) => handleData("raid_difficulty", e.target.value)}
        />{" "}
        Hard
        <input
          type="radio"
          value="extream"
          style={{
            margin: "10px",
          }}
          {...register("raid_difficulty")}
          onChange={(e) => {
            handleData("raid_difficulty", e.target.value);
          }}
        />{" "}
        Extream
        <p style={{ color: "red", fontSize: "12px" }}>
          {errors.raid_difficulty?.message}
        </p>
        <label>레이드 종류</label>
        <select
          style={{
            borderRadius: "5px",
            border: "3px solid #fbc02d",
            margin: "5px",
          }}
          onChange={(e) => {
            handleData("raid_type", e.target.value);
            setGate(e.target.selectedIndex);
          }}
        >
          {selectRaidType.raidtype.map((value) => (
            <option key={value.id}>{value.name}</option>
          ))}
        </select>{" "}
        <br />
        최소
        <select
          style={{
            borderRadius: "5px",
            border: "3px solid #fbc02d",
          }}
          onChange={(e) => handleData("minGate", e.target.value)}
        >
          {gateFilter().map((value: number, id: number) => (
            <option key={id}>{value}</option>
          ))}
        </select>
        관문 ~ 최대
        <select
          style={{
            borderRadius: "5px",
            border: "3px solid #fbc02d",
            margin: "5px",
          }}
          {...register("gate")}
          onChange={(e) => handleData("maxGate", e.target.value)}
        >
          {gateFilter().map((value: number, id: number) => (
            <option key={id}>{value}</option>
          ))}
        </select>
        관문
        <p style={{ color: "red", fontSize: "12px" }}>
          {errors.gate?.message}{" "}
        </p>
        숙련도
        <HandleSelect str={"proficiency"} setParamMap={setParamMap} />
        카드
        <HandleSelect str={"card_level"} setParamMap={setParamMap} />
        <br />
        세부사항 <br />
        <textarea
          placeholder="세부사항을 적어주세요."
          style={{
            width: "90%",
            height: "300px",
            resize: "none",
            borderRadius: "5px",
            border: "3px solid #fbc02d",
          }}
          onChange={(e) => handleData("content", e.target.value)}
        />
        <br />
        {paramMap.member[0]} {"  "}
        {paramMap.member[1]} {"  "}
        {paramMap.member[2]} {"  "}
        {paramMap.member[3]} {"  "}
        <br />
        {paramMap.member[4]} {"  "}
        {paramMap.member[5]} {"  "}
        {paramMap.member[6]} {"  "}
        {paramMap.member[7]} {"  "} <br />
        <input
          value={characterName}
          onChange={(e) => setCharacterName(e.target.value)}
        />
        <button type="button" onClick={() => getCharacter()}>
          getCharacter
        </button>
        <br />
        <div>
          <input type="submit" value={"글작성"} />
        </div>
      </form>
    </>
  );
};

export default RecruitmentPostView;
