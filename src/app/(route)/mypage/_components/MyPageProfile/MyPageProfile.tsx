import { Button } from "@/components";

interface ProfileProps {
  userName: string;
  email: string;
}

const MyPageProfile = ({ userName, email }: ProfileProps) => {
  return (
    <div className="flex w-full items-center justify-between px-5 py-[30px]">
      <div className="flex w-[188px] items-center gap-6">
        {/* TODO(수현): 프로필 추후 img로 변경 */}
        <div className="size-[60px] rounded-full bg-slate-100" />
        <div className="flex flex-col gap-1">
          <span className="text-body1-semibold">{userName}</span>
          <span className="text-body2-regular text-layout-body-default">{email}</span>
        </div>
      </div>
      <Button variant="outlined"> 프로필 수정 </Button>
    </div>
  );
};

export default MyPageProfile;
