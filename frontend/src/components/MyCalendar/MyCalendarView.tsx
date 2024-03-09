import React, { AllHTMLAttributes } from "react";
import { IBoard, IDate } from "../../hooks/useMyArticles";
import dayjs from "dayjs";

export interface MyCalendarViewProps extends AllHTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

const MyCalendarView = function MyCalendarView({
  children,
  ...props
}: MyCalendarViewProps) {
  return <div {...props}>{children}</div>;
};

export default MyCalendarView;

export interface MyCalendarViewDatesProps
  extends AllHTMLAttributes<HTMLDivElement> {
  selectedDates: IDate[];
  handlePrevTurn: () => void;
  handleNextTurn: () => void;
  handleSelectDate: (date: string) => void;
}

MyCalendarView.Dates = React.memo(function Dates({
  selectedDates,
  handlePrevTurn,
  handleNextTurn,
  handleSelectDate,
  ...props
}: MyCalendarViewDatesProps) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
      }}
      {...props}
    >
      <button onClick={handlePrevTurn}>prev</button>
      {selectedDates.map((d) => (
        <div
          key={d.date}
          onClick={() => {
            handleSelectDate(d.date);
          }}
          style={{
            cursor: "pointer",
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
      <button onClick={handleNextTurn}>next</button>
    </div>
  );
});

export interface MyCalendarViewListProps
  extends AllHTMLAttributes<HTMLDivElement> {
  listBySelectedDate: IBoard[];
  handleClickTitle: (id: number) => void;
}

MyCalendarView.List = React.memo(function List({
  listBySelectedDate,
  handleClickTitle,
  ...props
}: MyCalendarViewListProps) {
  return (
    <div {...props}>
      {listBySelectedDate.length > 0 ? (
        listBySelectedDate.map((item) => (
          <div
            key={`${item.board_number}_${item.startDate}`}
            onClick={() => {
              handleClickTitle(item.board_number);
            }}
          >
            {item.title}
          </div>
        ))
      ) : (
        <div>no data</div>
      )}
    </div>
  );
});
