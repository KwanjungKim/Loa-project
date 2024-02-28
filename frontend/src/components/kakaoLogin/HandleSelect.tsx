import { ISelectProps } from "./RecruitmentPost";
import { selectList } from "./raidData";
//  proficiency, card
//  select data => paramMap
const HandleSelect = ({ str, setParamMap }: ISelectProps) => {
  const handleData = (str: string, e: string) => {
    setParamMap((prev: any) => {
      return {
        ...prev,
        [str]: e,
      };
    });
  };
  return (
    <>
      <select
        style={{
          borderRadius: "5px",
          border: "3px solid #fbc02d",
        }}
        onChange={(e) => handleData(str, e.target.value)}
      >
        {selectList[str].map((value) => (
          <option key={value.id} value={value.name}>
            {" "}
            {value.name}
          </option>
        ))}
      </select>
    </>
  );
};

export default HandleSelect;
