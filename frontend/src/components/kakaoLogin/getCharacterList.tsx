import { useEffect, useState } from "react";
import { IProfileData } from "../../hooks/useProfile";
import fetchUtils from "../../utils/fetchUtils";

interface Iprops extends React.AllHTMLAttributes<HTMLDivElement> {
  profileData: IProfileData | null;
}

const GetCharacterList = ({ profileData }: Iprops) => {
  const [charList, setCharList] = useState({});
  useEffect(() => {
    const paramMap = {
      user_number: profileData?.id.toString(),
    };
    fetchUtils.post("/user/getAllCharacters", paramMap).then((res) => {
      setCharList(res.data.characterModel);
    });
  }, [profileData?.id]);

  return (
    <>
      <select style={{ height: "40px", borderRadius: "5px" }}>
        {Object.entries(charList).map(([key, value]: any, i: any) => (
          <option key={i}>
            {key}. {"  "}
            {value.serverName} {value.character_name}
            Lv.{value.itemMaxLevel} {value.characterClassName}
          </option>
        ))}
      </select>
    </>
  );
};

export default GetCharacterList;
