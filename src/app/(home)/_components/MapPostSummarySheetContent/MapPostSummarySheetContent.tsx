"use client";

import { PostListItem } from "@/components/domain";
import { useSearchParams } from "next/navigation";
import { useMapPostSummary } from "@/api/fetch/mapController";
import { MARKER_ID } from "../../_constants/QUERY_PARAMS";
import SearchLoading from "../SearchLoading/SearchLoading";
import MainSearchEmpty from "../MainSearchEmpty/MainSearchEmpty";
import HomeFilterSection from "../HomeFilterSection/HomeFilterSection";

const MapPostSummarySheetContent = () => {
  const searchParams = useSearchParams();
  const raw = searchParams.get(MARKER_ID);
  const postId = raw ? Number(raw) : NaN;
  const isValidPostId = Number.isFinite(postId) && postId > 0;

  const { data, isLoading } = useMapPostSummary(isValidPostId ? postId : 0);

  if (!isValidPostId) return null;

  const posts = data?.result ?? [];

  if (isLoading) return <SearchLoading />;

  return (
    <>
      <HomeFilterSection />
      {posts.length === 0 && <MainSearchEmpty />}
      <ul className="-mx-5 mt-2 space-y-2">
        {posts.map((post) => (
          <PostListItem key={post.id} post={post} />
        ))}
      </ul>
    </>
  );
};

export default MapPostSummarySheetContent;
