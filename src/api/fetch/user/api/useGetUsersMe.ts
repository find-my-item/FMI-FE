import useAppQuery from "@/api/_base/query/useAppQuery";
import { ApiBaseResponseType } from "@/api/_base/types/ApiBaseResponseType";
import { GetUsersMeResponse } from "../types/UserMeType";
import { AxiosError } from "axios";
import { UseQueryOptions } from "@tanstack/react-query";

type UseGetUsersMeOptions = Omit<
  UseQueryOptions<GetUsersMeResponse, AxiosError<ApiBaseResponseType<null>>>,
  "queryKey" | "queryFn"
>;

export const useGetUsersMe = (hasToken = true, options?: UseGetUsersMeOptions) => {
  return useAppQuery<GetUsersMeResponse, AxiosError<ApiBaseResponseType<null>>>(
    "auth",
    ["users-me"],
    "/users/me",
    {
      enabled: hasToken,
      ...options,
    }
  );
};
