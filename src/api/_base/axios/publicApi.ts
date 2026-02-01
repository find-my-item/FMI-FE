import axios from "axios";

const publicApi = axios.create({
  baseURL: "/api",
  timeout: 5000,
});

export default publicApi;
