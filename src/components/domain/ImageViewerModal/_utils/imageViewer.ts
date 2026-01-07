// 이미지 다운로드
export const downloadImage = (blobUrl: string, fileName = "image.png") => {
  const a = document.createElement("a");
  a.href = blobUrl;
  a.download = fileName;
  a.click();
};
