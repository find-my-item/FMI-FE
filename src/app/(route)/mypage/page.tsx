import { cookies } from "next/headers";
import { MypageContainer } from "./_components";

const page = async () => {
  const cookieStore = await cookies();
  const hasToken = cookieStore.has("access_token");

  return <MypageContainer hasToken={hasToken} />;
};

export default page;
