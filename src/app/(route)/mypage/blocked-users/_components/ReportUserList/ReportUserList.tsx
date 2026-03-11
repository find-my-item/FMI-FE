"use client";

import { Button, ProfileAvatar } from "@/components/common";

const BLOCK_USER_MOCK_DATA = [
  {
    profileImg: "",
    nickname: "사용자닉네임최대열자",
  },
  {
    profileImg: "",
    nickname: "사용자닉네임최대열자",
  },
  {
    profileImg: "",
    nickname: "사용자닉네임최대열자",
  },
];

const ReportUserList = () => {
  return (
    <ul className="flex flex-col gap-3 py-4">
      {BLOCK_USER_MOCK_DATA.map((item, index) => (
        <ReportUserItem key={index} {...item} />
      ))}
    </ul>
  );
};

export default ReportUserList;

const ReportUserItem = ({ profileImg, nickname }: { profileImg: string; nickname: string }) => {
  return (
    <li className="flex items-center justify-between px-5 py-2">
      <div className="flex items-center gap-3">
        <ProfileAvatar src={profileImg} alt={nickname} size={36} />
        <p className="text-body1-medium text-layout-header-default">{nickname}</p>
      </div>

      <Button
        variant="outlined"
        ariaLabel={`${nickname} 차단 해제`}
        className="px-3"
        onClick={() => {}}
      >
        차단 해제
      </Button>
    </li>
  );
};
