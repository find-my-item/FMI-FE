export const SHARE = [
  { id: "kakao", src: "/share/share-kakao.svg", name: "카카오톡" },
  { id: "native", src: "/share/share-native.svg", name: "공유하기" },
  { id: "copy", src: "/share/share-copy.svg", name: "링크 복사" },
] as const;

export type ShareId = (typeof SHARE)[number]["id"];
