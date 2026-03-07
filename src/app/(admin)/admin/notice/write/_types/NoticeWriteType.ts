import { NoticeCategory } from "@/types";

export interface NoticeWriteFormValues {
  title: string;
  content: string;
  category: NoticeCategory;
  images: File[];
}
