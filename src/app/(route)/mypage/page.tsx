import { MyPageContainer } from "./_components";
import { hasValidToken } from "./_utils/hasValidToken";

const page = async () => {
  const hasToken = await hasValidToken();

  return <MyPageContainer hasToken={hasToken} />;
};

export default page;
