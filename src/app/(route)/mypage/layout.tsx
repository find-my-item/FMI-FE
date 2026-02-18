import useServerPrefetchQuery from "@/api/_base/query/useServerPrefetchQuery";
import { QueryClient, dehydrate, HydrationBoundary } from "@tanstack/react-query";

export default async function PostLayout({ children }: { children: React.ReactNode }) {
  const queryClient = new QueryClient();

  await useServerPrefetchQuery({
    queryClient,
    queryKey: ["users-me"],
    fetcher: () =>
      fetch(`${process.env.NEXT_PUBLIC_API_URL}/users/me`, {
        next: { revalidate: 0 },
      }).then((res) => res.json()),
  });
  return <HydrationBoundary state={dehydrate(queryClient)}>{children}</HydrationBoundary>;
}
