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
}

const useArticles = () => {
  const [limit, setLimit] = useState(10);
  const [pageNo, setPageNo] = useState(0);
  const [proficiency, setProficiency] = useState<IProficiency | "">("");
  const [raidDifficulty, setRaidDifficulty] = useState<IRaidDifficulty | "">(
    "",
  );
  const [raidLeader, setRaidLeader] = useState<string | "">("");
  const [list, setList] = useState<IBoard[]>([]);

  function nextPage() {
    setPageNo((prev) => {
      if (prev >= 0) {
        return prev + 1;
      } else return prev;
    });
  }

  function handleParams({
    prof,
    diff,
    leader,
  }: {
    prof?: IProficiency | "";
    diff?: IRaidDifficulty | "";
    leader?: string | "";
  }) {
    setProficiency(prof || "");
    setRaidDifficulty(diff || "");
    setRaidLeader(leader || "");
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

    const { data, success } = await fetchUtils.post(
      "/board/getAllArticle",
      params,
    );
    if (success) {
      setList(data.boardModelList);
    } else {
      setList([]);
    }
  }, [limit, pageNo, proficiency, raidDifficulty, raidLeader]);

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
