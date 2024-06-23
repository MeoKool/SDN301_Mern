import axios from "axios";

const BASE_URL = "http://localhost:5000/v1/";

const instance = axios.create({
  baseURL: BASE_URL,
});

instance.interceptors.request.use(
  function (config) {
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

instance.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    return Promise.reject(error);
  }
);

export const customAxios = axios.create({
  baseURL: BASE_URL,
  headers: { "Content-Type": "application/json" },
});
customAxios.interceptors.request.use(
  (config) => {
    const accessToken = JSON.parse(sessionStorage.getItem("accessToken"));
    if (accessToken) {
      config.headers["Authorization"] = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
customAxios.interceptors.response.use(
  function (response) {
    return response.data.data;
  },
  function (error) {
    return Promise.reject(error);
  }
);
export default instance;
