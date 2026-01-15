import { MetaDataType, ShareId } from "@/types";
import { shareWithCopyUrl, shareWithKakao, shareWithNative } from "./_internal";

interface ExecuteShareProps {
  id: ShareId;
  metaData: MetaDataType;
}

export const executeShare = ({ id, metaData }: ExecuteShareProps) => {
  switch (id) {
    case "kakao":
      shareWithKakao({
        ...metaData,
      });
      break;
    case "native":
      shareWithNative({
        metaData: {
          ...metaData,
        },
      });
      break;
    case "copy":
      shareWithCopyUrl();
      break;
    default:
      break;
  }
};
