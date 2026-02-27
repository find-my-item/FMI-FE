import { CategoryType, PostType, ItemStatus } from "@/types";

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
  postStatus: ItemStatusFormValue;
  tempPostId?: number | null;
}

export type CategoryFormValue = "" | CategoryType;
export type PostTypeFormValue = "" | PostType;
export type ItemStatusFormValue = "" | ItemStatus;
