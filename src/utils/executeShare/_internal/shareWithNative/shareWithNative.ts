"use client";

import { MetaDataItemWithLink } from "@/types/MetaDataType";

type NativeMetaData = Omit<MetaDataItemWithLink, "thumbnailUrl">;

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
