import { NextRequest, NextResponse } from "next/server";
import { parseStringPromise } from "xml2js";
import { PublicLostPortalItem } from "./PublicLostPortalItem";

/**
 * @author jikwon
 * @description 공공데이터 포털(경찰청) 분실물 조회 API 프록시 라우트
 * @description 분실물 조회 API에서 분실물 조회 시 날짜 파라미터가 비어있거나 검색 기간이 너무 길면 500(99) 서버 에러가 발생합니다.
 * @description 최대 허용 검색 기간 제한이 있으므로 기본값은 1개월로 설정합니다.
 */
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);

  const ATC_ID = searchParams.get("atcId") || "";
  const PRDT_CL_CD_01 = searchParams.get("PRDT_CL_CD_01") || "";
  const LST_LCT_CD = searchParams.get("LST_LCT_CD") || "";

  const now = new Date();
  const defaultEnd = now.toISOString().slice(0, 10).replace(/-/g, "");
  now.setMonth(now.getMonth() - 1);
  const defaultStart = now.toISOString().slice(0, 10).replace(/-/g, "");

  const START_YMD = searchParams.get("START_YMD")?.replace(/-/g, "") || defaultStart;
  const END_YMD = searchParams.get("END_YMD")?.replace(/-/g, "") || defaultEnd;
  const pageNo = searchParams.get("pageNo") || "1";
  const numOfRows = searchParams.get("numOfRows") || "10";

  const apiKey = process.env.PUBLIC_DATA_PORTAL_API_KEY;

  if (!apiKey) {
    return NextResponse.json({ error: "API 키가 설정되지 않았습니다." }, { status: 500 });
  }

  const baseUrl = ATC_ID
    ? "https://apis.data.go.kr/1320000/LostGoodsInfoInqireService/getLostGoodsDetailInfo"
    : "https://apis.data.go.kr/1320000/LostGoodsInfoInqireService/getLostGoodsInfoAccToClAreaPd";

  const params = new URLSearchParams();

  if (ATC_ID) {
    params.append("ATC_ID", ATC_ID);
    params.append("LST_SN", "1");
  } else {
    if (PRDT_CL_CD_01) params.append("PRDT_CL_CD_01", PRDT_CL_CD_01);
    if (LST_LCT_CD) params.append("LST_LCT_CD", LST_LCT_CD);

    params.append("START_YMD", START_YMD);
    params.append("END_YMD", END_YMD);

    params.append("pageNo", pageNo);
    params.append("numOfRows", numOfRows);
  }

  const finalUrl = `${baseUrl}?serviceKey=${apiKey}&${params.toString()}`;

  try {
    const response = await fetch(finalUrl, {
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
      const bodyItems = res.body?.items?.item || [];
      const itemList = Array.isArray(bodyItems) ? bodyItems : [bodyItems];

      const normalizedItems = itemList.map((item: PublicLostPortalItem) => ({
        atcId: item.atcId || item.lstId || item.MANAGE_ID || "",
        depPlace: item.lstLctNm || item.lstPlace || item.LS_PLC || "",
        fdFilePathImg: item.lstFilePathImg || "",
        fdPrdtNm: item.lstPrdtNm || item.LS_THNG_DTLS || "",
        fdSbjt: item.lstSbjt || item.NOTI_CONT || "",
        fdYmd: item.lstYmd || item.LS_DE || "",
        prdtClNm: item.prdtClNm || item.THNG_CLASS_NM || "",
        rnum: item.rnum || "1",
      }));

      return NextResponse.json({
        items: { item: normalizedItems },
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
