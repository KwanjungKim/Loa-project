import { useState } from "react";
import raidList from "../kakaoLogin/saraminData.json";
import { useRecoilValue } from "recoil";
import { mainCharState } from "../../atoms/mainCharacter";

const TestSaramIn = () => {
  const mainCharacter = useRecoilValue(mainCharState);

  const paramMap = {
    user_number: mainCharacter.user_number,
    character_name: mainCharacter.character_name,
    leader: mainCharacter.character_name,
    title: "",
    difficulty: "노말",
    content: "발탄",
    minGate: "1관문",
    maxGate: "1관문",
    card: "세구빛 18이상",
    proficiency: "트라이",
    detail: "",
  };
  const [isParamMap, setIsParamMap] = useState(paramMap);

  // 체크 박스 단일 선택
  const checkOnlyOne = (checkThis: any) => {
    const checkboxes: any = document.getElementsByName("RaidDiff");
    for (let i = 0; i < checkboxes.length; i++) {
      if (checkboxes[i] !== checkThis) {
        checkboxes[i].checked = false;
      }
    }
    setIsParamMap((prev) => ({
      ...prev,
      difficulty: `${checkThis.value}`,
    }));
  };

  const handleData = (data: string, e: any) => {
    setIsParamMap((prev) => {
      return {
        ...prev,
        [data]: e,
      };
    });
  };

  return (
    <div>
      <button onClick={() => console.log(isParamMap)}>123</button>글 제목{" "}
      <input
        type="text"
        maxLength={50}
        onChange={(e) => handleData("title", e.target.value)}
      />{" "}
      <br />
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
      레이드 종류
      <select onChange={(e) => handleData("content", e.target.value)}>
        {raidList.raidName.map((raidName: { id: number; name: string }) => (
          <option key={raidName.id} value={raidName.name}>
            {" "}
            {raidName.name}
          </option>
        ))}
      </select>{" "}
      <br />
      최소 관문
      <select onChange={(e) => handleData("minGate", e.target.value)}>
        {raidList.MinRaidGate.map((MinRaidGate) => (
          <option key={MinRaidGate.id} value={MinRaidGate.gate}>
            {" "}
            {MinRaidGate.gate}
          </option>
        ))}
      </select>{" "}
      ~ 최대 관문
      <select onChange={(e) => handleData("maxGate", e.target.value)}>
        {raidList.MaxRaidGate.map((MaxRaidGate) => (
          <option key={MaxRaidGate.id} value={MaxRaidGate.gate}>
            {" "}
            {MaxRaidGate.gate}
          </option>
        ))}
      </select>{" "}
      <br />
      숙련도
      <select onChange={(e) => handleData("proficiency", e.target.value)}>
        {raidList.proficiencyLevel.map((proficiency) => (
          <option key={proficiency.id} value={proficiency.proficiency}>
            {" "}
            {proficiency.proficiency}
          </option>
        ))}
      </select>
      카드
      <select onChange={(e) => handleData("card", e.target.value)}>
        {raidList.cardLevel.map((card) => (
          <option key={card.id} value={card.card}>
            {" "}
            {card.card}
          </option>
        ))}
      </select>
      <br />
      세부사항 <br />
      <textarea
        onChange={(e) => handleData("detail", e.target.value)}
        placeholder="세부사항을 적어주세요."
        style={{ width: "400px", height: "300px", resize: "none" }}
      />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
    </div>
  );
};

export default TestSaramIn;
