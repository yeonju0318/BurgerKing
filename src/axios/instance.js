import axios from "axios";

const instance = axios.create({
  baseURL: process.env.REACT_APP_SERVER_URL,
  headers: {
    "Access-Control-Allow-Origin": "*",
  },
});

instance.interceptors.request.use(
  // 요청 보내기 전 수행
  function (config) {
    console.log("인터셉터 요청 성공!");
    return config;
  },
  // 오류 요청 보내기 전 수행
  function (error) {
    console.log("인터셉터 요청 오류!");
    return Promise.reject(error);
  }
);

instance.interceptors.response.use(
  // 응답 내보내기 전 수행
  function (response) {
    console.log("인터셉터 응답 받았습니다!");
    return response;
  },

  // 오류 응답 내보내기 전 수행
  function (error) {
    console.log("인터셉터 응답 오류 발생!", error);
    return Promise.reject(error);
  }
);

export const baseURL = axios.create({
  baseURL: process.env.REACT_APP_SERVER_URL,
  headers: {
    "Access-Control-Allow-Origin": "*",
  },
});

baseURL.interceptors.request.use((config) => {
  console.log(config);
  if (config.headers === undefined) return;
  const token = config.headers.get("authorization");
  config.headers["ACCESS_KEY"] = `Bearer ${token}`;
  return config;
});

export default instance;
