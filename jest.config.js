module.exports = {
  preset: "ts-jest",
  testEnvironment: "jsdom",
  setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"],
  transform: {
    "^.+\\.(ts|tsx)$": [
      "ts-jest",
      { tsconfig: { jsx: "react-jsx" } }, // JSX 변환 보장
    ],
    "^.+\\.svg$": "jest-transformer-svg", // SVG 변환 추가
  },
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/src/$1",
    "\\.(css|scss|sass|less)$": "identity-obj-proxy",
  },
  testMatch: ["**/?(*.)+(test|spec).(ts|tsx)"],
};
