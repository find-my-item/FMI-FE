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
  images: { id?: number; file?: File; previewUrl: string }[];
  tempPostId?: number | null;
}

export type CategoryFormValue = "" | CategoryType;
export type PostTypeFormValue = "" | PostType;
