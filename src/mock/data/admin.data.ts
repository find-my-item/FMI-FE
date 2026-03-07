import { NoticeItem } from "@/api/fetch/notice";
import { AdminReportItem, WithdrawUserItem } from "@/api/fetch/admin";
import { InquiryType, ReplyStatus, ReportsType } from "@/types";
import { AdminGuestInquiryItem } from "@/api/fetch/admin/types/GuestInquiriesType";

export const MOCK_NOTICE_LIST: NoticeItem = {
  noticeId: 1,
  title: "[공지] 공지사항 제목",
  thumbnailUrl: "https://picsum.photos/400/300?random=1",
  likeCount: 12,
  viewCount: 24,
  createdAt: "2025-12-26 10:22:58",
  isNew: true,
  isHot: false,
  pinned: false,
  category: "GENERAL",
};

export const MOCK_ADMIN_REPORT_LIST: AdminReportItem[] = [
  {
    type: "REPORT",
    id: 1,
    title: "광고성 링크가 반복적으로 포함된 게시글입니다.",
    status: "PENDING",
    content: "광고성 링크가 반복적으로 포함된 게시글입니다.",
    createdAt: "2025-02-01T10:15:00",
    writerNickname: "짱구",
    writerEmail: "jjanggu@example.com",
  },
  {
    type: "REPORT",
    id: 2,
    title: "광고성 링크가 반복적으로 포함된 게시글입니다.",
    status: "PENDING",
    content: "광고성 링크가 반복적으로 포함된 게시글입니다.",
    createdAt: "2025-02-01T10:15:00",
    writerNickname: "철수",
    writerEmail: "chulsoo@example.com",
  },
  {
    type: "REPORT",
    id: 3,
    title: "광고성 링크가 반복적으로 포함된 게시글입니다.",
    status: "PENDING",
    content: "광고성 링크가 반복적으로 포함된 게시글입니다.",
    createdAt: "2025-02-01T10:15:00",
    writerNickname: "유리",
    writerEmail: "yuri@example.com",
  },
  {
    type: "REPORT",
    id: 4,
    title: "광고성 링크가 반복적으로 포함된 게시글입니다.",
    status: "PENDING",
    content: "광고성 링크가 반복적으로 포함된 게시글입니다.",
    createdAt: "2025-02-01T10:15:00",
    writerNickname: "맹구",
    writerEmail: "maenggu@example.com",
  },
  {
    type: "REPORT",
    id: 3,
    title: "광고성 링크가 반복적으로 포함된 게시글입니다.",
    status: "PENDING",
    content: "광고성 링크가 반복적으로 포함된 게시글입니다.",
    createdAt: "2025-02-01T10:15:00",
    writerNickname: "유리",
    writerEmail: "yuri@example.com",
  },
  {
    type: "REPORT",
    id: 4,
    title: "광고성 링크가 반복적으로 포함된 게시글입니다.",
    status: "PENDING",
    content: "광고성 링크가 반복적으로 포함된 게시글입니다.",
    createdAt: "2025-02-01T10:15:00",
    writerNickname: "맹구",
    writerEmail: "maenggu@example.com",
  },
];

export const MOCK_ADMIN_INQUIRY_LIST: AdminReportItem[] = [
  {
    type: "INQUIRY",
    id: 1,
    title: "광고성 링크가 반복적으로 포함된 게시글입니다.",
    status: "PENDING",
    content: "광고성 링크가 반복적으로 포함된 게시글입니다.",
    createdAt: "2025-02-01T10:15:00",
    writerNickname: "짱구",
    writerEmail: "jjanggu@example.com",
  },
  {
    type: "INQUIRY",
    id: 2,
    title: "광고성 링크가 반복적으로 포함된 게시글입니다.",
    status: "PENDING",
    content: "광고성 링크가 반복적으로 포함된 게시글입니다.",
    createdAt: "2025-02-01T10:15:00",
    writerNickname: "철수",
    writerEmail: "chulsoo@example.com",
  },
  {
    type: "INQUIRY",
    id: 3,
    title: "광고성 링크가 반복적으로 포함된 게시글입니다.",
    status: "PENDING",
    content: "광고성 링크가 반복적으로 포함된 게시글입니다.",
    createdAt: "2025-02-01T10:15:00",
    writerNickname: "유리",
    writerEmail: "yuri@example.com",
  },
  {
    type: "INQUIRY",
    id: 4,
    title: "광고성 링크가 반복적으로 포함된 게시글입니다.",
    status: "PENDING",
    content: "광고성 링크가 반복적으로 포함된 게시글입니다.",
    createdAt: "2025-02-01T10:15:00",
    writerNickname: "맹구",
    writerEmail: "maenggu@example.com",
  },
];

export const MOCK_REPORTS_DETAIL_DATA = {
  inquiryId: 1,
  title: "비회원 문의 제목입니다.",
  content: "문의 내용입니다.",
  inquiryType: "ACCOUNT_LOGIN" as InquiryType,
  userEmail: "asd@asd.com",
  createdAt: "2026-01-01T00:00:00",
  requestStatus: "RECEIVED" as ReportsType,
  status: "UNANSWERED" as ReplyStatus,
  comments: [],
};

export const MOCK_COMMENT_DATA = [
  {
    isAdmin: true,
    userImageUrl: "",
    userName: "관리자닉네임",
    content: "여기에 댓글 내용이 표기됩니다.",
    createdAt: "2025-05-06",
  },
  {
    isAdmin: false,
    userImageUrl: "",
    userName: "유저닉네임",
    content: "여기에 댓글 내용이 표기됩니다.",
    createdAt: "2025-05-06",
  },
];

export const MOCK_WITHDRAW_REASON_LIST: WithdrawUserItem[] = [
  {
    userId: 1,
    nickname: "짱구",
    email: "zzanggu@example.com",
    role: "USER",
    createdAt: "2026-10-20",
    deletedAt: "2026-10-20",
    withdrawalReason: "NOT_USING",
    withdrawalOtherReason: null,
  },
  {
    userId: 2,
    nickname: "철수",
    email: "chulsoo@example.com",
    role: "USER",
    createdAt: "2026-10-19",
    deletedAt: "2026-10-19",
    withdrawalReason: "DUPLICATE_ACCOUNT",
    withdrawalOtherReason: null,
  },
  {
    userId: 3,
    nickname: "유리",
    email: "yuri@example.com",
    role: "USER",
    createdAt: "2026-10-18",
    deletedAt: "2026-10-18",
    withdrawalReason: "OTHER",
    withdrawalOtherReason: "기타",
  },
];

export const MOCK_ADMIN_GUEST_INQUIRY_LIST: AdminGuestInquiryItem = {
  inquiryId: 1,
  title: "광고성 링크가 반복적으로 포함된 게시글입니다.",
  inquiryType: "SUGGESTION",
  status: "PENDING",
  createdAt: "2025-02-01T10:15:00",
  userId: 1,
  userNickname: "짱구",
  userEmail: "[EMAIL_ADDRESS]",
  content: "여기에 문의 내용이 표기됩니다.",
  ip: "192.168.0.10",
};

export const MOCK_GUEST_INQUIRY_DETAIL_DATA = {
  title: "여기에 문의 제목이 표기됩니다.",
  userName: "asdfasdfasdfasda@naver.com",
  createdAt: "2025-10-20",
  content: "여기에 신고 내용이 표기됩니다.",
  status: "RECEIVED" as ReportsType,
  replyStatus: "ANSWERED" as ReplyStatus,
};
