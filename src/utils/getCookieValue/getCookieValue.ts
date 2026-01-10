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
