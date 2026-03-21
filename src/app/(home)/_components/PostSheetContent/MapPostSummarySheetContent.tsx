"use client";

import { PostListItem } from "@/components/domain";
import { HomeFilterSection, MainSearchEmpty } from "./_internal";
import { useSearchParams } from "next/navigation";
import { useMapPostSummary } from "@/api/fetch/mapController";
import { MARKER_ID } from "../../_constants/QUERY_PARAMS";

const MapPostSummarySheetContent = () => {
  const searchParams = useSearchParams();
  const raw = searchParams.get(MARKER_ID);
  const postId = raw ? Number(raw) : NaN;
  const isValidPostId = Number.isFinite(postId) && postId > 0;

  const { data, isLoading } = useMapPostSummary(isValidPostId ? postId : 0);

  if (!isValidPostId) return null;

  const posts = data?.result ?? [];

  return (
    <>
      <HomeFilterSection />
      {posts.length === 0 && <MainSearchEmpty />}
      <ul className="-mx-5 mt-2 space-y-2">
        {!isLoading && posts.map((post) => <PostListItem key={post.id} post={post} />)}
      </ul>
    </>
  );
};

export default MapPostSummarySheetContent;
