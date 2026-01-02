import { copyCurrentUrl } from "./_internal/copyCurrentUrl";
import { shareMessage } from "./_internal/KakaoShare";
import { shareWithNative } from "./_internal/shareWithNative";

type MetaDataType = {
  title: string;
  summary: string;
  thumbnailUrl: string;
  link: string;
};

interface HandleShareClickProps {
  id: string;
  metaData: MetaDataType;
}

export const handleShareClick = ({ id, metaData }: HandleShareClickProps) => {
  switch (id) {
    case "kakao":
      shareMessage({
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
      copyCurrentUrl();
      break;
    default:
      break;
  }
};
