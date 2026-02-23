import { ShareId } from "@/types";
import { shareWithCopyUrl, shareWithKakao, shareWithNative } from "./_internal";
import { PostMetaDataItemWithLink } from "@/types/MetaDataType";

interface ExecuteShareProps {
  id: ShareId;
  metaData: PostMetaDataItemWithLink;
}

export const executeShare = ({ id, metaData }: ExecuteShareProps) => {
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
      shareWithCopyUrl(metaData.link);
      break;
    default:
      break;
  }
};
