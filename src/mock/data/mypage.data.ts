export const MOCK_MYPAGE_COMMENTS_ITEM = [
  {
    commentId: 1,
    comment: "댓글 내용",
    mentionUser: "감자",
    date: "2026.01.15",
    like: 34,
  },
  {
    commentId: 2,
    comment: "댓글 내용이 길어진다아ㅏ아아ㅏ아아아아아ㅏ아아아아아아ㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏ",
    date: "2026.01.15",
    like: 34,
  },
  {
    commentId: 3,
    comment: "댓글 내용이 길어진다아ㅏ아아ㅏ아아아아아ㅏ아아아아아아ㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏ",
    date: "2026.01.15",
    like: 34,
    thumbnailUrl: "https://picsum.photos/400/300?random=1",
  },
];

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

export const MOCK_MYPAGE_POSTS_LIST = [
  {
    postId: 1,
    title: "아이폰 15 프로 맥스 분실했습니다 ㅠㅠ",
    summary:
      "강남역 11번 출구 근처에서 떨어뜨린 것 같아요. 투명 젤리 케이스 씌워져 있습니다. 꼭 좀 찾아주세요 사례하겠습니다.",
    thumbnailUrl: "https://picsum.photos/400/300?random=1",
    address: "서울특별시 강남구 역삼동",
    itemStatus: "SEARCHING",
    postType: "LOST",
    category: "ELECTRONICS",
    favoriteCount: 15,
    viewCount: 230,
    createdAt: "방금 전",
    hot: false,
    new: false,
  },
  {
    postId: 2,
    title: "검은색 가죽 지갑 습득했습니다",
    summary:
      "홍대 놀이터 벤치 위에 올려져 있었습니다. 안에 현금이랑 영수증 몇 장 들어있네요. 보관하고 있으니 연락주세요.",
    thumbnailUrl: "https://picsum.photos/400/300?random=2",
    address: "서울특별시 마포구 서교동",
    itemStatus: "SEARCHING",
    postType: "FOUND",
    category: "WALLET",
    favoriteCount: 8,
    viewCount: 45,
    createdAt: "1시간 전",
    hot: false,
    new: false,
  },
  {
    postId: 3,
    title: "신한 체크카드 주우신 분 계신가요?",
    summary:
      "오늘 아침 출근길에 버스 정류장에서 떨어뜨린 것 같습니다. 뒷면에 서명이 되어있지 않습니다.",
    thumbnailUrl: "https://picsum.photos/400/300?random=3",
    address: "경기도 성남시 분당구",
    itemStatus: "COMPLETED",
    postType: "LOST",
    category: "CARD",
    favoriteCount: 2,
    viewCount: 12,
    createdAt: "2일 전",
    hot: false,
    new: false,
  },
  {
    postId: 4,
    title: "갈색 푸들 강아지 보호 중입니다",
    summary:
      "목줄은 하고 있는데 인식표가 없네요. 겁이 많아서 구석에 웅크리고 있습니다. 주인분 빨리 연락 주세요.",
    thumbnailUrl: "https://picsum.photos/400/300?random=4",
    address: "서울특별시 송파구 잠실동",
    itemStatus: "SEARCHING",
    postType: "FOUND",
    category: "ANIMAL",
    favoriteCount: 56,
    viewCount: 1200,
    createdAt: "30분 전",
    hot: false,
    new: false,
  },
];

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
