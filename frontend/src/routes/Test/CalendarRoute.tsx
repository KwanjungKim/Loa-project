import React from "react";
import dayjs from "dayjs";
import "dayjs/locale/ko";

// components
import Calendar from "../../components/common/Calendar";

const CalendarRoute = () => {
  const highlighted = ["2021-10-01", "2021-10-02", "2021-10-03", "2023-11-27"];
  const today = dayjs();
  const [value, setValue] = React.useState<dayjs.Dayjs | null>(today);

  return (
    <div>
      {value?.format("YYYY-MM-DD")}
      <Calendar date={value} setDate={setValue} highlighted={highlighted} />
    </div>
  );
};

export default CalendarRoute;
