/**
 * @author suhyeon
 *
 * 헤더에서 쿠키 값을 추출하는 함수
 *
 * @returns 쿠키 value
 */

export const getCookieValue = ({
  name,
  cookieStrings,
}: {
  name: string;
  cookieStrings: string[];
}) => {
  const cookieString = cookieStrings.find((str) => str.includes(`${name}=`));

  if (!cookieString) return "";

  const [keyVal] = cookieString.split(";");
  const [, value] = keyVal.split("=");

  return value;
};
