import axios from "axios";
import { getBaseURL } from "./getBaseURL";

const authApi = axios.create({
  baseURL: getBaseURL(),
  withCredentials: true,
  timeout: 5000,
});

authApi.interceptors.response.use(
  (response) => response,

  async (error) => {
    const originalRequest = error.config;

    const isAuthError = [401, 403].includes(error.response?.status);
    const isAlreadyRetried = originalRequest._retry;
    const isRefreshRequest = originalRequest.url === "/auth/refresh";

    // 서버환경에서 실행했을때 에러라는 것을 알려줌
    if (typeof window === "undefined") {
      return Promise.reject(error);
    }

    if (isAuthError && !isAlreadyRetried && !isRefreshRequest) {
      originalRequest._retry = true;

      try {
        await authApi.post("/auth/refresh");

        // 토큰 재발급 성공 시 커스텀 이벤트 발생
        if (typeof window !== "undefined") {
          window.dispatchEvent(new CustomEvent("tokenRefreshed"));
        }

        return authApi(originalRequest);
      } catch (refreshError) {
        // 로그아웃 안내 토스트는 로그인 페이지에서 보여줌
        window.location.replace("/login?reason=session-expired");

        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default authApi;
