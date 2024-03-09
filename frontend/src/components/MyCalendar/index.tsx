import { useCallback, useEffect, useState } from "react";
import dayjs from "dayjs";
import { useRecoilValue } from "recoil";
import { mainCharState } from "../../atoms/mainCharacter";
import fetchUtils from "../../utils/fetchUtils";

// import Calendar from "../common/Calendar";
// import dayjs from "dayjs";

interface IDate {
  date: string;
  start: boolean;
  data: any[];
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
const lastTurn = Math.floor(dates.length / 7);
// console.log("lastTurn", lastTurn);

const MyCalendar = () => {
  /*
  const highlighted: string[] = [];
  const [date, setDate] = useState<dayjs.Dayjs | null>(null);
  */
  const [isLoaded, setIsLoaded] = useState(false);
  const [dateList, setDateList] = useState<IDate[]>(dates);
  console.log("dateList", dateList);
  const isMainChar = useRecoilValue(mainCharState);
  const [dateTurn, setDateTurn] = useState(0);

  const selectedDates = dateList.slice(dateTurn * 7, dateTurn * 7 + 7);
  const [selectedDate, setSelectedDate] = useState("");
  console.log("selectedDate", selectedDate);

  const getData = useCallback(async () => {
    if (!isMainChar.user_number) return;
    const { data, success } = await fetchUtils.post("/board/getRaid", {
      user_number: isMainChar.user_number,
    });
    if (!success) return;
    if (!dateList) return;
    console.log("data", data);
    const tempList: { date: string; list: any[] }[] = [];
    console.log(dateList);
    data.boardModel.board_list.map((item: any) => {
      const tempDate = dayjs(item.startDate).format("YYYY-MM-DD");
      const index = dateList.findIndex((d) => d.date === tempDate);
      console.log(index);
      if (index > -1) {
        const tFoundIndex = tempList.findIndex((d) => d.date === tempDate);
        if (tFoundIndex > -1) {
          tempList[tFoundIndex].list = [...tempList[tFoundIndex].list, item];
        } else {
          tempList.push({ date: tempDate, list: [item] });
        }
      }
    });
    console.log("temp list", tempList);
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
  }, [isMainChar, dateList]);

  useEffect(() => {
    if (!isLoaded) getData();
  }, [getData, isLoaded]);

  return (
    // <div>
    //   <Calendar date={date} setDate={setDate} highlighted={highlighted} />
    // </div>
    <div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
        }}
      >
        <button
          onClick={() => {
            setDateTurn((prev) => {
              if (prev > 0) {
                return prev - 1;
              } else {
                return lastTurn;
              }
            });
          }}
        >
          minus
        </button>
        {selectedDates.map((d) => (
          <div
            key={d.date}
            onClick={() => {
              setSelectedDate(d.date);
            }}
          >
            <div>
              {dayjs(d.date).date()}일
              {d.start ? ` (${dayjs(d.date).month()}월)` : ""}
            </div>
            {d.data.length > 0 && (
              <div>
                {d.data.map((item) => (
                  <div key={item.board_number}>{item.raid_type}</div>
                ))}
              </div>
            )}
          </div>
        ))}
        <button
          onClick={() => {
            setDateTurn((prev) => {
              if (prev < lastTurn) {
                return prev + 1;
              } else {
                return 0;
              }
            });
          }}
        >
          plus
        </button>
      </div>
      <div>
        {selectedDate && (
          <div>
            {dateList
              .find((d) => d.date === selectedDate)
              ?.data.map((item) => (
                <div key={`${item.board_number}_${item.startDate}`}>
                  {item.title}
                </div>
              ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyCalendar;
