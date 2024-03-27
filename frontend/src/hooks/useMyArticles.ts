import { useCallback, useEffect, useMemo, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import dayjs from "dayjs";

// recoil
import { useRecoilValue } from "recoil";
import { mainCharState } from "../atoms/mainCharacter";

// utils
import fetchUtils from "../utils/fetchUtils";

// types
import { IBoard } from "../libs/types";

export interface IDate {
  date: string;
  start: boolean;
  data: IBoard[];
}

const dates: IDate[] = [];
let month: number = 0;

for (let i = 0; i < 30; i++) {
  const date = dayjs().add(i, "day");
  const m = date.month();
  const item = {
    date: dayjs().add(i, "day").format("YYYY-MM-DD"),
    start: m !== month,
    data: [],
  };
  dates.push(item);
  month = m;
}

// 7 items in one turn
const COUNT = 7;
const lastTurn = Math.floor(dates.length / COUNT);

const useMyArticles = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const isMainChar = useRecoilValue(mainCharState);
  const [isLoaded, setIsLoaded] = useState(false);
  const [dateList, setDateList] = useState<IDate[]>(dates);
  const [dateTurn, setDateTurn] = useState(0);
  const selectedDates = useMemo(
    () => dateList.slice(dateTurn * COUNT, dateTurn * COUNT + COUNT),
    [dateList, dateTurn],
  );
  const [selectedDate, setSelectedDate] = useState(
    searchParams.get("date") || "",
  );
  function handleSelectDate(date: string) {
    if (date.length === 0) return;
    setSelectedDate(date);
    setSearchParams({ date });
  }
  const listBySelectedDate = useMemo(
    () => dateList.find((d) => d.date === selectedDate)?.data || [],
    [dateList, selectedDate],
  );

  function handlePrevTurn() {
    setDateTurn((prev) => {
      if (prev > 0) {
        return prev - 1;
      } else {
        return lastTurn;
      }
    });
  }
  function handleNextTurn() {
    setDateTurn((prev) => {
      if (prev < lastTurn) {
        return prev + 1;
      } else {
        return 0;
      }
    });
  }

  const getData = useCallback(async () => {
    if (!isMainChar.user_number) {
      alert("로그인이 필요한 페이지입니다.");
      navigate("/");
      return;
    }
    const { data, success } = await fetchUtils.post("/board/getRaid", {
      user_number: isMainChar.user_number,
    });
    if (!success) return;
    if (!dateList) return;

    const tempList: { date: string; list: any[] }[] = [];

    data.boardModel.board_list.map((item: IBoard) => {
      const tempDate = dayjs(item.startDate).format("YYYY-MM-DD");
      const index = dateList.findIndex((d) => d.date === tempDate);

      if (index > -1) {
        const tFoundIndex = tempList.findIndex((d) => d.date === tempDate);
        if (tFoundIndex > -1) {
          tempList[tFoundIndex].list = [...tempList[tFoundIndex].list, item];
        } else {
          tempList.push({ date: tempDate, list: [item] });
        }
      }
    });

    if (tempList.length > 0) {
      tempList.map((item) => {
        setDateList((prev) => {
          const temp = prev.map((d) => {
            if (d.date === item.date) {
              return { ...d, data: item.list };
            } else {
              return d;
            }
          });
          return temp;
        });
      });
    }
    setIsLoaded(true);
  }, [isMainChar, dateList, navigate]);

  useEffect(() => {
    if (!isLoaded) getData();
  }, [getData, isLoaded]);

  useEffect(() => {
    const dateParam = searchParams.get("date") || "";
    if (dateParam.length > 0) {
      setSelectedDate(dateParam);
    }
  }, [searchParams]);

  return {
    handleNextTurn,
    handlePrevTurn,
    selectedDates,
    selectedDate,
    setSelectedDate,
    listBySelectedDate,
    handleSelectDate,
  };
};

export default useMyArticles;
