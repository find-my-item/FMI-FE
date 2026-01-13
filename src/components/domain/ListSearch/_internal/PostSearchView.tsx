import { PostListItem } from "@/components/domain";
import { MOCK_POST_ITEM } from "@/mock/MOCK_DATA";

const PostSearchView = () => {
  return (
    <div className="w-full">
      {Array.from({ length: 2 }).map((_, index) => (
        <PostListItem post={MOCK_POST_ITEM} key={index} />
      ))}
    </div>
  );
};

export default PostSearchView;
