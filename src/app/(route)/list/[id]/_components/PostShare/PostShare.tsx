"use client";

import Image from "next/image";
import { handleShareClick } from "@/utils";
import { useGetMetaData } from "@/api/fetch/post";
import { Button, PopupLayout } from "@/components";
import { SHARE } from "./SHARE";

interface PostShareProps {
  isOpen: boolean;
  onClose: () => void;
  postId: string;
}

const fullUrl = window.location.href;

const PostShare = ({ isOpen, onClose, postId }: PostShareProps) => {
  const { data } = useGetMetaData({ postId: Number(postId) });

  const metaData = {
    title: data?.result?.title || "데이터 공유하기",
    summary: data?.result?.summary || "데이터 공유하기",
    thumbnailUrl: data?.result?.thumbnailUrl || "/test_list.JPG",
    link: fullUrl,
  };

  const handleOption = (id: string) => handleShareClick({ id, metaData });

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
