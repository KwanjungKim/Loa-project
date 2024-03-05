import { useCallback, useEffect, useState } from "react";
import fetchUtils from "../utils/fetchUtils";

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
type IRaidDifficulty = "노말" | "하드" | "익스트림";

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
  // const [limit, setLimit] = useState(10);
  const [pageNo, setPageNo] = useState(0);
  const [proficiency, setProficiency] = useState<IProficiency | "">("");
  const [raidDifficulty, setRaidDifficulty] = useState<IRaidDifficulty | "">(
    "",
  );
  const [raidLeader, setRaidLeader] = useState<string | "">("");
  const [startDate, setStartDate] = useState("");
  const [minGate, setMinGate] = useState("");

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
    setProficiency(prof || "");
    setRaidDifficulty(diff || "");
    setRaidLeader(leader || "");
    setStartDate(start || "");
    setMinGate(min || "");
    setList([]);
    setPageNo(0);
  }

  const getAricles = useCallback(async () => {
    if (pageNo < 0) {
      return;
    }

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
      if (data.boardModelList.length === 0) {
        setPageNo(-1);
      } else {
        setList(data.boardModelList);
      }
    } else {
      setList([]);
    }
  }, [pageNo, proficiency, raidDifficulty, raidLeader, startDate, minGate]);

  useEffect(() => {
    getAricles();
  }, [getAricles]);

  console.log(list);

  return {
    articles: list,
    nextPage,
    handleParams,
  };
};

export default useArticles;
