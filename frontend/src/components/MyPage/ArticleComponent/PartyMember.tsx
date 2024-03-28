import { IProps } from "@/hooks/useDetail";

const PartyMember = (props: {
  member: string[];
  setUserName: React.Dispatch<React.SetStateAction<IProps>>;
}) => {
  return (
    <>
      <div
        style={{
          width: "320px",
          height: "25px",
        }}
      >
        <div>파티 멤버</div>
        {props.member.map((value, i) => (
          <div
            key={i}
            onClick={() => props.setUserName({ character_name: value })}
            style={{
              border: "1px solid #fbc02d",
              width: "160px",
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
