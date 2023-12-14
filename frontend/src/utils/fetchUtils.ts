import axios, { AxiosResponse } from "axios";

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

export interface IResponseData {
  success: boolean;
  data: any;
  message: string;
}

const fetchUtils = {
  get: async (url: string) => {
    try {
      const response = await Axios.get(url);
      return fetchUtils.handleResponse(response);
    } catch (err) {
      console.log(err);
      return {
        success: false,
        data: null,
        message: "오류가 발생했습니다.",
      };
    }
  },
  post: async (url: string, data: any) => {
    try {
      const response = await Axios.post(url, data);
      return fetchUtils.handleResponse(response);
    } catch (err) {
      console.log(err);
      return {
        success: false,
        data: null,
        message: "오류가 발생했습니다.",
      };
    }
  },
  patch: async (url: string, data: any) => {
    try {
      const response = await Axios.patch(url, data);
      return fetchUtils.handleResponse(response);
    } catch (err) {
      console.log(err);
      return {
        success: false,
        data: null,
        message: "오류가 발생했습니다.",
      };
    }
  },
  delete: async (url: string) => {
    try {
      const response = await Axios.delete(url);
      return fetchUtils.handleResponse(response);
    } catch (err) {
      console.log(err);
      return {
        success: false,
        data: null,
        message: "오류가 발생했습니다.",
      };
    }
  },
  testGet: async (url: string) => {
    return await TestAxios.get(url);
  },
  handleResponse: (response: AxiosResponse<any, any>) => {
    if (
      !response.data ||
      !response.data.resultmodel ||
      response.data.resultmodel.status !== "success"
    ) {
      return {
        success: false,
        data: null,
        message:
          (response.data.resultmodel.message as string) ||
          "오류가 발생했습니다.",
      };
    } else {
      return {
        success: true,
        data: response.data,
        message: (response.data.resultmodel.message as string) || "",
      };
    }
  },
};

export default fetchUtils;
