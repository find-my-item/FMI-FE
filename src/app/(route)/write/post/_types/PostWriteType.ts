import { CategoryType, PostType } from "@/types";

export interface PostWriteFormValues {
  postType: PostTypeFormValue;
  title: string;
  date: string;
  address: string;
  latitude: number;
  longitude: number;
  content: string;
  radius: number;
  category: CategoryFormValue;
  temporarySave: boolean;
  images: { file: File; previewUrl: string }[];
}

export type CategoryFormValue = "" | CategoryType;
export type PostTypeFormValue = "" | PostType;
