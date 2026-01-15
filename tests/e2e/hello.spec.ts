import { test, expect } from "@playwright/test";

test.describe("서비스 소개 페이지", () => {
  test("페이지 진입 시 주요 UI가 정상적으로 렌더링되고 CTA가 동작한다", async ({ page }) => {
    // 1. 서비스 소개 페이지 진입
    await page.goto("/hello");

    // 2. 메인 타이틀 노출 확인
    await expect(page.getByRole("heading", { name: "서비스소개 페이지" })).toBeVisible();

    // 3. 핵심 섹션 렌더링 확인
    await expect(page.locator("[data-testid='intro-section']")).toBeVisible();

    // 4. 하단 CTA 버튼 확인
    const ctaButton = page.getByRole("link", { name: "찾아줘 홈으로 이동" });
    await expect(ctaButton).toBeVisible();

    // 5. CTA 버튼 클릭
    await ctaButton.click();

    // 6. CTA 클릭 후 이동 검증
    await expect(page).toHaveURL("/");
  });
});
