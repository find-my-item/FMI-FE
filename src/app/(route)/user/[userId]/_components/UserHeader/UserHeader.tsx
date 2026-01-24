import Image from "next/image";

interface UserHeaderProps {
  data: {
    nickname: string;
    profileImg: string;
  };
}

const UserHeader = ({ data }: UserHeaderProps) => {
  const { nickname, profileImg } = data;

  // TODO(지권): 대체 이미지 경로 수정 필요
  const imageSrc = profileImg || "/test_list.JPG";

  return (
    <section className="flex items-center gap-6 p-5">
      <div className="relative h-[60px] w-[60px]">
        <Image
          alt={`${nickname}의 프로필 이미지`}
          src={imageSrc}
          width={60}
          height={60}
          className="rounded-full"
          priority
          draggable={false}
        />
      </div>

      <div className="flex flex-col items-start gap-1">
        <h2 className="text-body1-semibold text-layout-header-default">{nickname}</h2>
      </div>
    </section>
  );
};

export default UserHeader;
