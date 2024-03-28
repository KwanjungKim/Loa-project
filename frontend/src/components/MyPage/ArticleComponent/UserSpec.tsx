const UserSpec = ({ userData }: any) => {
  return (
    <>
      <div>
        {userData.CharacterName}@{userData.ServerName} Lv.
        {userData.ItemMaxLevel}
      </div>
      <div style={{ display: "flex", flexDirection: "row" }}>
        <div>
          카드
          {Object.values(userData.CardEffects).map((value: any, i: number) => (
            <div key={i} style={{ color: "#fbc02d", width: "250px" }}>
              {value.Name}
            </div>
          ))}
          각인
          {Object.values(userData.ArmoryEngraving).map(
            (value: any, i: number) => (
              <div style={{ fontSize: "15px" }} key={i}>
                <img
                  src={value.Icon}
                  style={{
                    width: "25px",
                    height: "25px",
                    borderRadius: "50px",
                  }}
                />{" "}
                {value.Name}
              </div>
            ),
          )}
        </div>
        <div>
          보석
          {Object.values(userData.ArmoryGems).map((value: any, i: number) => (
            <div key={i} style={{ width: "160px", marginLeft: "-15px" }}>
              <img src={value.Icon} />
              <p dangerouslySetInnerHTML={{ __html: value.Name }} />
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default UserSpec;
