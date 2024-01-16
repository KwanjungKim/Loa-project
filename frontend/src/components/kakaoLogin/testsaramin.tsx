import { RaidList, phase2, phase3, phase4 } from "./ListData";
import { useState } from "react";

const TestSaramIn = () => {
  const checkOnlyOne = (checkThis: any) => {
    const checkboxes: any = document.getElementsByName("RaidDiff");
    for (let i = 0; i < checkboxes.length; i++) {
      if (checkboxes[i] !== checkThis) {
        checkboxes[i].checked = false;
      }
    }
    setIsCheckBox(checkThis.value);
  };
  const [isTest, setIsTest] = useState<string>("발탄");
  const [isTest2, setIsTest2] = useState<string[]>(phase2);
  const [isTest3, setIsTest3] = useState<string>("1관문");
  const [isCheckBox, setIsCheckBox] = useState<boolean>();
  // 1 :
  const handleTest = (e: any) => {
    setIsTest(e.target.value);
    console.log("1", e.target.value);
    if (e.target.value === "발탄" || e.target.value === "카양겔") {
      setIsTest2(phase2);
    }
    if (e.target.value === "비아키스" || e.target.value === "쿠크세이튼") {
      setIsTest2(phase3);
    }
    if (e.target.value === "아브렐슈드") {
      setIsTest2(phase4);
    }
  };
  const handleTest2 = (e: any) => {
    setIsTest3(e.target.value);
  };

  return (
    <div>
      <input
        type="checkbox"
        name="RaidDiff"
        value="normal"
        onChange={(e) => checkOnlyOne(e.target)}
      />{" "}
      normal
      <input
        type="checkbox"
        name="RaidDiff"
        value="hard"
        onChange={(e) => checkOnlyOne(e.target)}
      />{" "}
      hard
      <input
        type="checkbox"
        name="RaidDiff"
        value="extream"
        onChange={(e) => checkOnlyOne(e.target)}
      />{" "}
      extream <br />
      <select onChange={(e) => handleTest(e)}>
        {Object.values(RaidList).map((i) => (
          <option value={i.value}>{i.value} </option>
        ))}
      </select>
      <select onChange={(e) => handleTest2(e)}>
        {isTest2.map((it) => (
          <option>{it}</option>
        ))}
      </select>
      <button
        onClick={() =>
          console.log("난이도", isCheckBox, "레이드", isTest, "관문", isTest3)
        }
      >
        123
      </button>
    </div>
  );
};

export default TestSaramIn;
