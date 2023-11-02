import axios from "axios";

const Axios = axios.create({
  baseURL: "http://localhost:5173", // ???
  headers: {
    "Content-type": "application/json",
  },
  timeout: 5000,
});

Axios.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => Promise.reject(error),
);

Axios.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    return Promise.reject(error);
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
    return await Axios.get(url);
  },
  post: async (url: string) => {
    return await Axios.post(url);
  },
  patch: async (url: string) => {
    return await Axios.patch(url);
  },
  delete: async (url: string) => {
    return await Axios.delete(url);
  },
  testGet: async (url: string) => {
    return await TestAxios.get(url);
  },
};

export default fetchUtils;
