import { CategoryType, PostType } from "@/types";

export interface PostWriteFormValues {
  postType: PostTypeFormValue;
  title: string;
  date: string;
  address: string;
  latitude: number | null;
  longitude: number | null;
  content: string;
  radius: number | null;
  category: CategoryFormValue;
  temporarySave: boolean;
  images: { file: File; previewUrl: string }[];
}

export type CategoryFormValue = "" | CategoryType;
export type PostTypeFormValue = "" | PostType;
