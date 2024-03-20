import React from "react";
import dayjs from "dayjs";

// styles
import styles from "./MyCalendarView.module.scss";

// hooks
import { IDate } from "@hooks/useMyArticles";

// libs
import { IBoard } from "@libs/types";

// components
import RaidList from "@components/Raid/RaidList";
import IconButton from "../buttons/IconButton";
import DirectionDownSvg from "../svgs/DirectionDownSvg";

export interface MyCalendarViewProps
  extends React.AllHTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

const MyCalendarView = function MyCalendarView({
  children,
  ...props
}: MyCalendarViewProps) {
  return (
    <div className={styles.wrapper} {...props}>
      {children}
    </div>
  );
};

export default MyCalendarView;

export interface MyCalendarViewDatesProps
  extends React.AllHTMLAttributes<HTMLDivElement> {
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
    <div className={styles.datesWrapper} {...props}>
      {/* <button onClick={handlePrevTurn}>prev</button> */}
      <IconButton onClick={handlePrevTurn}>
        <DirectionDownSvg type="left" />
      </IconButton>
      <div className={styles.dates}>
        {selectedDates.map((d) => (
          <Date key={d.date} handleSelectDate={handleSelectDate} date={d} />
        ))}
      </div>
      <IconButton onClick={handleNextTurn}>
        <DirectionDownSvg type="right" />
      </IconButton>
    </div>
  );
});

export interface MyCalendarViewListProps
  extends React.AllHTMLAttributes<HTMLDivElement> {
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
      <RaidList
        articles={listBySelectedDate}
        handleViewDetail={handleClickTitle}
      />
    </div>
  );
});

interface DateProps extends React.AllHTMLAttributes<HTMLDivElement> {
  handleSelectDate: (date: string) => void;
  date: IDate;
}

const Date = React.memo(function Date({
  handleSelectDate,
  date,
  ...props
}: DateProps) {
  return (
    <div {...props}>
      <div
        onClick={() => {
          handleSelectDate(date.date);
        }}
      >
        <div>
          {dayjs(date.date).date()}일
          {date.start ? ` (${dayjs(date.date).month()}월)` : ""}
        </div>
        {date.data.length > 0 && (
          <div>
            {date.data.map((item) => (
              <div key={item.board_number}>{item.raid_type}</div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
});
