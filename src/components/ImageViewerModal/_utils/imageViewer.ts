// 이미지 다운로드
export const downloadImage = (blobUrl: string, fileName = "image.png") => {
  const a = document.createElement("a");
  a.href = blobUrl;
  a.download = fileName;
  a.click();
};

// 이미지 인덱스 계산 (prev/next)
export const getPrevIndex = (currentIndex: number, length: number) =>
  currentIndex === 0 ? length - 1 : currentIndex - 1;

export const getNextIndex = (currentIndex: number, length: number) =>
  currentIndex === length - 1 ? 0 : currentIndex + 1;
