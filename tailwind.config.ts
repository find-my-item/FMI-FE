import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}", // 컴포넌트/페이지 경로
  ],
  theme: {
    extend: {}, // 커스텀 테마 확장
  },
  plugins: [],
} satisfies Config;
