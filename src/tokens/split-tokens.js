import * as fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

// 현재 파일의 절대 경로 가져오기
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// tokens.json 파일 읽기 (절대 경로 사용)
const tokensPath = path.join(__dirname, "tokens.json");
const tokens = JSON.parse(fs.readFileSync(tokensPath, "utf-8"));

// `$metadata.tokenSetOrder`에 정의된 키들을 가져오기
const tokenSets = tokens.$metadata.tokenSetOrder;

// 각 키에 따라 파일 생성
await tokenSets.forEach((set) => {
  // tokenSetOrder 의 키가 'comp'인 경우, 해당 키는 파일로 생성하지 않음
  // Tokens Studio for Figma에서 comp 를 inactive 했는데도 파일이 생성되는 이슈가 있어서 추가
  if (set === "comp") return;

  if (tokens[set]) {
    const data = JSON.stringify(tokens[set], null, 2);
    const outputPath = path.join(__dirname, `sd-${set}.json`);
    fs.writeFileSync(outputPath, data);
    console.log(`sd-${set}.json 파일이 생성되었습니다.`);
  }
});

console.log("JSON 파일 분리가 완료되었습니다.");
