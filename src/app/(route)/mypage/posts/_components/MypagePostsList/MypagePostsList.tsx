import { PostListItem } from "@/components/domain";

const MypagePostsList = () => {
  return (
    <section>
      <h2 className="sr-only">게시글 목록 영역</h2>
      <ul>
        {[1, 2, 3].map((item) => (
          <PostListItem
            key={item}
            post={{
              postId: 1,
              title: "전자기기를 잃어버렸어요",
              summary: "전자기기를 읽어버렸다구리이부ㅜ루아ㅓㅁㄴ이5ㄱ",
              thumbnailUrl: "https://picsum.photos/400/300?random=1",
              address: "서울특별시 강남구",
              itemStatus: "SEARCHING",
              postType: "FOUND",
              category: "CARD",
              favoriteCount: 3,
              viewCount: 5,
              createdAt: "30분 전",
              hot: false,
              new: false,
            }}
          />
        ))}
      </ul>
    </section>
  );
};

export default MypagePostsList;
