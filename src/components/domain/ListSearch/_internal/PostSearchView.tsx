import ListItem from "@/app/(route)/list/_components/ListItem/ListItem";
import { MOCK_POST_ITEM } from "@/mock/MOCK_DATA";

const PostSearchView = () => {
  return (
    <div className="w-full">
      {Array.from({ length: 2 }).map((_, index) => (
        <ListItem post={MOCK_POST_ITEM} key={index} />
      ))}
    </div>
  );
};

export default PostSearchView;
