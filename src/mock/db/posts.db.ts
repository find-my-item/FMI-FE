import { MOCK_POST_DEFAULT_DETAIL, MOCK_POST_ITEMS } from "../data";
import { PostDetailData, PostItem } from "@/api/fetch/post";

export const postsDb = {
  list(): PostItem[] {
    return MOCK_POST_ITEMS;
  },

  get(id: number): PostDetailData | undefined {
    return MOCK_POST_DEFAULT_DETAIL.result;
  },
};
