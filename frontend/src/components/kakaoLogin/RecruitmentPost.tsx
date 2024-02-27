import React, { useState } from "react";

import { useRecoilValue } from "recoil";
import { mainCharState } from "../../atoms/mainCharacter";

// import dayjs from "dayjs";
import { selectRaidType } from "./raidData";
import fetchUtils from "../../utils/fetchUtils";
import { SubmitHandler, useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import RecruitmentPostView, {
  IRecruitmentPostViewProps,
} from "./RecruitmentPostView";

export interface FormValue {
  title: string;
  raid_difficulty: string;
  gate?: number;
}
export type IparamMap = {
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

export interface ISelectProps {
  str: string;
  setParamMap: React.Dispatch<React.SetStateAction<IparamMap>>;
}

const RecruitmentPost = () => {
  const mainCharacter = useRecoilValue(mainCharState);
  // const datePickerFormat = "YYYY-MM-DD HH:mm";
  const [characterName, setCharacterName] = useState<string>("");
  const [Gate, setGate] = useState<number>(0);

  const defaultParamMap: IparamMap = {
    title: "",
    content: "",
    user_number: mainCharacter.user_number,
    character_name: mainCharacter.character_name,
    raid_leader: mainCharacter.character_name,
    raid_difficulty: "normal",
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
  // const handleDateChange = (str: string, date: dayjs.Dayjs | null) => {
  // const handleDateChange = (str: string, e: any) => {
  //   const formattedDate = dayjs(e).format(datePickerFormat);
  //   setParamMap((prev) => {
  //     return {
  //       ...prev,
  //       [str]: formattedDate,
  //     };
  //   });
  // };

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
    title: yup.string().required("제목을 입력해주세요."),
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
    mode: "onSubmit",
    reValidateMode: "onChange",
    resolver: yupResolver(schema),
  });

  const onSubmitHandler: SubmitHandler<FormValue> = () => {
    addArticle();
  };

  const RecruitmentPostViewProps: IRecruitmentPostViewProps = {
    handleData,
    paramMap,
    register,
    handleSubmit,
    errors,
    onSubmitHandler,
    getCharacter,
    gateFilter,
    // handleDateChange,
    setParamMap,
    setGate,
    setCharacterName,
    selectRaidType,
  };

  return <RecruitmentPostView {...RecruitmentPostViewProps} />;
};

export default RecruitmentPost;
