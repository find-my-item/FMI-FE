import useServerPrefetchQuery from "@/api/_base/query/useServerPrefetchQuery";
import { QueryClient, dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { cookies } from "next/headers";

export default async function PostLayout({ children }: { children: React.ReactNode }) {
  const queryClient = new QueryClient();

  const cookieStore = await cookies();
  const accessToken = cookieStore.get("access_token")?.value;

  await useServerPrefetchQuery({
    queryClient,
    queryKey: ["users-me"],
    fetcher: () =>
      fetch(`${process.env.NEXT_PUBLIC_API_URL}/users/me`, {
        headers: {
          Cookie: `access_token=${accessToken}`,
        },
        next: { revalidate: 0 },
      }).then((res) => res.json()),
  });
  return <HydrationBoundary state={dehydrate(queryClient)}>{children}</HydrationBoundary>;
}
