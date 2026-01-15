import axios from "axios";
import getBaseURL from "./getBaseURL";

const authApi = axios.create({
  baseURL: getBaseURL(),
  withCredentials: true,
  timeout: 5000,
});

authApi.interceptors.response.use(
  (response) => response,

  async (error) => {
    const originalRequest = error.config;

    // 서버환경에서 실행했을때 에러라는 것을 알려줌
    if (typeof window === "undefined") {
      return Promise.reject(error);
    }

    if (
      (error.response?.status === 401 || error.response?.status === 403) &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;

      try {
        await authApi.post("/auth/refresh");

        return authApi(originalRequest);
      } catch (refreshError) {
        alert("다시 로그인 해주세요.");
        window.location.replace("/login");

        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default authApi;
