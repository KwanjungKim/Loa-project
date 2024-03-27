import { useSearchParams } from "react-router-dom";

// components
import Raids from "./Raids";
import Button from "@components/buttons/Button";

type IRaidType =
  | "발탄"
  | "비아키스"
  | "쿠크세이튼"
  | "아브렐슈드"
  | "일리아칸"
  | "카멘"
  | "에퀴드나"
  | "상아탑"
  | "카양겔";

const raidTypeOptions: { value: IRaidType | ""; id: number }[] = [
  { value: "발탄", id: 1 },
  { value: "비아키스", id: 2 },
  { value: "쿠크세이튼", id: 3 },
  { value: "아브렐슈드", id: 4 },
  { value: "일리아칸", id: 5 },
  { value: "카멘", id: 6 },
  { value: "에퀴드나", id: 7 },
  { value: "상아탑", id: 8 },
  { value: "카양겔", id: 9 },
];

const Raid = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const selectedRaid = searchParams.get("type") as IRaidType | "";

  function resetType() {
    setSearchParams({ type: "" });
  }
  return (
    <>
      {typeof selectedRaid === "string" && selectedRaid !== "" ? (
        <Raids type={selectedRaid} resetType={resetType} />
      ) : (
        <div>
          {raidTypeOptions.map((type) => {
            return (
              <Button.Default
                key={type.id}
                onClick={() => {
                  setSearchParams({ type: type.value });
                }}
              >
                {type.value}
              </Button.Default>
            );
          })}
        </div>
      )}
    </>
  );
};

export default Raid;
