import { BlockUserItem } from "@/api/fetch/report";

export const MOCK_MYPAGE_COMMENTS_ITEM = [
  {
    commentId: 1,
    comment: "댓글 내용",
    mentionUser: "감자",
    createdAt: "2025-12-26T10:22:58",
    like: 34,
  },
  {
    commentId: 2,
    comment: "댓글 내용이 길어진다아ㅏ아아ㅏ아아아아아ㅏ아아아아아아ㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏ",
    createdAt: "2025-12-26T10:22:58",
    like: 34,
  },
  {
    commentId: 3,
    comment: "댓글 내용이 길어진다아ㅏ아아ㅏ아아아아아ㅏ아아아아아아ㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏ",
    createdAt: "2025-12-26T10:22:58",
    like: 34,
    thumbnailUrl: "https://picsum.photos/400/300?random=1",
  },
];

export const MOCK_USER_PROFILE = {
  userId: 1,
  nickname: "tester01",
  profileImg: "test_list.JPG",
  posts: [
    {
      postId: 1,
      title: "강남역 2호선 개찰구 근처에서 에어팟(화이트) 분실",
      summary: "12/26 오전 9시쯤 강남역 2호선...",
      thumbnailUrl: "https://picsum.photos/400/300?random=1",
      address: "서울특별시 강남구 강남대로 396",
      itemStatus: "SEARCHING",
      postType: "LOST",
      category: "ELECTRONICS",
      favoriteCount: 2,
      favoriteStatus: false,
      viewCount: null,
      createdAt: "2025-12-26 10:22:58",
      hot: false,
      new: false,
    },
  ],
  comments: [],
};

export const MOCK_MYPAGE_REPORTS = [
  {
    reportId: 1,
    status: "PENDING",
    targetTitle: "악성 댓글 신고합니다.",
    createdAt: "2024-01-22T14:30:00",
    reason: "지속적인 욕설과 비방을 일삼고 있어 신고합니다. 확인 부탁드립니다.",
  },
  {
    reportId: 2,
    status: "RECEIVED",
    targetTitle: "스팸 홍보 게시글",
    createdAt: "2024-01-15T09:15:00",
    reason: "커뮤니티 성격에 맞지 않는 불법 도박 사이트 홍보글입니다.",
  },
  {
    reportId: 3,
    status: "RESOLVED",
    targetTitle: "사용자 프로필 사진 부적절",
    createdAt: "2023-12-28T18:45:00",
    reason: "선정적인 이미지를 프로필로 사용하고 있습니다.",
  },
  {
    reportId: 4,
    status: "RESOLVED",
    targetTitle: "허위 사실 유포",
    createdAt: "2023-11-05T11:20:00",
    reason: "특정인에 대한 확인되지 않은 루머를 퍼뜨리고 있습니다.",
  },
] as const;

export const MOCK_MYPAGE_INQUIRIES = [
  {
    inquiryId: 1,
    status: "PENDING",
    targetTitle: "회원 탈퇴는 어떻게 하나요?",
    createdAt: "2024-03-10T14:20:00",
    reason: "마이페이지 설정에 들어갔는데 탈퇴 버튼이 보이지 않습니다. 경로를 알려주세요.",
  },
  {
    inquiryId: 2,
    status: "RECEIVED",
    targetTitle: "결제 내역 영수증 발급 요청",
    createdAt: "2024-03-05T09:30:00",
    reason: "지난달 프리미엄 이용권 결제 건에 대한 영수증을 이메일로 받고 싶습니다.",
  },
  {
    inquiryId: 3,
    status: "RESOLVED",
    targetTitle: "로그인이 자꾸 풀립니다.",
    createdAt: "2024-02-20T18:45:00",
    reason:
      "앱을 껐다가 켜면 로그인이 유지되지 않고 계속 다시 로그인해야 합니다. 해결 방법이 있나요?",
  },
  {
    inquiryId: 4,
    status: "RESOLVED",
    targetTitle: "닉네임 변경 횟수 제한 문의",
    createdAt: "2024-01-15T11:20:00",
    reason: "닉네임을 변경하려고 하는데 30일 제한이 걸려있네요. 실수로 바꾼 건데 복구 안 될까요?",
  },
] as const;

export const MOCK_MYPAGE_REQUEST_COMMENTS = [
  {
    commentId: 2,
    status: "admin",
    createdAt: "2024-02-10T14:30:00",
    content:
      "안녕하세요, 회원님. 찾아줘 관리자입니다. \n현재 해당 게시글에 대한 신고 내용을 확인 중이며, 작성자에게 소명 요청을 보낸 상태입니다. 조금만 기다려주시면 감사하겠습니다.",
  },
  {
    commentId: 3,
    status: "user",
    userNickname: "지갑찾는라이언",
    createdAt: "2024-02-11T09:15:00",
    content: "아 그렇군요. 답변 감사합니다. 확인되면 알림 부탁드립니다.",
  },
] as const;

export const MOCK_MYPAGE_ACTIVITY = [
  {
    activityId: 101,
    type: "POST",
    createdAt: "2026-01-30T18:00:00",
    title: "게시글을 작성했습니다.",
    subText: "제주도 여행 맛집 리스트 공유합니다!",
  },
  {
    activityId: 102,
    type: "COMMENT",
    createdAt: "2026-01-30T17:30:00",
    title: "댓글을 작성했습니다.",
    subText: "정말 좋은 정보네요. 감사합니다.",
  },
  {
    activityId: 103,
    type: "FAVORITE",
    createdAt: "2026-01-30T16:15:00",
    title: "게시글을 즐겨찾기했습니다.",
    subText: "2024년 프론트엔드 개발자 로드맵",
  },

  {
    activityId: 201,
    type: "INQUIRY",
    createdAt: "2026-01-29T14:00:00",
    title: "1:1 문의를 작성했습니다.",
    subText: "결제 오류 관련하여 문의드립니다.",
  },
  {
    activityId: 202,
    type: "INQUIRY",
    createdAt: "2026-01-29T13:00:00",
    title: "1:1 문의 답변이 완료되었습니다.",
    subText: "문의하신 내용에 대한 답변입니다.",
  },
] as const;

export const MOCK_MYPAGE_BLOCK_USER: BlockUserItem[] = [
  {
    userId: 1,
    profileImage: "",
    nickname: "사용자닉네임최대열자",
  },
  {
    userId: 2,
    profileImage: "",
    nickname: "사용자닉네임최대열자",
  },
  {
    userId: 3,
    profileImage: "",
    nickname: "사용자닉네임최대열자",
  },
];
