import axios from "axios";
import getBaseURL from "./getBaseURL";

const publicApi = axios.create({
  baseURL: getBaseURL(),
  timeout: 5000,
});

export default publicApi;
