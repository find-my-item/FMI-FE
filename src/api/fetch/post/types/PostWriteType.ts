import { CategoryType, PostType } from "@/types";

export interface PostWritePayload {
  request: PostWriteRequest;
  images: string[];
}

export interface PostWriteRequest {
  postType: PostType;
  title: string;
  date: string;
  address: string;
  latitude: number;
  longitude: number;
  content: string;
  radius: number;
  category: CategoryType;
  temporarySave: boolean;
}
