import axios from "axios";

const authApi = axios.create({
  baseURL: "url", // env base url
  timeout: 5000,
});

authApi.interceptors.request.use(
  (config) => {
    // 추후: JWT 토큰 주입
    // const token = localStorage.getItem("accessToken");
    // if (token) {
    //   config.headers.Authorization = `Bearer ${token}`;
    // }
    // or cookie
    return config;
  },
  (error) => Promise.reject(error)
);

export default authApi;
