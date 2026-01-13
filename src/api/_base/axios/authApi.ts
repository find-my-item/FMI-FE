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

    if (typeof window === "undefined") {
      return Promise.reject(error);
    }

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        await authApi.post("/auth/refresh");
        console.log("재발급 중>> ");
        return authApi(originalRequest);
      } catch (refreshError) {
        window.location.href = "/login";
        console.log("토큰 재발급 실패>> ");
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default authApi;
