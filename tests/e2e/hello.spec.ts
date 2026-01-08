import { test, expect } from "@playwright/test";

test.describe("서비스 소개 페이지", () => {
  test("페이지 진입 시 UI들이 정상적으로 렌더링 된다", async ({ page }) => {
    // 1. 페이지 이동
    await page.goto("/hello");

    // 2. 이메일 및 비밀번호 입력
    await page.fill('input[name="email"]', "test@example.com");
    await page.fill('input[name="password"]', "password123");

    // 3. 로그인 버튼 클릭
    await page.click('button[type="submit"]');

    // 4. 로그인 성공 확인
    await expect(page).toHaveURL("/"); // 로그인 성공 후 이동할 URL
    await expect(page.locator("text=Welcome")).toBeVisible(); // 로그인 후 보이는 특정 텍스트 확인
  });
});
