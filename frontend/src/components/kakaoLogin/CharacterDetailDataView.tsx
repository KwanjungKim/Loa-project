import { ICharProps } from "../../atoms/mainCharacter";

export interface IDetailData extends React.AllHTMLAttributes<HTMLDivElement> {
  isMainChar: ICharProps;
}

const CharDetailDataView = ({ isMainChar }: IDetailData) => {
  return (
    <>
      <div>
        서버 : {isMainChar.ServerName} <br />
        캐릭터명 : {isMainChar.CharacterName}
        <br />
        클래스 : {isMainChar.CharacterClassName}
        <br />
        level : {isMainChar.ItemMaxLevel}
        <br />
        카드 :{" "}
        {Object.values(isMainChar.CardEffects).map((value, i) => (
          <>
            <div key={i} style={{ color: "#fbc02d" }}>
              {value.Name}
            </div>
            <div style={{ fontSize: "14px" }}> ■ {value.Description}</div>
          </>
        ))}
        보석 :
        {Object.values(isMainChar.ArmoryGemEffects).map((value, i) => (
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
        {Object.values(isMainChar.ArmoryGems).map((value, i) => (
          <>
            <img
              src={value.Icon}
              style={{ width: "30px", height: "30px", borderRadius: "50px" }}
            />
            <div key={i} dangerouslySetInnerHTML={{ __html: value.Name }}></div>
          </>
        ))}
        각인 :
        {Object.values(isMainChar.ArmoryEngraving).map((value, i) => (
          <div key={i}>
            <img
              src={value.Icon}
              style={{ width: "30px", height: "30px", borderRadius: "50px" }}
            />{" "}
            {value.Name} : {value.Description}
          </div>
        ))}
        <button onClick={() => console.log(isMainChar)}>123123</button>
      </div>
    </>
  );
};
export default CharDetailDataView;
