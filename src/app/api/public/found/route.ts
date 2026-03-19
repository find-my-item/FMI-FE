import { NextRequest, NextResponse } from "next/server";
import { parseStringPromise } from "xml2js";

/**
 * @author jikwon
 * @description 공공데이터 포털(경찰청) 습득물 조회 API 프록시 라우트
 */
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);

  const ATC_ID = searchParams.get("atcId") || "";
  const PRDT_CL_CD_01 = searchParams.get("PRDT_CL_CD_01") || "";
  const PRDT_CL_CD_02 = searchParams.get("PRDT_CL_CD_02") || "";
  const FD_COL_CD = searchParams.get("FD_COL_CD") || "";
  const START_YMD = searchParams.get("START_YMD") || "";
  const END_YMD = searchParams.get("END_YMD") || "";
  const N_FD_LCT_CD = searchParams.get("N_FD_LCT_CD") || "";
  const pageNo = searchParams.get("pageNo") || "1";
  const numOfRows = searchParams.get("numOfRows") || "10";

  const apiKey = process.env.PUBLIC_DATA_PORTAL_API_KEY;

  if (!apiKey) {
    return NextResponse.json({ error: "API 키가 설정되지 않았습니다." }, { status: 500 });
  }

  const baseUrl = ATC_ID
    ? "https://apis.data.go.kr/1320000/LosfundInfoInqireService/getLosfundDetailInfo"
    : "https://apis.data.go.kr/1320000/LosfundInfoInqireService/getLosfundInfoAccToClAreaPd";

  const params = new URLSearchParams();
  if (ATC_ID) params.append("ATC_ID", ATC_ID);
  if (ATC_ID) params.append("FD_SN", "1");
  if (PRDT_CL_CD_01) params.append("PRDT_CL_CD_01", PRDT_CL_CD_01);
  if (PRDT_CL_CD_02) params.append("PRDT_CL_CD_02", PRDT_CL_CD_02);
  if (FD_COL_CD) params.append("FD_COL_CD", FD_COL_CD);
  if (START_YMD) params.append("START_YMD", START_YMD);
  if (END_YMD) params.append("END_YMD", END_YMD);
  if (N_FD_LCT_CD) params.append("N_FD_LCT_CD", N_FD_LCT_CD);
  params.append("pageNo", pageNo);
  params.append("numOfRows", numOfRows);

  const queryPrefix = `serviceKey=${apiKey}`;
  const url = `${baseUrl}?${queryPrefix}&${params.toString()}`;

  try {
    const response = await fetch(url, {
      method: "GET",
      next: { revalidate: 3600 },
    });

    if (!response.ok) {
      return NextResponse.json({ error: "포털 서버 연결 실패" }, { status: response.status });
    }

    const responseText = await response.text();

    const xmlResult = await parseStringPromise(responseText, { explicitArray: false });
    const res = xmlResult.response;

    if (res?.header?.resultCode === "00") {
      return NextResponse.json({
        items: res.body?.items || { item: [] },
        numOfRows: parseInt(res.body?.numOfRows || "10"),
        pageNo: parseInt(res.body?.pageNo || "1"),
        totalCount: parseInt(res.body?.totalCount || "0"),
      });
    }

    return NextResponse.json(
      { error: res?.header?.resultMsg || "포털 서버 응답 에러", code: res?.header?.resultCode },
      { status: 400 }
    );
  } catch (error: any) {
    return NextResponse.json({ error: "서버 내부 오류", message: error.message }, { status: 500 });
  }
}
