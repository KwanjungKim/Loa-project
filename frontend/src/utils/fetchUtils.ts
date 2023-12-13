import axios from "axios";

const baseURL = import.meta.env.VITE_APP_API_URL || "http://localhost:8080";

const Axios = axios.create({
  baseURL,
  headers: {
    "Content-type": "application/json",
    "Access-Control-Allow-Origin": "*",
  },
  timeout: 5000,
});

Axios.interceptors.request.use(
  (config) => {
    console.log("=========== request starts ===========");
    console.log("config", config);
    console.log("=========== request ends ===========");
    return config;
  },
  (error) => {
    console.log("=========== request error starts ===========");
    console.log("error", error);
    console.log("=========== request error ends ===========");
    return Promise.reject(error);
  },
);

Axios.interceptors.response.use(
  (response) => {
    console.log("=========== response starts ===========");
    console.log("response", response);
    console.log("=========== response ends ===========");
    return response;
  },
  (error) => {
    {
      console.log("=========== response error starts ===========");
      console.log("error", error);
      console.log("=========== response error ends ===========");
      return Promise.reject(error);
    }
  },
);

const TestAxios = axios.create({
  baseURL: "https://jsonplaceholder.typicode.com",
  headers: {
    "Content-type": "application/json",
  },
  timeout: 5000,
});

const fetchUtils = {
  get: async (url: string) => {
    // return await Axios.get(url);
    try {
      const response = await Axios.get(url);
      if (response.status === 200) {
        return {
          success: true,
          data: response.data,
        };
      } else {
        return {
          success: false,
          data: null,
        };
      }
    } catch (err) {
      console.log(err);
      return {
        success: false,
        data: null,
      };
    }
  },
  post: async (url: string, data: any) => {
    // return await Axios.post(url, data);
    try {
      const response = await Axios.post(url, data);
      if (response.status === 200) {
        return {
          success: true,
          data: response.data,
        };
      } else {
        return {
          success: false,
          data: null,
        };
      }
    } catch (err) {
      console.log(err);
      return {
        success: false,
        data: null,
      };
    }
  },
  patch: async (url: string, data: any) => {
    // return await Axios.patch(url, data);
    try {
      const response = await Axios.patch(url, data);
      if (response.status === 200) {
        return {
          success: true,
          data: response.data,
        };
      } else {
        return {
          success: false,
          data: null,
        };
      }
    } catch (err) {
      console.log(err);
      return {
        success: false,
        data: null,
      };
    }
  },
  delete: async (url: string) => {
    // return await Axios.delete(url);
    try {
      const response = await Axios.delete(url);
      if (response.status === 200) {
        return {
          success: true,
          data: response.data,
        };
      } else {
        return {
          success: false,
          data: null,
        };
      }
    } catch (err) {
      console.log(err);
      return {
        success: false,
        data: null,
      };
    }
  },
  testGet: async (url: string) => {
    return await TestAxios.get(url);
  },
};

export default fetchUtils;
