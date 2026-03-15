import { useGetUserComments } from "@/api/fetch/user/api/useGetUserComments";
import MypageCommentsList from "../MypageCommentsList/MypageCommentsList";
import { useFilterParams } from "@/hooks/domain";
import { LoadingState } from "@/components/state";
import { useToast } from "@/context/ToastContext";

const MypageCommentsContent = () => {
  const { startDate, endDate, simpleSort } = useFilterParams();
  const {
    data: commentsData,
    isLoading,
    isError,
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage,
  } = useGetUserComments({
    startDate: startDate,
    endDate: endDate,
    sort: simpleSort,
  });

  const { addToast } = useToast();

  if (isLoading) return <LoadingState />;
  if (isError) addToast("목록을 불러오는데 실패했어요", "error");

  return (
    <>
      {commentsData && (
        <MypageCommentsList
          commentData={commentsData}
          hasNextPage={hasNextPage}
          isFetchingNextPage={isFetchingNextPage}
          fetchNextPage={fetchNextPage}
        />
      )}
    </>
  );
};

export default MypageCommentsContent;
