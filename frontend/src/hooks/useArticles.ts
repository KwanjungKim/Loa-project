import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import fetchUtils from "../utils/fetchUtils";
import useInfinteScroll from "./useInfiniteScroll";
import { useSearchParams } from "react-router-dom";
import dayjs from "dayjs";

/*
filters

character_name - 검색창, string
proficiency
raid_type
raid_difiiculty
startDate
minGate
*/

/*
raid_type
발탄
비아키스
쿠크세이튼
아브렐슈드
일리아칸
카멘
에키드나
+ 상아탑
카양겔
*/

type IProficiency = "트라이" | "클경" | "반숙" | "숙련";
type IRaidDifficulty = "normal" | "hard" | "extreme";
type IRaidType =
  | "발탄"
  | "비아키스"
  | "쿠크세이튼"
  | "아브렐슈드"
  | "일리아칸"
  | "카멘"
  | "에키드나"
  | "상아탑"
  | "카양겔";

export interface IBoard {
  board_list: IBoard[] | null;
  board_number: number;
  card_level: string;
  character_name: string | null;
  content: string;
  maxGate: string;
  member: string[] | null;
  member_count: number;
  minGate: string;
  party_member: string[] | null;
  proficiency: IProficiency;
  raid_difficulty: IRaidDifficulty;
  raid_leader: string;
  raid_type: string;
  startDate: string;
  title: string;
  user_number: string;
}

interface Params {
  limit: number;
  offset: number;
  proficiency?: IProficiency;
  raid_difficulty?: IRaidDifficulty;
  raid_leader?: string;
  startDate?: string;
  minGate?: string;
  raid_type?: IRaidType;
}

const limit = 10;

const useArticles = (raidType?: IRaidType) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [isLoading, setIsLoading] = useState(false);
  const loadingRef = useRef<boolean>(false);

  const [pageNo, setPageNo] = useState(0);

  const [proficiency, setProficiency] = useState<IProficiency | "">(
    searchParams.get("proficiency") as IProficiency | "",
  );
  const [raidDifficulty, setRaidDifficulty] = useState<IRaidDifficulty | "">(
    searchParams.get("raid_difficulty") as IRaidDifficulty | "",
  );
  const [raidLeader, setRaidLeader] = useState<string | "">(
    searchParams.get("raid_leader") || "",
  );
  const [startDate, setStartDate] = useState(
    searchParams.get("startDate") || dayjs().format("YYYY-MM-DD"),
  );
  const [minGate, setMinGate] = useState(searchParams.get("minGate") || "");

  const [list, setList] = useState<IBoard[]>([]);

  const paramsMessage = useMemo(() => {
    if (
      !proficiency &&
      !raidDifficulty &&
      !raidLeader &&
      !startDate &&
      !minGate
    ) {
      return "전체";
    }
    let message = "";
    if (proficiency) {
      message += `${proficiency}`;
    }
    if (raidDifficulty) {
      if (message.length > 0) {
        message += " | ";
      }
      message += `${
        raidDifficulty === "normal"
          ? "노말"
          : raidDifficulty === "hard"
          ? "하드"
          : "익스트림"
      }`;
    }

    if (raidLeader) {
      if (message.length > 0) {
        message += " | ";
      }
      message += `${raidLeader}`;
    }

    if (startDate) {
      if (message.length > 0) {
        message += " | ";
      }
      message += `${dayjs(startDate).format("YYYY.MM.DD")} 이후`;
    }

    if (minGate) {
      if (message.length > 0) {
        message += " | ";
      }
      message += `${minGate}관문 이상`;
    }

    return message;
  }, [proficiency, raidDifficulty, raidLeader, startDate, minGate]);

  function nextPage() {
    setPageNo((prev) => {
      if (prev >= 0) {
        return prev + 1;
      } else return prev;
    });
  }

  function handleParams({
    prof = "",
    diff = "",
    leader = "",
    start = "",
    min = "",
  }: {
    prof?: IProficiency | "";
    diff?: IRaidDifficulty | "";
    leader?: string | "";
    start?: string;
    min?: string;
  }) {
    console.log(prof, diff, leader, start, min);
    console.log("heyey");
    setSearchParams({
      proficiency: prof || "",
      raid_difficulty: diff || "",
      raid_leader: leader || "",
      startDate: start || "",
      minGate: min || "",
    });
    setProficiency(prof || "");
    setRaidDifficulty(diff || "");
    setRaidLeader(leader || "");
    setStartDate(start || "");
    setMinGate(min || "");
    setPageNo(0);
  }

  const getAricles = useCallback(async () => {
    if (loadingRef.current) {
      return;
    }
    if (pageNo < 0) {
      return;
    }

    loadingRef.current = true;
    setIsLoading(true);

    const params: Params = {
      limit,
      offset: pageNo * limit,
    };

    if (proficiency) {
      params["proficiency"] = proficiency;
    }

    if (raidDifficulty) {
      params["raid_difficulty"] = raidDifficulty;
    }

    if (raidLeader) {
      params["raid_leader"] = raidLeader;
    }

    if (startDate) {
      params["startDate"] = startDate;
    }

    if (minGate) {
      params["minGate"] = minGate;
    }

    if (raidType) {
      params["raid_type"] = raidType;
    }

    const { data, success } = await fetchUtils.post(
      "/board/getAllArticle",
      params,
    );
    if (success) {
      if (pageNo === 0) {
        setList(data.boardModelList);
      } else {
        if (data.boardModelList.length === 0) {
          setPageNo(-1);
        } else {
          setList((prev) => [...prev, ...data.boardModelList]);
        }
      }
    } else {
      setList([]);
    }

    loadingRef.current = false;
    setIsLoading(false);
  }, [
    pageNo,
    proficiency,
    raidDifficulty,
    raidLeader,
    startDate,
    minGate,
    raidType,
  ]);

  useEffect(() => {
    getAricles();
  }, [getAricles]);

  console.log(list);

  useInfinteScroll(nextPage);

  return {
    articles: list,
    isLoading,
    pageNo,
    paramsMessage,
    nextPage,
    handleParams,
  };
};

export default useArticles;
