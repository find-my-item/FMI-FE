import ListItem from "@/app/(route)/list/_components/ListItem/ListItem";

const PostSearchView = () => {
  return (
    <div className="w-full">
      {Array.from({ length: 2 }).map((_, index) => (
        <ListItem
          id={1}
          linkState="list"
          img=""
          title="시청역 화장실에서 핸드폰 잃어버리신 분"
          description="서울시 노원구 OO동 건물 화장실에서 핸드폰 잃어버린 분 있으신가요"
          key={index}
        />
      ))}
    </div>
  );
};

export default PostSearchView;
