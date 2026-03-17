import { ShareId } from "@/types";
import { shareWithCopyUrl, shareWithKakao, shareWithNative } from "./_internal";
import { ToastType } from "@/types/ToastTypes";
import { MetaDataItemWithLink } from "@/types/MetaDataType";

interface ExecuteShareProps {
  id: ShareId;
  metaData: MetaDataItemWithLink;
  objectType: "feed" | "location";
  addToast: (message: string, type: ToastType) => void;
}

export const executeShare = ({ id, metaData, objectType, addToast }: ExecuteShareProps) => {
  switch (id) {
    case "kakao":
      shareWithKakao(metaData, objectType);
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
