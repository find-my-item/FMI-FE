import { cookies } from "next/headers";

export const hasValidToken = async () => {
  const cookieStore = await cookies();
  return cookieStore.has("refresh_token");
};
