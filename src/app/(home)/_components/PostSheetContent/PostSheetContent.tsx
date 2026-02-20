import { PostListItem } from "@/components/domain";
import HomeFilterSection from "./_internal/HomeFilterSection";
import { MOCK_POST_ITEM } from "@/mock/data";

const PostSheetContent = () => {
  return (
    <>
      <HomeFilterSection />
      <ul className="-mx-5 mt-2 space-y-2">
        {Array.from({ length: 10 }).map((_, index) => (
          <PostListItem key={index} post={MOCK_POST_ITEM} />
        ))}
      </ul>
    </>
  );
};

export default PostSheetContent;
