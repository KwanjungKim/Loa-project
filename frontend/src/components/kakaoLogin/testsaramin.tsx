import { useState } from "react";

import { useRecoilValue } from "recoil";
import { mainCharState } from "../../atoms/mainCharacter";

import { DateTimePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import { selectList, selectRaidList } from "./saraminData";

type IparamMap = {
  user_number: string | undefined;
  character_name: string | undefined;
  leader: string | undefined;
  title: string;
  difficulty: string;
  content: string;
  minGate: string;
  maxGate: string;
  card: string;
  proficiency: string;
  detail: string;
  startDate: string;
  EndDate: string;
};
const TestSaramIn = () => {
  const mainCharacter = useRecoilValue(mainCharState);
  const datePickerFormat = "YYYY/MM/DD HH:mm";
  const [gateFilter, setGateFilter] = useState<number>(0);

  const paramMap: IparamMap = {
    user_number: mainCharacter.user_number,
    character_name: mainCharacter.character_name,
    leader: mainCharacter.character_name,
    title: "",
    difficulty: "normal",
    content: "발탄",
    minGate: "1관문",
    maxGate: "1관문",
    card: "세구빛 18이상",
    proficiency: "트라이",
    detail: "",
    startDate: "",
    EndDate: "",
  };
  const [isParamMap, setIsParamMap] = useState<IparamMap>(paramMap);

  // select data => isparamMap
  const handleData = (data: string, e: any) => {
    setIsParamMap((prev) => {
      return {
        ...prev,
        [data]: e,
      };
    });
  };

  const handleSelect = (
    data: string,
    str: string,
    setIsParamMap: React.Dispatch<React.SetStateAction<IparamMap>>,
  ) => {
    const handleData = (str: string, e: any) => {
      setIsParamMap((prev: any) => {
        return {
          ...prev,
          [str]: e,
        };
      });
    };
    return (
      <>
        <select onChange={(e) => handleData(str, e.target.value)}>
          {selectList[data].map((value: { id: number; name: string }) => (
            <option key={value.id} value={value.name}>
              {" "}
              {value.name}
            </option>
          ))}
        </select>
      </>
    );
  };

  const handleDateChange = (str: string, date: dayjs.Dayjs | null) => {
    const formattedDate = dayjs(date).format(datePickerFormat);
    setIsParamMap((prev) => {
      return {
        ...prev,
        [str]: formattedDate,
      };
    });
  };
  const testhandler = () => {
    if (isParamMap.difficulty === "normal") {
      return 0;
    } else if (isParamMap.difficulty === "hard") {
      return 1;
    } else {
      return 2;
    }
  };

  const testhandler2 = () => {
    const arr: number[] = [];
    for (
      let i: number = 0;
      i < selectRaidList.content[gateFilter].maxGate[testhandler()];
      i++
    ) {
      arr.push(i + 1);
    }

    return arr;
  };
  return (
    <div>
      <button onClick={() => console.log(isParamMap)}>123</button>
      <button
        onClick={() =>
          console.log(selectRaidList.content[gateFilter].maxGate[testhandler()])
        }
      >
        123
      </button>
      <button onClick={() => console.log(gateFilter)}>123</button>글 제목{" "}
      <input
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
        <DateTimePicker
          label="종료 시간을 선택해주세요."
          format="YYYY년 MM월 DD일 A HH시 mm분"
          defaultValue={null}
          slotProps={{
            textField: {
              size: "small",
            },
          }}
          onChange={(newValue) => {
            handleDateChange("EndDate", newValue);
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
        onChange={(e) => handleData("difficulty", e.target.value)}
      />{" "}
      Normal
      <input
        type="radio"
        name="RaidDiff"
        value="hard"
        onChange={(e) => handleData("difficulty", e.target.value)}
      />{" "}
      Hard
      <input
        type="radio"
        name="RaidDiff"
        value="extream"
        onChange={(e) => handleData("difficulty", e.target.value)}
      />{" "}
      Extream
      <br /> 레이드 종류
      <select
        onChange={(e) => {
          handleData("content", e.target.value);
          setGateFilter(e.target.selectedIndex);
        }}
      >
        {selectRaidList.content.map(
          (value: { id: number; name: string; maxGate: number[] }) => (
            <>
              <option key={value.id}>{value.name}</option>
            </>
          ),
        )}
      </select>{" "}
      <br />
      최소 관문
      <select onChange={(e) => handleData("minGate", e.target.value)}>
        {testhandler2().map((value: number, id: number) => (
          <option key={id}>{value}관문</option>
        ))}
      </select>
      ~ 최대 관문
      <select onChange={(e) => handleData("maxGate", e.target.value)}>
        {testhandler2().map((value: number, id: number) => (
          <option key={id}>{value}관문</option>
        ))}
      </select>
      <br />
      숙련도
      {handleSelect("proficiencyLevel", "proficiencyLevel", setIsParamMap)}
      카드
      {handleSelect("cardLevel", "card", setIsParamMap)}
      <br />
      세부사항 <br />
      <textarea
        aria-label="dkd"
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
