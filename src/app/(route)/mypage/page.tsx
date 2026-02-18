import { cookies } from "next/headers";
import { MyPageContainer } from "./_components";

const page = async () => {
  const cookieStore = await cookies();
  const hasToken = cookieStore.has("refresh_token");

  return <MyPageContainer hasToken={hasToken} />;
};

export default page;
