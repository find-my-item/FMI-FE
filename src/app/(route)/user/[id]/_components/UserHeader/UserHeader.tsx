import { Icon } from "@/components/common";

interface UserHeaderProps {
  nickname: string;
  email: string;
}

const UserHeader = ({ nickname, email }: UserHeaderProps) => {
  return (
    <section className="flex items-center gap-6 p-5">
      <div className="relative h-[60px] w-[60px]">
        <div className="h-full w-full rounded-full bg-flatGray-100" />
        <Icon name="ProfileCheck" size={20} className="absolute bottom-0 right-0" />
      </div>
      <div className="flex flex-col items-start gap-1">
        <h2 className="text-body1-semibold text-layout-header-default">{nickname}</h2>
        <p className="text-body2-regular text-layout-body-default">{email}</p>
      </div>
    </section>
  );
};

export default UserHeader;
