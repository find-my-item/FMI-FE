import { hasValidToken } from "@/utils/hasValidToken/hasValidToken";
import ClientDetail from "./_components/ClientDetail/ClientDetail";

interface ListDetailProps {
  params: Promise<{ id: string }>;
}

const page = async ({ params }: ListDetailProps) => {
  const { id } = await params;

  const isLoggedIn = await hasValidToken();

  return <ClientDetail id={Number(id)} isLoggedIn={isLoggedIn} />;
};

export default page;
