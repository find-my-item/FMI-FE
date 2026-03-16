import { DetailHeader } from "@/components/layout";
import { HeaderShare } from "@/components/layout/DetailHeader/DetailHeaderParts";
import {
  PublicDetailHeader,
  PublicDetailInfo,
  PublicLostItemInfo,
  PublicStorageInfo,
} from "../_internal";

const headerData = {
  id: "1",
  imageResponseList: [
    {
      id: 1,
      imgUrl: "/test_list.JPG",
      imageType: "THUMBNAIL" as const,
    },
  ],
  userData: {
    userId: 1,
    nickName: "경찰청",
    profileImage: "",
    postCount: 0,
    chattingCount: 0,
  },
  location: "불암지구대 유실물센터",
  phoneNumber: "02-3469-0112",
};

const PublicClientDetail = ({ id }: { id: number }) => {
  console.log(id);

  return (
    <>
      <DetailHeader>
        <HeaderShare />
      </DetailHeader>

      <article className="h-base">
        <PublicDetailHeader headerData={headerData} />

        <div className="space-y-8 px-5 py-[30px]">
          <PublicDetailInfo />
          <PublicLostItemInfo />
          <PublicStorageInfo />
        </div>
      </article>
    </>
  );
};

export default PublicClientDetail;
