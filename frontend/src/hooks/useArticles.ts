import { useCallback, useEffect, useRef, useState } from "react";
import fetchUtils from "../utils/fetchUtils";
import useInfinteScroll from "./useInfiniteScroll";
import { useSearchParams } from "react-router-dom";

/*
filters

character_name - 검색창, string
proficiency
raid_type
raid_difiiculty
startDate
minGate
*/

type IProficiency = "트라이" | "클경" | "반숙" | "숙련";
type IRaidDifficulty = "normal" | "hard" | "extreme";

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
}

const limit = 10;

const useArticles = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [isLoading, setIsLoading] = useState(false);
  const loadingRef = useRef<boolean>(false);

  // const [limit, setLimit] = useState(10);
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
    searchParams.get("startDate") || "",
  );
  const [minGate, setMinGate] = useState(searchParams.get("minGate") || "");

  const [list, setList] = useState<IBoard[]>([]);

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

      // if (data.boardModelList.length === 0) {
      //   setPageNo(-1);
      // } else {
      //   if (pageNo === 0) {
      //     setList(data.boardModelList);
      //   } else {
      //     setList((prev) => [...prev, ...data.boardModelList]);
      //   }
      // }
    } else {
      setList([]);
    }

    loadingRef.current = false;
    setIsLoading(false);
  }, [pageNo, proficiency, raidDifficulty, raidLeader, startDate, minGate]);

  useEffect(() => {
    getAricles();
  }, [getAricles]);

  console.log(list);

  useInfinteScroll(nextPage);

  return {
    articles: list,
    isLoading,
    pageNo,
    nextPage,
    handleParams,
  };
};

export default useArticles;
