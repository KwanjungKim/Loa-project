import dayjs from "dayjs";

// libs
import { IBoard } from "@libs/types";

// components
import Spinner from "@components/common/Spinner";
import Button from "@components/buttons/Button";
import Input from "@components/inputs/Input";
import IconButton from "@components/buttons/IconButton";
import AvatarSvg from "@components/svgs/AvatarSvg";
import CardButton from "@components/buttons/CardButton";
import RaidList from "@components/Raid/RaidList";

const Home = () => {
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
  ];

  function handleViewDetail(number: number) {
    console.log(number);
    return;
  }
  return (
    <div>
      <h2>home</h2>
      <div
        style={{
          width: "280px",
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
        <Input type="text" placeholder="인풋" />
        <Input type="date" min={dayjs().format("YYYY-MM-DD")} />
        <Input type="time" />
        <div>
          <p>아이콘 버튼</p>
          <IconButton>
            <AvatarSvg />
          </IconButton>
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
