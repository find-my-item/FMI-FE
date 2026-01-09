"use client";

import { MetaDataType } from "@/types";

type NativeMetaData = Omit<MetaDataType, "thumbnailUrl">;

export const shareWithNative = async ({ metaData }: { metaData: NativeMetaData }) => {
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
