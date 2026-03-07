import { NoticeCategory } from "@/types";

export type NoticeCategoryFormValue = "" | NoticeCategory;

export interface NoticeWriteFormValues {
  title: string;
  content: string;
  category: NoticeCategoryFormValue;
  images: File[];
}
