interface ProfileProps {
  userName: string;
  email: string;
}

const MyPageProfile = ({ userName, email }: ProfileProps) => {
  return (
    <div className="flex w-[188px] items-center gap-6">
      <div className="size-[60px] rounded-full bg-slate-100" />
      <div className="flex flex-col gap-1">
        <p className="text-body1-semibold">{userName}</p>
        <p className="text-body2-regular text-layout-body-default">{email}</p>
      </div>
    </div>
  );
};

export default MyPageProfile;
