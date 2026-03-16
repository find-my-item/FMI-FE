import { PublicClientDetail } from "./_components";

interface PublicDataDetailProps {
  params: Promise<{ id: string }>;
}

const page = async ({ params }: PublicDataDetailProps) => {
  const { id } = await params;

  return <PublicClientDetail id={Number(id)} />;
};

export default page;
