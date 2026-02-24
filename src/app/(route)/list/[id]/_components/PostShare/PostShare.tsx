"use client";

import Image from "next/image";
import { executeShare } from "@/utils";
import { useGetMetaData } from "@/api/fetch/post";
import { Button } from "@/components/common";
import { PopupLayout } from "@/components/domain";
import { SHARE } from "./SHARE";
import { ShareId } from "@/types";
import { useToast } from "@/context/ToastContext";

interface PostShareProps {
  isOpen: boolean;
  onClose: () => void;
  postId: number;
}

const PostShare = ({ isOpen, onClose, postId }: PostShareProps) => {
  const { data } = useGetMetaData({ postId });
  const { addToast } = useToast();

  const metaData = {
    title: data?.result?.title || "찾아줘 게시글 공유",
    summary: data?.result?.summary || "게시글을 확인해보세요.",
    // TODO(지권): 대체 이미지 변경
    thumbnailUrl: data?.result?.thumbnailUrl || "/test_list.JPG",
    address: data?.result?.address || "위치 정보 없음",
    likeCount: data?.result?.likeCount || 0,
    commentCount: data?.result?.commentCount || 0,
    viewCount: data?.result?.viewCount || 0,
    link: window.location.href,
  };

  const handleOption = (id: ShareId) =>
    executeShare({
      id,
      metaData,
      addToast,
    });

  return (
    <PopupLayout isOpen={isOpen} onClose={onClose} className="min-h-[305px] space-y-12 px-5 py-10">
      <section className="gap-5 flex-col-center">
        <h2 className="text-h3-semibold text-layout-header-default">게시글 공유하기</h2>
        <div className="w-full gap-[18px] flex-center">
          {SHARE.map((item) => (
            <ShareOptionButton
              key={item.name}
              src={item.src}
              name={item.name}
              onClick={() => handleOption(item.id)}
            />
          ))}
        </div>
      </section>

      <Button aria-label="닫기" onClick={onClose} variant="outlined" className="min-h-11 w-full">
        닫기
      </Button>
    </PopupLayout>
  );
};

export default PostShare;

const ShareOptionButton = ({
  src,
  name,
  onClick,
}: {
  src: string;
  name: string;
  onClick: () => void;
}) => {
  return (
    <button
      aria-label={name}
      type="button"
      className="select-none gap-2 flex-col-center"
      onClick={onClick}
    >
      <Image
        src={src}
        alt=""
        width={60}
        height={60}
        draggable={false}
        priority
        className="rounded-full"
      />
      <span className="text-body2-semibold text-neutral-normal-default">{name}</span>
    </button>
  );
};
