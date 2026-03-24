import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get("query");

  if (!query) {
    return NextResponse.json({ error: "Query is required" }, { status: 400 });
  }

  const apiKey = process.env.VWORLD_API_KEY;
  const vworldUrl = `https://api.vworld.kr/req/search?service=search&request=search&key=${apiKey}&query=${encodeURIComponent(query)}&type=address&category=road`;

  try {
    // Vercel(AWS) IP에서 요청할 때 브이월드 방화벽(WAF)이 차단하는 것을 막기 위해
    // 브라우저와 유사한 User-Agent와 Referer 헤더를 강제로 주입합니다.
    const response = await fetch(vworldUrl, {
      cache: "no-store", // Next.js의 fetch 캐싱을 비활성화하여 항상 최신 결과를 가져옵니다.
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
        Referer: "https://www.finditem.kr",
        Accept: "application/json",
      },
    });

    if (!response.ok) {
      // Vworld API에서 4xx, 5xx 에러가 났을 때 .json() 파싱 에러(500)를 막습니다.
      console.error(`Vworld API failed with status: ${response.status}`);
      return NextResponse.json(
        { error: `External API error: ${response.status}` },
        { status: response.status }
      );
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    // try 로직 내부에서 뻗으면 여기까지 옵니다. (DNS 에러, TimeOut 등)
    console.error("Exception in fetch:", error);
    return NextResponse.json(
      { error: "Failed to fetch address", details: String(error) },
      { status: 500 }
    );
  }
}
