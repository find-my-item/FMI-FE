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
    const response = await fetch(vworldUrl);
    const data = await response.json();

    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch address" }, { status: 500 });
  }
}
