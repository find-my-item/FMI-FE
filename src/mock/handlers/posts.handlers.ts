import { http, HttpResponse } from "msw";
import { MOCK_POST_ITEMS, MOCK_POST_DEFAULT_DETAIL } from "../data/posts.data";

// 게시글 목록 조회
export const postsHandlers = [
  http.get("/api/posts", ({ request }) => {
    const url = new URL(request.url);

    const type = url.searchParams.get("type");
    const page = Number(url.searchParams.get("page") ?? "0");
    const size = Number(url.searchParams.get("size") ?? "10");

    const filtered =
      type === "LOST" || type === "FOUND"
        ? MOCK_POST_ITEMS.filter((p) => p.postType === type)
        : MOCK_POST_ITEMS;

    const start = page * size;
    const items = filtered.slice(start, start + size);

    return HttpResponse.json(
      {
        result: items,
        page,
        size,
        totalCount: filtered.length,
      },
      { status: 200 }
    );
  }),

  // 게시글 상세 조회
  http.get("/api/posts/:id", ({ params }) => {
    const id = Number(params.id);

    const detail = {
      ...MOCK_POST_DEFAULT_DETAIL,
      result: {
        ...MOCK_POST_DEFAULT_DETAIL.result,
        postId: id,
      },
    };

    return HttpResponse.json(detail, { status: 200 });
  }),
];
