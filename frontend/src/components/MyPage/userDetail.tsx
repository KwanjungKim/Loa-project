const UserDetail = ({ userData }: any) => {
  return (
    <>
      <div>
        {userData.CharacterName}@{userData.ServerName} Lv.
        {userData.ItemMaxLevel}
      </div>
      <div>
        {Object.values(userData.CardEffects).map((value: any, i: number) => (
          <div key={i} style={{ color: "#fbc02d" }}>
            {value.Name}
          </div>
        ))}
        {Object.values(userData.ArmoryEngraving).map(
          (value: any, i: number) => (
            <div style={{ fontSize: "15px", display: "block" }} key={i}>
              <img
                src={value.Icon}
                style={{ width: "25px", height: "25px", borderRadius: "50px" }}
              />{" "}
              {value.Name}
            </div>
          ),
        )}
        {Object.values(userData.ArmoryGems).map((value: any, i: number) => (
          <div key={i} style={{ width: "25%" }}>
            <p dangerouslySetInnerHTML={{ __html: value.Name }} />
          </div>
        ))}
      </div>
    </>
  );
};

export default UserDetail;
