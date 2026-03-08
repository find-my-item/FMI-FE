import { GetNoticesResponse, NoticeItem } from "@/api/fetch/notice/types/NoticesType";

export const MOCK_NOTICE_ITEM: NoticeItem = {
  noticeId: 1,
  title: "서비스 점검 안내",
  category: "MAINTENANCE",
  pinned: true,
  viewCount: 100,
  likeCount: 12,
  thumbnailUrl: null,
  createdAt: "2024-01-01T00:00:00",
  isNew: true,
  isHot: false,
};

export const MOCK_NOTICE_ITEMS: NoticeItem[] = [
  {
    noticeId: 1,
    title: "서비스 점검 안내",
    category: "MAINTENANCE",
    pinned: true,
    viewCount: 320,
    likeCount: 24,
    thumbnailUrl: null,
    createdAt: "2025-03-01T09:00:00",
    isNew: true,
    isHot: true,
  },
  {
    noticeId: 2,
    title: "이벤트: 분실물 찾기 캠페인",
    category: "EVENT",
    pinned: true,
    viewCount: 156,
    likeCount: 42,
    thumbnailUrl: null,
    createdAt: "2025-02-28T14:30:00",
    isNew: true,
    isHot: false,
  },
  {
    noticeId: 3,
    title: "앱 업데이트 안내 (v1.2.0)",
    category: "UPDATE",
    pinned: false,
    viewCount: 89,
    likeCount: 8,
    thumbnailUrl: null,
    createdAt: "2025-02-25T11:00:00",
    isNew: false,
    isHot: false,
  },
  {
    noticeId: 4,
    title: "개인정보 처리방침 변경 안내",
    category: "IMPORTANT",
    pinned: false,
    viewCount: 234,
    likeCount: 5,
    thumbnailUrl: null,
    createdAt: "2025-02-20T16:00:00",
    isNew: false,
    isHot: true,
  },
  {
    noticeId: 5,
    title: "일반 공지사항 안내",
    category: "GENERAL",
    pinned: false,
    viewCount: 67,
    likeCount: 3,
    thumbnailUrl: null,
    createdAt: "2025-02-15T10:00:00",
    isNew: false,
    isHot: false,
  },
];

export const MOCK_NOTICES_RESPONSE_FIRST_PAGE: GetNoticesResponse = {
  isSuccess: true,
  code: "COMMON200",
  message: "성공입니다.",
  result: {
    content: MOCK_NOTICE_ITEMS.slice(0, 3),
    nextCursor: 4,
    hasNext: true,
  },
};

export const MOCK_NOTICES_RESPONSE_LAST_PAGE: GetNoticesResponse = {
  isSuccess: true,
  code: "COMMON200",
  message: "성공입니다.",
  result: {
    content: MOCK_NOTICE_ITEMS,
    nextCursor: null,
    hasNext: false,
  },
};

export const MOCK_NOTICES_RESPONSE: GetNoticesResponse = {
  isSuccess: true,
  code: "COMMON200",
  message: "성공입니다.",
  result: {
    content: MOCK_NOTICE_ITEMS,
    nextCursor: null,
    hasNext: false,
  },
};
