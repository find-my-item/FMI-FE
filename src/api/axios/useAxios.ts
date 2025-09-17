"use client";

import authApi from "./authApi";
import publicApi from "./publicApi";

type ApiType = "auth" | "public";

const useAxios = (apiType: ApiType) => {
  switch (apiType) {
    case "auth":
      return authApi;
    case "public":
      return publicApi;
    default:
      return publicApi;
  }
};

export default useAxios;
