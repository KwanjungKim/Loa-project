import React, { useState } from "react";

import { useRecoilValue } from "recoil";
import { mainCharState } from "../../atoms/mainCharacter";

import { DateTimePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import { selectList, selectRaidType } from "./saraminData";
import fetchUtils from "../../utils/fetchUtils";
import { SubmitHandler, useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

interface FormValue {
  title: string;
  raid_difficulty: string;
  gate?: number;
}
type IparamMap = {
  title: string; //  글제목
  content: string; // 글 내용
  user_number: string | undefined; // 유저넘버
  character_name: string | undefined; // 글쓴이
  raid_leader: string | undefined; // 레이드 공대장
  raid_difficulty: string; // 레이드 난이도
  raid_type: string; // 레이드 타입
  proficiency: string; // 숙련도
  minGate: number; // 최소 관문
  maxGate: number; // 최대 관문
  card_level: string; // 카드 레벨
  startDate: string; // 출발 시간
  member: string[];
};

interface ISelectProps {
  str: string;
  setParamMap: React.Dispatch<React.SetStateAction<IparamMap>>;
}

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
      <select onChange={(e) => handleData(str, e.target.value)}>
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

const TestSaramIn = () => {
  const mainCharacter = useRecoilValue(mainCharState);
  const datePickerFormat = "YYYY-MM-DD HH:mm";
  const [characterName, setCharacterName] = useState<string>("");
  const [Gate, setGate] = useState<number>(0);

  const defaultParamMap: IparamMap = {
    title: "",
    content: "",
    user_number: mainCharacter.user_number,
    character_name: mainCharacter.character_name,
    raid_leader: mainCharacter.character_name,
    raid_difficulty: "",
    raid_type: "발탄",
    proficiency: "트라이",
    minGate: 1,
    maxGate: 1,
    card_level: "조건 없음",
    startDate: "",
    member: [mainCharacter.character_name],
  };
  const [paramMap, setParamMap] = useState<IparamMap>(defaultParamMap);

  // title, diff, raid type, gate, content
  // input data => paramMap
  const handleData = (data: string, e: any) => {
    setParamMap((prev) => {
      return {
        ...prev,
        [data]: e,
      };
    });
  };

  // startDate
  // date data => paramMap
  const handleDateChange = (str: string, date: dayjs.Dayjs | null) => {
    const formattedDate = dayjs(date).format(datePickerFormat);
    setParamMap((prev) => {
      return {
        ...prev,
        [str]: formattedDate,
      };
    });
  };

  const difficultyFilter =
    paramMap.raid_difficulty === "normal"
      ? 0
      : paramMap.raid_difficulty === "hard"
      ? 1
      : 2;

  const gateFilter = () => {
    const arr: number[] = [];
    for (
      let i: number = 0;
      i < selectRaidType.raidtype[Gate].maxGate[difficultyFilter];
      i++
    ) {
      arr.push(i + 1);
    }

    return arr;
  };

  // add member
  const getCharacter = () => {
    const params = {
      character_name: characterName,
    };
    if (!paramMap.member.includes(characterName)) {
      if (paramMap.member.length < 8) {
        fetchUtils.post("/user/getCharacter", params).then((res) => {
          if (!res.success) {
            alert(`${res.message}`);
          } else {
            setParamMap((prev) => {
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
    fetchUtils.post("/board/addArticle", paramMap).then((res) => {
      if (!res.success) {
        alert(res.message);
      } else {
        alert(res.message);
      }
    });
  };

  const schema = yup.object().shape({
    title: yup.string().required("제목을 입력해주세요,"),
    raid_difficulty: yup.string().required("레이드 난이도를 선택해주세요."),
    gate: yup
      .number()
      .min(paramMap.minGate, "최대관문이 최소관문보다 낮습니다."),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValue>({
    mode: "onChange",
    reValidateMode: "onChange",
    resolver: yupResolver(schema),
  });

  const onSubmitHandler: SubmitHandler<FormValue> = () => {
    addArticle();
  };
  return (
    <>
      <button onClick={() => console.log(paramMap)}>123</button>
      <form onSubmit={handleSubmit(onSubmitHandler)}>
        <input
          placeholder="제목을 입력해주세요."
          type="text"
          maxLength={50}
          {...register("title")}
          onChange={(e) => handleData("title", e.target.value)}
        />
        <p>{errors.title?.message}</p> <br />
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
          value="normal"
          {...register("raid_difficulty")}
          onChange={(e) => handleData("raid_difficulty", e.target.value)}
        />{" "}
        Normal
        <input
          type="radio"
          value="hard"
          {...register("raid_difficulty")}
          onChange={(e) => handleData("raid_difficulty", e.target.value)}
        />{" "}
        Hard
        <input
          type="radio"
          value="extream"
          {...register("raid_difficulty")}
          onChange={(e) => handleData("raid_difficulty", e.target.value)}
        />{" "}
        Extream
        {errors.raid_difficulty?.message}
        <br />
        레이드 종류
        <select
          onChange={(e) => {
            handleData("raid_type", e.target.value);
            setGate(e.target.selectedIndex);
          }}
        >
          {selectRaidType.raidtype.map((value) => (
            <>
              <option key={value.id}>{value.name}</option>
            </>
          ))}
        </select>{" "}
        <br />
        최소
        <select onChange={(e) => handleData("minGate", e.target.value)}>
          {gateFilter().map((value: number, id: number) => (
            <option key={id}>{value}</option>
          ))}
        </select>
        관문 ~ 최대
        <select
          {...register("gate")}
          onChange={(e) => handleData("maxGate", e.target.value)}
        >
          {gateFilter().map((value: number, id: number) => (
            <option key={id}>{value}</option>
          ))}
        </select>
        관문 <br />
        {errors.gate?.message}
        <br />
        숙련도
        <HandleSelect str={"proficiency"} setParamMap={setParamMap} />
        카드
        <HandleSelect str={"card_level"} setParamMap={setParamMap} />
        <br />
        세부사항 <br />
        <textarea
          placeholder="세부사항을 적어주세요."
          style={{ width: "400px", height: "300px", resize: "none" }}
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
        <input onChange={(e) => setCharacterName(e.target.value)} />
        <button onClick={() => getCharacter()}>getCharacter</button>
        <br />
        <div>
          <input type="submit" value={"글작성"} />
        </div>
      </form>
    </>
  );
};

export default TestSaramIn;
