import { ICharData } from "../../atoms/MainCharacterData";

export interface IDetailData extends React.AllHTMLAttributes<HTMLDivElement> {
  MainCharacterData: ICharData;
}

const CharDetailDataView = ({ MainCharacterData }: IDetailData) => {
  return (
    <>
      <div>
        서버 : {MainCharacterData.ServerName} <br />
        캐릭터명 : {MainCharacterData.CharacterName}
        <br />
        클래스 : {MainCharacterData.CharacterClassName}
        <br />
        level : {MainCharacterData.ItemMaxLevel}
        <br />
        카드 :{" "}
        {Object.values(MainCharacterData.CardEffects).map((value, i) => (
          <>
            <div key={i} style={{ color: "#fbc02d" }}>
              {value.Name}
            </div>
            <div style={{ fontSize: "14px" }}> ■ {value.Description}</div>
          </>
        ))}
        보석 :
        {Object.values(MainCharacterData.ArmoryGemEffects).map((value, i) => (
          <>
            <div key={i} style={{ display: "inline-block", color: "#fbc02d" }}>
              <img
                src={value.Icon}
                style={{ width: "30px", height: "30px", borderRadius: "50px" }}
              />
              {value.Name}
            </div>
            : {value.Description} <br />
          </>
        ))}
        {Object.values(MainCharacterData.ArmoryGems).map((value, i) => (
          <>
            <img
              src={value.Icon}
              style={{ width: "30px", height: "30px", borderRadius: "50px" }}
            />
            <div key={i} dangerouslySetInnerHTML={{ __html: value.Name }}></div>
          </>
        ))}
        각인 :
        {Object.values(MainCharacterData.ArmoryEngraving).map((value, i) => (
          <div key={i}>
            <img
              src={value.Icon}
              style={{ width: "30px", height: "30px", borderRadius: "50px" }}
            />{" "}
            {value.Name} : {value.Description}
          </div>
        ))}
        <button onClick={() => console.log(MainCharacterData)}>123123</button>
      </div>
    </>
  );
};
export default CharDetailDataView;
