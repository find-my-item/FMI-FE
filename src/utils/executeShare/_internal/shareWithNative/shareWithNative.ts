"use client";

import { PostMetaDataItemWithLink } from "@/types";

type NativeMetaData = Omit<PostMetaDataItemWithLink, "thumbnailUrl">;

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
