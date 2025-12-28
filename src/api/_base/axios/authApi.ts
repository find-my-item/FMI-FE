import axios from "axios";

const authApi = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  withCredentials: true,
  timeout: 5000,
});

// authApi.interceptors.response.use(
//   // authApi 401 에러 발생 시 토큰 재발급 로직 작성 가능
// );

export default authApi;
