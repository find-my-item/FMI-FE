"use client";

export const copyCurrentUrl = async () => {
  const origin = window.location.origin;
  const pathname = window.location.pathname;
  const search = window.location.search;
  const hash = window.location.hash;

  const url = `${origin}${pathname}${search}${hash}`;
  await navigator.clipboard.writeText(url);

  // TODO(지권): alert 대신 toast로 변경
  alert("URL이 복사되었습니다.");
};
