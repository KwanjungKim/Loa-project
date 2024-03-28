import { useCallback, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import useMyArticles from "../../hooks/useMyArticles";
import MyCalendarView, {
  MyCalendarViewDatesProps,
  MyCalendarViewListProps,
} from "./MyCalendarView";

const MyCalendar = () => {
  const navigate = useNavigate();

  const {
    handleNextTurn,
    handlePrevTurn,
    selectedDates,
    listBySelectedDate,
    handleSelectDate,
    selectedDate,
    dateTurn,
    lastTurn,
  } = useMyArticles();

  const handleClickTitle = useCallback(
    (id: number) => {
      navigate(`/raid/${id}`);
    },
    [navigate],
  );

  const isFirstTurn = useMemo(() => {
    return dateTurn === 0;
  }, [dateTurn]);

  const isLastTurn = useMemo(() => {
    return dateTurn === lastTurn;
  }, [dateTurn, lastTurn]);

  const myCalendarViewDatesProps: MyCalendarViewDatesProps = useMemo(
    () => ({
      selectedDate,
      selectedDates,
      isFirstTurn,
      isLastTurn,
      handlePrevTurn,
      handleNextTurn,
      handleSelectDate,
    }),
    [
      selectedDate,
      selectedDates,
      isFirstTurn,
      isLastTurn,
      handlePrevTurn,
      handleNextTurn,
      handleSelectDate,
    ],
  );

  const myCalendarViewListProps: MyCalendarViewListProps = useMemo(
    () => ({
      listBySelectedDate,
      handleClickTitle,
    }),
    [listBySelectedDate, handleClickTitle],
  );

  return (
    <MyCalendarView>
      <MyCalendarView.Dates {...myCalendarViewDatesProps} />
      <MyCalendarView.List {...myCalendarViewListProps} />
    </MyCalendarView>
  );
};

export default MyCalendar;
