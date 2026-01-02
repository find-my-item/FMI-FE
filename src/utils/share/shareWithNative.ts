"use client";

type MetaData = {
  title: string;
  summary: string;
  link: string;
};

export const shareWithNative = async ({ metaData }: { metaData: MetaData }) => {
  if (!navigator.share) return;

  const { title, summary, link } = metaData;

  try {
    await navigator.share({
      title,
      text: summary,
      url: link,
    });
  } catch (error) {
    if ((error as DOMException).name !== "AbortError") {
    }
  }
};
