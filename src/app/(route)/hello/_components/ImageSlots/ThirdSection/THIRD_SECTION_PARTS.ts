export const PHONE = {
  src: "/hello/third/service-phone-layout.svg",
  width: 200,
  height: 270,
} as const;

export const SIDE_MESSAGES = [
  {
    src: "/hello/third/service-left-message.svg",
    width: 50,
    height: 50,
    className: "absolute bottom-[16px] left-[-42px]",
  },
  {
    src: "/hello/third/service-right-message.svg",
    width: 56,
    height: 56,
    className: "absolute right-[-40px] top-[100px]",
  },
] as const;

export const CHAT_ITEMS = [
  {
    src: "/hello/third/service-inner-parts-01.svg",
    width: 50,
    height: 50,
    className: "self-center",
  },
  {
    src: "/hello/third/service-inner-parts-02.svg",
    width: 145,
    height: 38,
    className: "mt-[7px] self-end",
  },
] as const;

export const CHAT_STACK_LEFT = [
  { src: "/hello/third/service-inner-parts-03.svg", width: 44, height: 20 },
  { src: "/hello/third/service-inner-parts-04.svg", width: 126, height: 38 },
  { src: "/hello/third/service-inner-parts-05.svg", width: 68, height: 20 },
] as const;

export const CHAT_LAST = {
  src: "/hello/third/service-inner-parts-06.svg",
  width: 145,
  height: 38,
  className: "mt-[7px] self-end chat-animate",
};
