import axios from "axios";
import fetchUtils from "../../utils/fetchUtils";

const CharacterCheck = () => {
  const paramMap = {
    user_number: profileData?.id.toString(),
  };
  axios
    .post("/api/login", paramMap, {
      headers: {
        "content-type": "application/json",
      },
      timeout: 5000,
    })
    .then((response) => {
      console.log(response);
    });
};

export default CharacterCheck;
