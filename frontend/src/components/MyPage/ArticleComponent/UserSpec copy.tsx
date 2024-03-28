import useDetail, { IProps } from "@/hooks/useDetail";
import { useEffect } from "react";
import styled from "styled-components";

const UserSpec = (props: { userName: IProps }) => {
  const { userData } = useDetail(props.userName);

  useEffect(() => {
    props.userName;
  }, [props.userName]);
  return (
    <div>
      <div>
        {userData.CharacterName}@{userData.ServerName} Lv.
        {userData.ItemMaxLevel}
      </div>

      {userData.ArmoryGems[0] ? (
        <p>보석</p>
      ) : (
        <>
          <p>보석</p>
          <p style={{ color: "grey", fontSize: "12px" }}>
            장착중인 보석이 없어요..
          </p>
        </>
      )}
      <div style={{ display: "flex" }}>
        {Object.values(userData.ArmoryGems).map((value: any, i: number) => (
          <div
            key={i}
            style={{
              width: "32px",
              marginLeft: "0px",
            }}
          >
            <Img
              src={value.Gem.Icon}
              style={{ width: "28px", border: "solid 1px grey" }}
            />
            <ArrowBox className="arrow_box">
              <div style={{ padding: "10px" }}>
                <p
                  style={{ fontSize: "15px" }}
                  dangerouslySetInnerHTML={{
                    __html: value.Gem.Name,
                  }}
                />
                <div style={{ display: "flex" }}>
                  <p
                    style={{
                      color: "orange",
                      display: "flex",
                      fontSize: "13px",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    {value.Effect.Name}
                  </p>

                  <p
                    style={{
                      color: "black",
                      fontSize: "12px",
                      marginLeft: "10px",
                    }}
                  >
                    {value.Effect.Description}
                  </p>
                </div>
              </div>
            </ArrowBox>
          </div>
        ))}
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          width: "450px",
        }}
      >
        <div>
          {userData.CardEffects[0] ? (
            <p>카드</p>
          ) : (
            <>
              <p>카드</p>
              <p style={{ color: "grey", fontSize: "12px" }}>
                장착중인 카드가 없어요..
              </p>
            </>
          )}
          {Object.values(userData.CardEffects).map((value: any, i: number) => (
            <div
              key={i}
              title={value.Description}
              style={{
                fontSize: "12px",
                color: "#fbc02d",
                width: "230px",
                flexDirection: "row",
              }}
            >
              {value.Name}
            </div>
          ))}
        </div>
        <div>
          {Object.keys(userData.ArmoryEngraving).length > 0 ? (
            <p>각인</p>
          ) : (
            <>
              <p>각인</p>
              <p style={{ color: "grey", fontSize: "12px" }}>
                장착중인 각인이 없어요..
              </p>
            </>
          )}
          {Object.values(userData.ArmoryEngraving).map(
            (value: any, i: number) => (
              <div
                title={value.Description}
                style={{ fontSize: "12px" }}
                key={i}
              >
                <img
                  src={value.Icon}
                  style={{
                    width: "20px",
                    height: "20px",
                    borderRadius: "50px",
                  }}
                />{" "}
                {value.Name}
              </div>
            ),
          )}
        </div>
      </div>
    </div>
  );
};

export default UserSpec;

const ArrowBox = styled.div`
  display: none;
  background-color: white;
  width: 250px;
  height: 70px;
  border-radius: 5px;
  position: absolute;
`;

const Img = styled.img`
  &:hover + ${ArrowBox} {
    display: block;
  }
`;
