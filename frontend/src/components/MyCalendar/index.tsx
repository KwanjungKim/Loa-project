import { useState } from "react";
import Calendar from "../common/Calendar";
import dayjs from "dayjs";

const MyCalendar = () => {
  const highlighted: string[] = [];
  const [date, setDate] = useState<dayjs.Dayjs | null>(null);

  return (
    <div>
      <Calendar date={date} setDate={setDate} highlighted={highlighted} />
    </div>
  );
};

export default MyCalendar;
