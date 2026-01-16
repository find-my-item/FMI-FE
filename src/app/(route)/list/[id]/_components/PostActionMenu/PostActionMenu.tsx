import { cn } from "@/utils";
import { Icon } from "@/components/common";
import { useDeleteDetailPost } from "@/api/fetch/post";

interface PostOptionBoxProps {
  open: boolean;
  onClose: () => void;
  postId: number;
}

const PostActionMenu = ({ open, onClose, postId }: PostOptionBoxProps) => {
  const { mutate } = useDeleteDetailPost(postId);
  if (!open) return null;

  const handleDeletePost = (postId: number) => {
    mutate({ postId });
    onClose();
  };

  return (
    <div
      className={cn(
        "absolute right-[10%] top-[60%] z-10 mt-2",
        "min-h-[171px] w-[218px] overflow-hidden rounded-[20px] flex-col-center",
        "glass-card border border-white bg-fill-neutral-subtle-default",
        "text-nowrap text-h3-medium text-neutral-normal-default"
      )}
    >
      <button className="gap-2 px-7 py-4 flex-center">
        <Icon name="Edit" size={20} />
        <span>게시글 수정하기</span>
      </button>
      <hr className="h-[1px] bg-white" />
      <button className="gap-2 px-7 py-4 flex-center" onClick={() => handleDeletePost(postId)}>
        <Icon name="Trash" size={20} />
        <span className="text-system-warning">게시글 삭제하기</span>
      </button>
      <hr className="h-[1px] bg-white" />
      <button className="gap-2 px-7 py-4 flex-center">
        <Icon name="ArrowSwitchHorizontal" size={20} />
        <span>찾았음 상태로 변경</span>
      </button>
    </div>
  );
};

export default PostActionMenu;
