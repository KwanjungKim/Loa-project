import { useRecoilValue } from "recoil";
import fetchUtils from "../../utils/fetchUtils";
import { mainCharState } from "../../atoms/mainCharacter";
import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import Button from "../buttons/Button";

const GetRaid = () => {
  const navigate = useNavigate();
  const userNumber = useRecoilValue(mainCharState);
  const [raidData, setRaidData] = useState({});

  function handleViewDetail(value: any) {
    navigate(`/my-page/${value.board_number}`, { state: value });
  }
  const getRaidData = useCallback(() => {
    const param = {
      user_number: userNumber.user_number,
      application_status: "수락 대기 중",
    };

    fetchUtils.post("/board/getRaidOnQue", param).then((res) => {
      if (!res.success) {
        alert(res.message);
      } else {
        setRaidData(res.data.boardModel.board_list);
      }
    });
  }, [userNumber.user_number]);
  useEffect(() => {
    getRaidData();
  }, [getRaidData]);
  return (
    <>
      <h2>내가 신청 중인 레이드</h2>
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
            <p>{value.title} </p>
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

export default GetRaid;
