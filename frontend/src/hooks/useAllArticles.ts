import { useCallback, useEffect, useRef, useState } from "react";
import { useSearchParams } from "react-router-dom";
import dayjs from "dayjs";

// libs
import { IBoard } from "@libs/types";

// utils
import fetchUtils from "@utils/fetchUtils";

// hooks
import useInfinteScroll from "@hooks/useInfiniteScroll";

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

const LIMIT = 10;

const initialListMap = new Map<number, IBoard[]>();

const useAllArticles = (type: IRaidType | "") => {
  const [listMap, setListMap] = useState<Map<number, IBoard[]>>(initialListMap);
  const [pageNo, setPageNo] = useState(0);
  const [searchParams, setSearchParams] = useSearchParams();
  const [status, setStatus] = useState<"idle" | "loading" | "error">("idle");
  const loadingRef = useRef(false);

  const getData = useCallback(async () => {
    if (pageNo < 0) return;
    if (loadingRef.current) return;
    loadingRef.current = true;
    setStatus("loading");
    const { data, success } = await fetchUtils.post("/board/getAllArticle", {
      raid_type: type,
      limit: LIMIT,
      offset: pageNo * LIMIT,
      proficiency: searchParams.get("proficiency") || "",
      raid_difficulty: searchParams.get("raid_difficulty") || "",
      raid_leader: searchParams.get("raid_leader") || "",
      startDate: searchParams.get("startDate") || dayjs().format("YYYY-MM-DD"),
      minGate: searchParams.get("minGate") || "",
      maxGate: searchParams.get("maxGate") || "",
      title: searchParams.get("title") || "",
    });
    if (
      !success ||
      !data ||
      !data.boardModelList ||
      data.boardModelList.length === 0
    ) {
      setPageNo(-1);
      setStatus("error");
    } else {
      console.log("Hihihih");
      setListMap((prev) => {
        const newMap = new Map<number, IBoard[]>();
        prev.forEach((value, key) => {
          newMap.set(key, value);
        });
        newMap.set(pageNo, data.boardModelList);
        return newMap;
      });
      setStatus("idle");
    }
    loadingRef.current = false;
  }, [pageNo, searchParams, type]);

  const list: IBoard[] = [];
  listMap.forEach((value, key) => {
    if (key < 0) return;
    list.push(...value);
  });

  useEffect(() => {
    if (loadingRef.current) return;
    getData();
  }, [getData]);

  function reset() {
    setListMap(initialListMap);
    setPageNo(0);
  }

  function handleSearchParams(params: {
    type: IRaidType | "";
    proficiency: IProficiency | "";
    raid_difficulty: IRaidDifficulty | "";
    raid_leader: string;
    startDate: string;
    minGate: "1" | "2" | "3" | "4" | "";
    maxGate: "1" | "2" | "3" | "4" | "";
    title: string;
  }) {
    setSearchParams({
      type: params.type,
      proficiency: params.proficiency,
      raid_difficulty: params.raid_difficulty,
      raid_leader: params.raid_leader,
      startDate: params.startDate,
      minGate: params.minGate,
      maxGate: params.maxGate,
      title: params.title,
    });
    reset();
  }

  function nextPage() {
    setPageNo((prev) => {
      if (prev >= 0) {
        return prev + 1;
      } else return prev;
    });
  }

  useInfinteScroll(nextPage);

  return {
    status,
    articles: list,
    handleSearchParams,
  };
};

export default useAllArticles;
