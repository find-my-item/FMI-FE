import { ShareId } from "@/types";
import { shareWithCopyUrl, shareWithKakao, shareWithNative } from "./_internal";
import { PostMetaDataItemWithLink } from "@/types/MetaDataType";
import { ToastType } from "@/types/ToastTypes";

interface ExecuteShareProps {
  id: ShareId;
  metaData: PostMetaDataItemWithLink;
  addToast: (message: string, type: ToastType) => void;
}

export const executeShare = ({ id, metaData, addToast }: ExecuteShareProps) => {
  switch (id) {
    case "kakao":
      shareWithKakao(metaData);
      break;
    case "native":
      shareWithNative({
        metaData,
      });
      break;
    case "copy":
      shareWithCopyUrl(metaData.link, addToast);
      break;
    default:
      break;
  }
};
