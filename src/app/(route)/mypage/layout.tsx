import useServerPrefetchQuery from "@/api/_base/query/useServerPrefetchQuery";
import { getUserMeServer } from "@/api/fetch/user";
import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";
import { ReactNode } from "react";

const layout = async ({ children }: { children: ReactNode }) => {
  const queryClient = new QueryClient();

  await useServerPrefetchQuery({
    queryClient,
    queryKey: ["user", "me"],
    fetcher: getUserMeServer,
  });

  return <HydrationBoundary state={dehydrate(queryClient)}>{children}</HydrationBoundary>;
};

export default layout;
