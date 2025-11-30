type ImageItem = {
  src: string;
  width: number;
  height: number;
  colSpan?: number;
};

type LayoutConfig = {
  items: ImageItem[];
  containerClass: string;
  isSpecialLayout?: boolean;
};

type LayoutStrategy = (images: string[]) => LayoutConfig;

// 각 이미지 개수별 레이아웃 전략
const LAYOUT_STRATEGIES: Record<number, LayoutStrategy> = {
  1: (images) => ({
    items: [{ src: images[0], width: 148, height: 148, colSpan: 2 }],
    containerClass: "grid gap-2 grid-cols-1",
  }),

  2: (images) => ({
    items: images.map((src) => ({
      src,
      width: 148,
      height: 148,
      colSpan: 1,
    })),
    containerClass: "grid gap-2 grid-cols-2",
  }),

  3: (images) => ({
    items: images.map((src) => ({
      src,
      width: 96,
      height: 96,
      colSpan: 1,
    })),
    containerClass: "grid gap-2 grid-cols-3",
  }),

  4: (images) => ({
    items: images.map((src) => ({
      src,
      width: 96,
      height: 96,
      colSpan: 1,
    })),
    containerClass: "grid gap-2 grid-cols-2",
  }),

  5: (images) => ({
    items: [
      { src: images[0], width: 148, height: 96 },
      { src: images[1], width: 148, height: 96 },
      { src: images[2], width: 96, height: 96 },
      { src: images[3], width: 96, height: 96 },
      { src: images[4], width: 96, height: 96 },
    ],
    isSpecialLayout: true,
    containerClass: "flex flex-col gap-2",
  }),
};

export const getImageLayout = (images: string[] = []): LayoutConfig => {
  const count = images.length;

  if (count === 0) {
    return { items: [], containerClass: "" };
  }

  const strategy = LAYOUT_STRATEGIES[count];

  return strategy ? strategy(images) : { items: [], containerClass: "" };
};

// 이미지 그룹을 특수 레이아웃용으로 분할 (5장 전용)
export const getSpecialLayoutGroups = (items: ImageItem[]) => {
  return {
    topRow: items.slice(0, 2),
    bottomRow: items.slice(2),
  };
};
