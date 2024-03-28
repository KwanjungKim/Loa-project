import dayjs from "dayjs";
import { useForm } from "react-hook-form";

// libs
import { IBoard } from "@libs/types";

// components
import Spinner from "@components/common/Spinner";
import Button from "@components/buttons/Button";
import Input from "@components/inputs/Input";
import IconButton from "@components/buttons/IconButton";
import CardButton from "@components/buttons/CardButton";
import RaidList from "@components/Raid/RaidList";

// svgs
import AvatarSvg from "@components/svgs/AvatarSvg";
import AdvertiseSvg from "@components/svgs/AdvertiseSvg";
import BurgerSvg from "@components/svgs/BurgerSvg";
import CommentSvg from "@components/svgs/CommentSvg";
import DirectionDownSvg from "@components/svgs/DirectionDownSvg";
import GamingSvg from "@components/svgs/GamingSvg";
import HomeSvg from "@components/svgs/HomeSvg";
import NightSvg from "@components/svgs/NightSvg";
import ReadingSvg from "@components/svgs/ReadingSvg";
import SearchSvg from "@components/svgs/SearchSvg";
import SettingSvg from "@components/svgs/SettingSvg";

type FormValues = {
  text: string;
  date: string;
  time: string;
};

const Home = () => {
  const initialDate = dayjs().format("YYYY-MM-DD");
  const initialTime = dayjs().add(30, "minutes").format("HH:mm");
  const { register, handleSubmit } = useForm({
    defaultValues: {
      text: "",
      date: initialDate,
      time: initialTime,
    },
  });

  const dummyArticles: IBoard[] = [
    {
      board_list: null,
      board_number: 1,
      card_level: "1",
      character_name: "캐릭터 이름",
      content: "내용",
      limit: 4,
      maxGate: "4",
      member: ["멤버1", "멤버2"],
      member_count: 2,
      mention: "멘션",
      minGate: "1",
      offset: 0,
      party_member: "파티 멤버",
      proficiency: "숙련",
      raid_difficulty: "normal",
      raid_leader: "레이드 리더",
      raid_type: "발탄",
      startDate: dayjs().format("YYYY-MM-DD HH:mm"),
      title: "타이틀",
      user_number: "유저 넘버",
    },
    {
      board_list: null,
      board_number: 2,
      card_level: "2",
      character_name: "캐릭터 이름",
      content: "내용",
      limit: 4,
      maxGate: "4",
      member: ["멤버1", "멤버2"],
      member_count: 2,
      mention: "멘션",
      minGate: "1",
      offset: 0,
      party_member: "파티 멤버",
      proficiency: "숙련",
      raid_difficulty: "normal",
      raid_leader: "레이드 리더",
      raid_type: "발탄",
      startDate: dayjs().format("YYYY-MM-DD HH:mm"),
      title: "타이틀",
      user_number: "유저 넘버",
    },
    {
      board_list: null,
      board_number: 3,
      card_level: "2",
      character_name: "캐릭터 이름",
      content: "내용",
      limit: 4,
      maxGate: "4",
      member: ["멤버1", "멤버2"],
      member_count: 2,
      mention: "멘션",
      minGate: "1",
      offset: 0,
      party_member: "파티 멤버",
      proficiency: "숙련",
      raid_difficulty: "normal",
      raid_leader: "레이드 리더",
      raid_type: "발탄",
      startDate: dayjs().format("YYYY-MM-DD HH:mm"),
      title: "타이틀",
      user_number: "유저 넘버",
    },
  ];

  function handleViewDetail(number: number) {
    console.log(number);
    return;
  }

  function onSubmit(data: FormValues) {
    console.log(data);
    const dateInput = data.date + " " + data.time;
    const isBeforeNow = dayjs(dateInput).isBefore(dayjs());
    console.log(isBeforeNow);
    if (isBeforeNow) {
      alert("현재 시간 이전입니다.");
      return;
    }
    alert(`text: ${data.text}, date: ${dateInput}`);
  }

  return (
    <div
      style={{
        width: "100%",
      }}
    >
      <div
        style={{
          width: "100%",
          display: "flex",
          flexDirection: "column",
          gap: "8px",
        }}
      >
        <Spinner />
        <Button.Brand>브랜드버튼 크게</Button.Brand>
        <Button.Brand isSmall>브랜드버튼 작게</Button.Brand>
        <Button.Default>디폴트버튼 크게</Button.Default>
        <Button.Default isSmall>디폴트버튼 작게</Button.Default>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            console.log("제출버튼 클릭");
            handleSubmit(onSubmit)();
          }}
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "4px",
          }}
        >
          <Input type="text" placeholder="인풋" {...register("text")} />
          <Input
            type="date"
            min={dayjs().format("YYYY-MM-DD")}
            {...register("date", {
              setValueAs: (value) => {
                return dayjs(value).format("YYYY-MM-DD");
              },
            })}
          />
          <Input type="time" {...register("time")} />
          <Button.Brand isSmall type="submit">
            제출버튼
          </Button.Brand>
        </form>
        <div>
          <p>아이콘 버튼</p>
          <div
            style={{
              width: "100%",
              display: "grid",
              gridTemplateColumns: "repeat(4, 1fr)",
            }}
          >
            <IconButton>
              <AvatarSvg />
            </IconButton>
            <IconButton>
              <AdvertiseSvg />
            </IconButton>
            <IconButton>
              <BurgerSvg />
            </IconButton>
            <IconButton>
              <CommentSvg />
            </IconButton>
            <IconButton>
              <DirectionDownSvg type="top" />
            </IconButton>
            <IconButton>
              <GamingSvg />
            </IconButton>
            <IconButton>
              <HomeSvg />
            </IconButton>
            <IconButton>
              <NightSvg />
            </IconButton>
            <IconButton>
              <ReadingSvg />
            </IconButton>
            <IconButton>
              <SearchSvg />
            </IconButton>
            <IconButton>
              <SettingSvg />
            </IconButton>
          </div>
        </div>
        <div>
          <p>카드 버튼</p>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(2, 75px)",
              height: "100px",
              columnGap: "8px",
            }}
          >
            <CardButton isSelected={true}>
              <div>
                <p>카드 버튼 (선택됨)</p>
              </div>
            </CardButton>
            <CardButton isSelected={false}>
              <div>
                <p>카드 버튼 (선택되지 않음)</p>
              </div>
            </CardButton>
          </div>
        </div>
        <div>
          <p>레이드 리스트</p>
          <div>
            <RaidList
              articles={dummyArticles}
              handleViewDetail={handleViewDetail}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
