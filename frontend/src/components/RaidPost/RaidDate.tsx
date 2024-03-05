import { DateTimePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import { IparamMap } from "./RecruitmentPost";

export interface IDateTimePicker {
  setParamMap: React.Dispatch<React.SetStateAction<IparamMap>>;
}

const RaidDate = ({ setParamMap }: IDateTimePicker) => {
  const datePickerFormat = "YYYY-MM-DD HH:mm ";
  // startDate
  // date data => paramMap
  const handleDateChange = (str: string, date: dayjs.Dayjs | null) => {
    const formattedDate = dayjs(date).format(datePickerFormat);
    setParamMap((prev) => {
      return {
        ...prev,
        [str]: formattedDate,
      };
    });
  };
  return (
    <>
      <LocalizationProvider adapterLocale="ko" dateAdapter={AdapterDayjs}>
        <DateTimePicker
          format="YYYY년 MM월 DD일 A HH시 mm분"
          defaultValue={null}
          slotProps={{
            textField: {
              size: "small",
              required: true,
              label: "출발 시간을 선택해주세요.(필수)",
            },
          }}
          onChange={(newValue) => {
            handleDateChange("startDate", newValue);
          }}
          sx={{
            width: "355px",
            margin: "10px",
          }}
        />
      </LocalizationProvider>
    </>
  );
};

export default RaidDate;
