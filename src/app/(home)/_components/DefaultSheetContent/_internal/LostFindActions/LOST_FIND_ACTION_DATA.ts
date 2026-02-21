const LOST_FIND_ACTION_DATA = [
  {
    type: "lost",
    title: "분실 신고",
    positionImage: "/main/LostFindActions/lost-position.svg",
    markImage: {
      src: "/main/LostFindActions/question.svg",
      size: {
        width: 21.39,
        height: 33.41,
      },
    },
    bagImage: "/main/LostFindActions/lost-bag.svg",
    messageImage: "/main/LostFindActions/lost-message.svg",
    bgColor: "bg-[#FFEFAD]",
  },
  {
    type: "found",
    title: "습득 신고",
    positionImage: "/main/LostFindActions/found-position.svg",
    markImage: {
      src: "/main/LostFindActions/exclamation.svg",
      size: {
        width: 16,
        height: 64,
      },
    },
    bagImage: "/main/LostFindActions/found-bag.svg",
    messageImage: "/main/LostFindActions/found-message.svg",
    bgColor: "bg-fill-brand-subtle-hover",
  },
] as const;

export default LOST_FIND_ACTION_DATA;
