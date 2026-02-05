"use client";

import { AdminFilter, AdminSearch } from "../../../_components";

// TODO(지권): 추후 필터 기능 추가
const WithdrawalReasonsFilters = [
  {
    label: "유형",
    onSelected: false,
    onClick: () => {},
  },
];

const AdminWithdrawalReasonsView = () => {
  return (
    <div className="h-base">
      <AdminSearch onEnter={() => {}} />

      <AdminFilter filters={WithdrawalReasonsFilters} />
      <section aria-label="유저 탈퇴 사유 목록">
        <ul>
          <li className="block space-y-2 border-b border-divider-default px-5 py-[30px]">
            <div>
              <h3 className="text-h3-semibold text-layout-header-default">닉네임최대열글자확인</h3>
              <div className="flex text-body2-regular text-layout-body-default">
                <span className="after:mx-1 after:content-['·']">asdfasdfasdfasda@naver.com</span>
                <time dateTime="2026-10-20">2026.10.20</time>
              </div>
            </div>
            <div className="text-body1-regular text-brand-normal-default">
              <ul className="space-y-[2px]">
                <li>- 실제 분실물/습득물이 아닌 내용이에요.</li>
                <li>- 실제 분실물/습득물이 아닌 내용이에요.</li>
                <li>- 실제 분실물/습득물이 아닌 내용이에요.</li>
                <li>- 실제 분실물/습득물이 아닌 내용이에요.</li>
              </ul>
            </div>
          </li>
        </ul>
      </section>
    </div>
  );
};

export default AdminWithdrawalReasonsView;
