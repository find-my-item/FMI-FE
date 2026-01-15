"use client";

export const shareWithCopyUrl = async () => {
  const url = window.location.href;

  try {
    await navigator.clipboard.writeText(url);
    // TODO(지권): alert 대신 toast로 변경
    alert("URL이 복사되었습니다.");
  } catch {
    window.prompt("링크를 복사하세요.", url);
  }
};
