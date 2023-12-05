import React from "react";
import dayjs from "dayjs";
import "dayjs/locale/ko";

// components
import Badge from "@mui/material/Badge";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import { PickersDay, PickersDayProps } from "@mui/x-date-pickers/PickersDay";

interface ICustomDayProps extends PickersDayProps<dayjs.Dayjs> {
  highlighted?: string[];
}

const CustomDay = (props: ICustomDayProps) => {
  const selected = props.highlighted?.includes(props.day?.format("YYYY-MM-DD"));
  return (
    <Badge
      key={props.day?.format("YYYY-MM-DD")}
      variant="dot"
      overlap="circular"
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "left",
      }}
      sx={{
        "& .MuiBadge-badge": {
          display: selected ? "block" : "none",
          width: "4px",
          height: "4px",
          minWidth: "4px !important",
          minHeight: "4px !important",
          left: "50% !important",
          transform: "translateX(-50%) !important",
          backgroundColor: "red !important",
        },
      }}
    >
      <PickersDay
        {...props}
        sx={{
          backgroundColor: "transparent",
        }}
      />
    </Badge>
  );
};

interface ICalendarProps {
  date: dayjs.Dayjs | null;
  setDate: React.Dispatch<React.SetStateAction<dayjs.Dayjs | null>>;
  highlighted?: string[];
}

const Calendar = ({ date, setDate, highlighted = [] }: ICalendarProps) => {
  return (
    <LocalizationProvider adapterLocale="ko" dateAdapter={AdapterDayjs}>
      <DateCalendar
        defaultValue={dayjs()}
        showDaysOutsideCurrentMonth
        slots={{
          day: CustomDay,
        }}
        slotProps={{
          day: {
            highlighted,
          } as any,
        }}
        value={date}
        onChange={(newValue) => {
          setDate(newValue);
        }}
        sx={{
          backgroundColor: "transparent",
        }}
      />
    </LocalizationProvider>
  );
};

export default Calendar;
