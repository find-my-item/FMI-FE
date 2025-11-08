type ImageItem = {
  src: string;
  width: number;
  height: number;
  colSpan?: number;
};

export const getImageLayout = (images: string[] = []): ImageItem[] => {
  const count = images.length;
  if (count === 0) return [];

  // 1장: 148x148 하나 배치
  if (count === 1) {
    return [{ src: images[0], width: 148, height: 148, colSpan: 2 }];
  }

  // 2장: 148x148 두 개가 가로로 배치
  if (count === 2) {
    return images.map((src) => ({
      src,
      width: 148,
      height: 148,
      colSpan: 1,
    }));
  }

  // 3장: 96x96 정사각형 3개가 가로로 배치
  if (count === 3) {
    return images.map((src) => ({
      src,
      width: 96,
      height: 96,
      colSpan: 1,
    }));
  }

  // 4장: 96x96 정사각형 2x2 배치
  if (count === 4) {
    return images.map((src) => ({
      src,
      width: 96,
      height: 96,
      colSpan: 1,
    }));
  }

  // 5장: 첫 줄 148x96 두 개, 두번째 줄 96x96 3개 배치
  if (count === 5) {
    return [
      { src: images[0], width: 148, height: 96 },
      { src: images[1], width: 148, height: 96 },
      { src: images[2], width: 96, height: 96 },
      { src: images[3], width: 96, height: 96 },
      { src: images[4], width: 96, height: 96 },
    ];
  }

  return [];
};
