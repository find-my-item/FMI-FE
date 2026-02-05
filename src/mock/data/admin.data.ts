import { NoticeItem } from "@/api/fetch/notice";

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

import { AdminInquiryItem, AdminReportItem } from "@/api/fetch/admin";
import { ReplyStatus, ReportsType } from "@/types";

export const MOCK_ADMIN_REPORT_LIST: AdminReportItem[] = [
  {
    reportId: 1,
    targetType: "POST",
    targetId: 101,
    reportType: "SPAM",
    status: "PENDING",
    reason: "광고성 링크가 반복적으로 포함된 게시글입니다.",
    adminNote: null,
    createdAt: "2025-02-01T10:15:00",
    updatedAt: "2025-02-01T10:15:00",
    resolvedAt: null,
    reporterId: 11,
    reporterNickname: "짱구",
    reporterEmail: "jjanggu@example.com",
  },
  {
    reportId: 2,
    targetType: "COMMENT",
    targetId: 202,
    reportType: "ABUSE",
    status: "RECEIVED",
    reason: "욕설이 포함된 댓글입니다.",
    adminNote: "내용 확인 완료, 조치 필요",
    createdAt: "2025-02-02T14:30:00",
    updatedAt: "2025-02-03T09:10:00",
    resolvedAt: null,
    reporterId: 12,
    reporterNickname: "철수",
    reporterEmail: "chulsoo@example.com",
  },
  {
    reportId: 3,
    targetType: "USER",
    targetId: 303,
    reportType: "HARASSMENT",
    status: "ANSWERED",
    reason: "지속적인 괴롭힘 메시지를 보냅니다.",
    adminNote: "해당 사용자 7일 이용 정지 처리",
    createdAt: "2025-01-28T18:45:00",
    updatedAt: "2025-01-29T11:20:00",
    resolvedAt: "2025-01-29T11:20:00",
    reporterId: 13,
    reporterNickname: "유리",
    reporterEmail: "yuri@example.com",
  },
  {
    reportId: 4,
    targetType: "CHAT",
    targetId: 404,
    reportType: "ADULT",
    status: "PENDING",
    reason: "부적절한 성인 내용이 포함된 채팅입니다.",
    adminNote: null,
    createdAt: "2025-02-04T08:05:00",
    updatedAt: "2025-02-04T08:05:00",
    resolvedAt: null,
    reporterId: 14,
    reporterNickname: "맹구",
    reporterEmail: "maenggu@example.com",
  },
];

export const MOCK_ADMIN_INQUIRY_LIST: AdminInquiryItem[] = [
  {
    inquiryId: 1,
    title: "계정 로그인이 되지 않습니다",
    inquiryType: "PRIVATE",
    category: "ACCOUNT",
    status: "RECEIVED",
    createdAt: "2025-02-01T09:20:00",

    userId: 101,
    userNickname: "짱구",
    userEmail: "jjanggu@example.com",

    ip: "192.168.0.10",
  },
  {
    inquiryId: 2,
    title: "결제 내역 확인 요청드립니다",
    inquiryType: "PRIVATE",
    category: "PAYMENT",
    status: "PENDING",
    createdAt: "2025-02-02T13:45:00",

    userId: 102,
    userNickname: "철수",
    userEmail: "chulsoo@example.com",

    ip: "192.168.0.21",
  },
  {
    inquiryId: 3,
    title: "부적절한 게시글 신고 관련 문의",
    inquiryType: "PRIVATE",
    category: "REPORT_ISSUE",
    status: "ANSWERED",
    createdAt: "2025-01-30T17:10:00",

    userId: 103,
    userNickname: "유리",
    userEmail: "yuri@example.com",

    ip: "192.168.0.35",
  },
  {
    inquiryId: 4,
    title: "서비스 이용 중 오류가 발생합니다",
    inquiryType: "PRIVATE",
    category: "TECHNICAL",
    status: "RECEIVED",
    createdAt: "2025-02-04T08:00:00",

    userId: 104,
    userNickname: "맹구",
    userEmail: "maenggu@example.com",

    ip: "192.168.0.48",
  },
];

export const MOCK_REPORTS_DETAIL_DATA = {
  title: "실제 분실물/습득물이 아닌 내용이에요.",
  userName: "유저닉네임",
  createdAt: "2025-05-06",
  content: "여기에 신고 내용이 표기됩니다.",
  status: "RECEIVED" as ReportsType,
  replyStatus: "ANSWERED" as ReplyStatus,
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
