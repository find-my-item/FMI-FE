import axios from "axios";

const publicApi = axios.create({
  baseURL: "url", // env base url
  timeout: 5000,
});

export default publicApi;
