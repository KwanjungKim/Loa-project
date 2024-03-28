import { IProps } from "@/hooks/useDetail";
import fetchUtils from "@/utils/fetchUtils";
import { useCallback, useEffect, useState } from "react";

const PartyMember = (props: {
  board_number: number;
  setUserName: React.Dispatch<React.SetStateAction<IProps>>;
}) => {
  const [partyMember, setPartyMember] = useState([]);

  const getPartyMember = useCallback(() => {
    const param = {
      board_number: props.board_number,
    };
    fetchUtils.post("/board/getPartyMember", param).then((res) => {
      if (!res.success) {
        alert(res.message);
      } else {
        setPartyMember(res.data.boardModel.member);
      }
    });
  }, [props]);

  useEffect(() => {
    getPartyMember();
  }, [getPartyMember]);

  return (
    <>
      <div
        style={{
          width: "400px",
          height: "100px",
        }}
      >
        <div>파티 멤버</div>
        {partyMember.map((value, i) => (
          <div
            key={i}
            onClick={() => props.setUserName({ character_name: value })}
            style={{
              border: "1px solid #fbc02d",
              width: "180px",
              height: "25px",
              float: "left",
            }}
          >
            {value}
          </div>
        ))}
      </div>
    </>
  );
};

export default PartyMember;
