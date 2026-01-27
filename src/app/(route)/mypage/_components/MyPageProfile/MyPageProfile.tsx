import Link from "next/link";
import { Button, ProfileAvatar } from "@/components/common";

interface ProfileProps {
  userName: string;
  email: string;
}

const MyPageProfile = ({ userName, email }: ProfileProps) => {
  return (
    <div className="flex w-full items-center justify-between px-5 py-[30px]">
      <div className="flex w-[188px] items-center gap-6">
        {/* TODO(수현): 프로필 추후 링크 연결 */}
        <ProfileAvatar size={60} src={null} alt={userName} priority={true} />
        <div className="flex w-[160px] flex-col gap-1">
          <span className="truncate text-body1-semibold">{userName}</span>
          <span className="truncate text-body2-regular text-layout-body-default">{email}</span>
        </div>
      </div>

      <Button as={Link} href="/mypage/profile" variant="outlined">
        프로필 수정
      </Button>
    </div>
  );
};

export default MyPageProfile;
