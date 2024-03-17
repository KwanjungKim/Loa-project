import { mainCharState } from "@/atoms/mainCharacter";
import fetchUtils from "@/utils/fetchUtils";
import { useCallback, useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import Button from "../buttons/Button";
import { useNavigate } from "react-router-dom";
import dayjs from "dayjs";

const GetPostingRaid = () => {
  const navigate = useNavigate();
  const userNumber = useRecoilValue(mainCharState);
  const [raidData, setRaidData] = useState({});

  function handleViewDetail(value: any) {
    navigate(`/my-page/post/${value.board_number}`);
  }

  const getRaidData = useCallback(() => {
    const param = {
      user_number: userNumber.user_number,
      limit: "10",
      offset: "0",
      startDate: dayjs(),
    };

    fetchUtils.post("/board/getAllArticle", param).then((res) => {
      if (!res.success) {
        alert(res.message);
      } else {
        console.log("123", res);
        setRaidData(res.data.boardModelList);
      }
    });
  }, [userNumber.user_number]);

  useEffect(() => {
    getRaidData();
  }, [getRaidData]);

  return (
    <>
      <h2>내가 작성한 레이드</h2>

      {Object.values(raidData).map((value: any, i: number) => (
        <div
          key={i}
          style={{
            border: "solid 2px grey",
            borderRadius: "10px",
            display: "flex",
            marginBottom: "5px",
          }}
        >
          <div style={{ margin: "5px" }}>
            <p>
              {value.title}
              {"         "} 작성자 {value.raid_leader}{" "}
            </p>
            <p style={{ color: "grey", fontSize: "12px" }}>
              {value.raid_type} | {value.raid_difficulty} | {value.proficiency}{" "}
              | {value.minGate}-{value.maxGate}관문 | {value.startDate}
            </p>
          </div>
          <Button
            style={{
              justifyContent: "space-between",
              width: "90px",
              margin: "8px",
            }}
            onClick={() => {
              handleViewDetail(value);
            }}
          >
            상세보기
          </Button>
        </div>
      ))}
    </>
  );
};

export default GetPostingRaid;
