import cookieUtils from "./cookieUtils";

const loginUtils = {
  isLoggedin: () => {
    return cookieUtils.getCoookie("access_token") !== undefined;
  },
};

export default loginUtils;
