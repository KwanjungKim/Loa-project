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
  } = useMyArticles();

  const handleClickTitle = useCallback(
    (id: number) => {
      navigate(`/raid/${id}`);
    },
    [navigate],
  );

  const myCalendarViewDatesProps: MyCalendarViewDatesProps = useMemo(
    () => ({
      selectedDate,
      selectedDates,
      handlePrevTurn,
      handleNextTurn,
      handleSelectDate,
    }),
    [
      selectedDate,
      selectedDates,
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
