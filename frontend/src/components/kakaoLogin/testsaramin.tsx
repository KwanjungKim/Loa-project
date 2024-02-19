import { useState } from "react";

import { useRecoilValue } from "recoil";
import { mainCharState } from "../../atoms/mainCharacter";

import { DateTimePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import { selectList, selectRaidType } from "./saraminData";
import fetchUtils from "../../utils/fetchUtils";

type IparamMap = {
  title: string; //  글제목
  content: string; // 글 내용
  user_number: string | undefined; // 유저넘버
  character_name: string | undefined; // 글쓴이
  raid_leader: string | undefined; // 레이드 공대장
  raid_difficulty: string; // 레이드 난이도
  raid_type: string; // 레이드 타입
  proficiency: string; // 숙련도
  minGate: string; // 최소 관문
  maxGate: string; // 최대 관문
  card_level: string; // 카드 레벨
  startDate: string; // 출발 시간
  member: string[];
};
const TestSaramIn = () => {
  const mainCharacter = useRecoilValue(mainCharState);
  const datePickerFormat = "YYYY-MM-DD HH:mm";
  const [isCharacter, setIsCharacter] = useState<string>("");
  const [isGate, setIsGate] = useState<number>(0);

  const paramMap: IparamMap = {
    title: "",
    content: "",
    user_number: mainCharacter.user_number,
    character_name: mainCharacter.character_name,
    raid_leader: mainCharacter.character_name,
    raid_difficulty: "normal",
    raid_type: "발탄",
    proficiency: "트라이",
    minGate: "1관문",
    maxGate: "1관문",
    card_level: "조건 없음",
    startDate: "",
    member: [mainCharacter.character_name],
  };
  const [isParamMap, setIsParamMap] = useState<IparamMap>(paramMap);

  // title, diff, raid type, gate, content
  // input data => isparamMap
  const handleData = (data: string, e: any) => {
    setIsParamMap((prev) => {
      return {
        ...prev,
        [data]: e,
      };
    });
  };

  //  proficiency, card
  //  select data => isparamMap
  const handleSelect = (
    str: string,
    handleData: (str: string, e: any) => void,
  ) => {
    return (
      <>
        <select onChange={(e) => handleData(str, e.target.value)}>
          {selectList[str].map((value: { id: number; name: string }) => (
            <option key={value.id} value={value.name}>
              {" "}
              {value.name}
            </option>
          ))}
        </select>
      </>
    );
  };

  // startDate
  // date data => isparamMap
  const handleDateChange = (str: string, date: dayjs.Dayjs | null) => {
    const formattedDate = dayjs(date).format(datePickerFormat);
    setIsParamMap((prev) => {
      return {
        ...prev,
        [str]: formattedDate,
      };
    });
  };

  const difficultyFilter = () => {
    if (isParamMap.raid_difficulty === "normal") {
      return 0;
    } else if (isParamMap.raid_difficulty === "hard") {
      return 1;
    } else {
      return 2;
    }
  };

  const gateFilter = () => {
    const arr: number[] = [];
    for (
      let i: number = 0;
      i < selectRaidType.raidtype[isGate].maxGate[difficultyFilter()];
      i++
    ) {
      arr.push(i + 1);
    }

    return arr;
  };

  // add member
  const getCharacter = () => {
    const paramMap = {
      character_name: isCharacter,
    };
    if (!isParamMap.member.includes(isCharacter)) {
      if (isParamMap.member.length < 8) {
        fetchUtils.post("/user/getCharacter", paramMap).then((res) => {
          if (!res.success) {
            alert(`${res.message}`);
          } else {
            setIsParamMap((prev) => {
              return {
                ...prev,
                member: [
                  ...prev.member,
                  res.data.characterModel.character_name,
                ],
              };
            });
            alert("등록 되었습니다.");
          }
        });
      } else {
        alert("공대가 가득 찼습니다.");
      }
    } else {
      alert("이미 등록된 캐릭터 입니다.");
    }
  };

  // isParamMap => server
  const addArticle = () => {
    fetchUtils.post("/board/addArticle", isParamMap).then((res) => {
      if (!res.success) {
        alert(res.message);
      } else {
        alert(res.message);
      }
    });
  };

  return (
    <div>
      <button onClick={() => console.log(isParamMap)}>123</button>
      <input
        placeholder="제목을 입력해주세요."
        type="text"
        maxLength={50}
        onChange={(e) => handleData("title", e.target.value)}
      />{" "}
      <br />
      <LocalizationProvider adapterLocale="en" dateAdapter={AdapterDayjs}>
        <DateTimePicker
          label="출발 시간을 선택해주세요."
          format="YYYY년 MM월 DD일 A HH시 mm분"
          defaultValue={null}
          slotProps={{
            textField: {
              size: "small",
            },
          }}
          onChange={(newValue) => {
            handleDateChange("startDate", newValue);
          }}
          sx={{
            width: "305px",
            margin: "10px",
          }}
        />
      </LocalizationProvider>
      <br />
      <input
        type="radio"
        name="RaidDiff"
        value="normal"
        onChange={(e) => handleData("raid_difficulty", e.target.value)}
      />{" "}
      Normal
      <input
        type="radio"
        name="RaidDiff"
        value="hard"
        onChange={(e) => handleData("raid_difficulty", e.target.value)}
      />{" "}
      Hard
      <input
        type="radio"
        name="RaidDiff"
        value="extream"
        onChange={(e) => handleData("raid_difficulty", e.target.value)}
      />{" "}
      Extream
      <br />
      레이드 종류
      <select
        onChange={(e) => {
          handleData("raid_type", e.target.value);
          setIsGate(e.target.selectedIndex);
        }}
      >
        {selectRaidType.raidtype.map(
          (value: { id: number; name: string; maxGate: number[] }) => (
            <>
              <option key={value.id}>{value.name}</option>
            </>
          ),
        )}
      </select>{" "}
      <br />
      최소
      <select onChange={(e) => handleData("minGate", e.target.value)}>
        {gateFilter().map((value: number, id: number) => (
          <option key={id}>{value}관문</option>
        ))}
      </select>
      ~ 최대
      <select onChange={(e) => handleData("maxGate", e.target.value)}>
        {gateFilter().map((value: number, id: number) => (
          <option key={id}>{value}관문</option>
        ))}
      </select>
      <br />
      숙련도
      {handleSelect("proficiency", handleData)}
      카드
      {handleSelect("card_level", handleData)}
      <br />
      세부사항 <br />
      <textarea
        aria-label="dkd"
        onChange={(e) => handleData("content", e.target.value)}
        placeholder="세부사항을 적어주세요."
        style={{ width: "400px", height: "300px", resize: "none" }}
      />
      <br />
      {isParamMap.member[0]} {"  "}
      {isParamMap.member[1]} {"  "}
      {isParamMap.member[2]} {"  "}
      {isParamMap.member[3]} {"  "}
      <br />
      {isParamMap.member[4]} {"  "}
      {isParamMap.member[5]} {"  "}
      {isParamMap.member[6]} {"  "}
      {isParamMap.member[7]} {"  "} <br />
      <input onChange={(e) => setIsCharacter(e.target.value)} />
      <button onClick={() => getCharacter()}>getCharacter</button>
      <br />
      <button onClick={() => addArticle()}>글 작성</button>
    </div>
  );
};

export default TestSaramIn;
