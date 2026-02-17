import Link from "next/link";
import { Button, ProfileAvatar } from "@/components/common";

interface ProfileProps {
  userData?: {
    nickname: string;
    email: string;
    profileImg?: string;
  };
}

const MyPageProfile = ({ userData }: ProfileProps) => {
  const { nickname, email, profileImg } = userData ?? {
    nickname: "",
    email: "",
    profileImg: "",
  };

  return (
    <div className="flex w-full items-center justify-between px-5 py-[30px]">
      <div className="flex w-[188px] items-center gap-6">
        <ProfileAvatar
          size={60}
          src={profileImg ? profileImg : null}
          alt={nickname}
          priority={true}
        />
        <div className="flex w-[160px] flex-col gap-1">
          {userData ? (
            <>
              <span className="truncate text-body1-semibold">{nickname}</span>
              <span className="truncate text-body2-regular text-layout-body-default">{email}</span>
            </>
          ) : (
            <p className="text-nowrap text-body1-semibold text-layout-header-default">
              로그인 시 이용 가능합니다.
            </p>
          )}
        </div>
      </div>

      <Button
        as={Link}
        href={userData ? "/mypage/profile" : "/login"}
        variant="outlined"
        ignoreBase
        className="active:text-neutral-normal-pressed rounded-[10px] border border-neutral-normal-default px-3 py-[10px] text-caption1-semibold text-neutral-normal-default transition-all duration-150 hover:border-neutral-normal-hover hover:text-black focus:border-brand-normal-default/70 focus:text-brand-normal-default focus:outline-none active:border-neutral-normal-pressed active:bg-fill-neutral-normal-pressed disabled:border-neutral-normal-disabled disabled:text-neutral-normal-disabled disabled:bg-fill-neutral-normal-disabled"
      >
        {userData ? "프로필 수정" : "로그인"}
      </Button>
    </div>
  );
};

export default MyPageProfile;
