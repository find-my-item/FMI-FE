import { http, HttpResponse } from "msw";
import { postsDb } from "../db/posts.db";

export const postsHandlers = [
  // 게시글 목록 조회
  http.get("/api/posts", ({ request }) => {
    const url = new URL(request.url);
    const type = url.searchParams.get("type");
    const page = Number(url.searchParams.get("page") ?? "0");
    const size = Number(url.searchParams.get("size") ?? "10");

    const all = postsDb.list();
    const filtered = type ? all.filter((p) => p.postType === type) : all;

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
    const post = postsDb.get(id);
    if (!post) return HttpResponse.json({ message: "NOT_FOUND" }, { status: 404 });
    return HttpResponse.json({ result: post }, { status: 200 });
  }),
];
