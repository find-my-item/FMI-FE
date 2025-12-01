interface ProfileProps {
  userName: string;
  email: string;
}

const MyPageProfile = ({ userName, email }: ProfileProps) => {
  return (
    <div className="flex h-[60px] w-[188px] flex-row items-center gap-6">
      <div className="h-[60px] w-[60px] rounded-full bg-slate-100" />
      <div>
        <p className="text-body1-semibold">{userName}</p>
        <p className="text-body2-regular text-layout-body-default">{email}</p>
      </div>
    </div>
  );
};

export default MyPageProfile;
