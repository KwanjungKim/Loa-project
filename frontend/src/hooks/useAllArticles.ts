import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import useSWR from "swr";
import { IBoard } from "../libs/types";
import fetchUtils from "../utils/fetchUtils";
import useInfinteScroll from "./useInfiniteScroll";

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

interface IData {
  success: boolean;
  message: string;
  data: {
    boardModelList: IBoard[];
    resultModel: {
      message: string;
      status: string;
    };
  };
}

const LIMIT = 10;

const initialListMap = new Map<number, IBoard[]>();

const useAllArticles = (type: IRaidType | "") => {
  const [listMap, setListMap] = useState<Map<number, IBoard[]>>(initialListMap);
  const [pageNo, setPageNo] = useState(0);
  const [searchParams, setSearchParams] = useSearchParams();

  const { data, isLoading } = useSWR<IData>(
    "/board/getAllArticle",
    (url: string) =>
      fetchUtils.post(url, {
        raid_type: type,
        limit: LIMIT,
        offset: pageNo * LIMIT,
        proficiency: searchParams.get("proficiency") || "",
        raid_difficulty: searchParams.get("raid_difficulty") || "",
        raid_leader: searchParams.get("raid_leader") || "",
        startDate: searchParams.get("startDate") || "",
        minGate: searchParams.get("minGate") || "",
        maxGate: searchParams.get("maxGate") || "",
        title: searchParams.get("title") || "",
      }),
  );

  const list: IBoard[] = [];
  listMap.forEach((value, key) => {
    if (key < 0) return;
    list.push(...value);
  });

  useEffect(() => {
    if (pageNo < 0) return;
    if (data && !isLoading) {
      const { boardModelList } = data.data;
      console.log("boardModelList", boardModelList, "pageNo", pageNo);

      if (boardModelList.length === 0) {
        setPageNo(-1);
        return;
      }

      if (boardModelList[0].offset !== pageNo * LIMIT) {
        return;
      }

      setListMap((prev) => {
        const newMap = new Map<number, IBoard[]>();
        prev.forEach((value, key) => {
          newMap.set(key, value);
        });
        newMap.set(pageNo, boardModelList);
        return newMap;
      });
    }
  }, [data, pageNo, isLoading]);

  /*
proficiency: searchParams.get("proficiency") || "",
        raid_difficulty: searchParams.get("raid_difficulty") || "",
        raid_leader: searchParams.get("raid_leader") || "",
        startDate: searchParams.get("startDate") || "",
        minGate: searchParams.get("minGate") || "",
        maxGate: searchParams.get("maxGate") || "",
  */

  function handleSearchParams(params: {
    type: IRaidType;
    prof: IProficiency;
    diff: IRaidDifficulty;
    leader: string;
    start: string;
    min: string;
    max: string;
  }) {
    setSearchParams({
      type: params.type,
      proficiency: params.prof,
      raid_difficulty: params.diff,
      raid_leader: params.leader,
      startDate: params.start,
      minGate: params.min,
      maxGate: params.max,
    });
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
    articles: list,
    handleSearchParams,
  };
};

export default useAllArticles;
