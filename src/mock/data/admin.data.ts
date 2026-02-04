import { ContentItems } from "@/api/fetch/admin";

export const MOCK_NOTICE_LIST: ContentItems = {
  items: {
    noticeId: 1,
    title: "[공지] 공지사항 제목",
    thumbnailUrl: "https://picsum.photos/400/300?random=1",
    likeCount: 12,
    viewCount: 24,
    createdAt: "2025-12-26 10:22:58",
    isNew: true,
    isHot: false,
    pinned: false,
    category: "공지",
  },
};
