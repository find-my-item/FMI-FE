import Image from "next/image";
import { useGetMetaData } from "@/api/fetch/post";
import { Button, PopupLayout } from "@/components";
import { shareMessage } from "@/utils/share/KakaoShare";
import { SHARE, ShareId } from "./SHARE";

interface PostShareProps {
  isOpen: boolean;
  onClose: () => void;
  postId: string;
}

const PostShare = ({ isOpen, onClose, postId }: PostShareProps) => {
  const { data } = useGetMetaData({ postId: Number(postId) });
  console.log(data);

  const text = data?.result?.summary || "데이터 공유하기";
  const link = data?.result?.thumbnailUrl || "https://www.finditem.kr/";

  const handleShareClick = (id: ShareId) => {
    switch (id) {
      case "kakao":
        shareMessage({
          text,
          link,
        });
        break;
      case "native":
        // nativeShare();
        break;
      case "copy":
        // copyLink();
        break;
      default:
        break;
    }
  };

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
              onClick={() => handleShareClick(item.id)}
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
