import { AllHTMLAttributes, ReactNode, memo } from "react";
import dayjs from "dayjs";

// styles
import styles from "./MyCalendarView.module.scss";

// hooks
import { IDate } from "@hooks/useMyArticles";

// libs
import { IBoard } from "@libs/types";

// components
import RaidList from "@components/Raid/RaidList";
import IconButton from "@components/buttons/IconButton";
import DirectionDownSvg from "@components/svgs/DirectionDownSvg";
import CardButton from "@components/buttons/CardButton";

export interface MyCalendarViewProps extends AllHTMLAttributes<HTMLDivElement> {
  children: ReactNode;
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
  extends AllHTMLAttributes<HTMLDivElement> {
  selectedDate: string;
  selectedDates: IDate[];
  handlePrevTurn: () => void;
  handleNextTurn: () => void;
  handleSelectDate: (date: string) => void;
}

MyCalendarView.Dates = memo(function Dates({
  selectedDates,
  selectedDate,
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
          <Date
            selectedDate={selectedDate}
            key={d.date}
            handleSelectDate={handleSelectDate}
            date={d}
          />
        ))}
      </div>
      <IconButton onClick={handleNextTurn}>
        <DirectionDownSvg type="right" />
      </IconButton>
    </div>
  );
});

export interface MyCalendarViewListProps
  extends AllHTMLAttributes<HTMLDivElement> {
  listBySelectedDate: IBoard[];
  handleClickTitle: (id: number) => void;
}

MyCalendarView.List = memo(function List({
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

interface DateProps extends AllHTMLAttributes<HTMLDivElement> {
  handleSelectDate: (date: string) => void;
  date: IDate;
  selectedDate: string;
}

const Date = function Date({
  selectedDate,
  handleSelectDate,
  date,
  ...props
}: DateProps) {
  // console.log(selectedDate, date.date);
  return (
    <div {...props} className={styles.dateWrapper}>
      <CardButton
        isSelected={selectedDate === date.date}
        // className={styles.date}
        onClick={() => {
          handleSelectDate(date.date);
        }}
      >
        <div className={styles.date}>
          {date.start && (
            <p className={styles.month}>{dayjs(date.date).month() + 1}월</p>
          )}
          <p className={styles.day}>{dayjs(date.date).date()}</p>
          {date.data.length > 0 && (
            <div className={styles.appointedRaids}>
              {date.data.slice(0, 3).map((item) => (
                <span key={item.board_number}>{item.raid_type}</span>
              ))}
            </div>
          )}
          {date.data.length > 0 && <div className={styles.appointedRaidsDot} />}
        </div>
      </CardButton>
    </div>
  );
};
