import { UserProfileTabKey } from "../../../_types/USER_TABS";

interface EmptyUIProps {
  selectedTab: UserProfileTabKey;
}

const EMPTY_LABEL_MAP: Record<UserProfileTabKey, string> = {
  posts: "작성한 게시글",
  comments: "작성한 댓글",
  favorites: "즐겨찾기한 게시글",
};

const EmptyUI = ({ selectedTab }: EmptyUIProps) => {
  return (
    <section aria-label="데이터가 없습니다." className="flex-center">
      <span>{EMPTY_LABEL_MAP[selectedTab]}</span>
      <p>데이터가 없습니다.</p>
    </section>
  );
};

export default EmptyUI;
