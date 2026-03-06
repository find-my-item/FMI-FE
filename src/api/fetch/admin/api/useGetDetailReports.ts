import useAppQuery from "@/api/_base/query/useAppQuery";
import { GetDetailReportsResponse } from "../types/DetailReportsType";

interface UseGetDetailReportsProps {
  type: string;
  id: number;
}

export const useGetDetailReports = ({ type, id }: UseGetDetailReportsProps) => {
  return useAppQuery<GetDetailReportsResponse>(
    "auth",
    ["reports-detail", type, id],
    `/admin/customer-service/${type}/${id}`
  );
};
