import Cookies from "js-cookie";

const cookieUtils = {
  getCoookie: (key: string) => Cookies.get(key),
  setCookie: (
    key: string,
    value: string,
    options?: Cookies.CookieAttributes,
  ) => {
    Cookies.set(key, value, options);
  },
  deleteCookie: (key: string, options?: Cookies.CookieAttributes) => {
    Cookies.remove(key, options);
  },
};

export default cookieUtils;
