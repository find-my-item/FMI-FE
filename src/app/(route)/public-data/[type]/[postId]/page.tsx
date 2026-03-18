import { PublicClientDetail } from "./_components";

interface PublicDataDetailProps {
  params: Promise<{ postId: string }>;
}

const page = async ({ params }: PublicDataDetailProps) => {
  const { postId } = await params;

  return <PublicClientDetail id={postId} />;
};

export default page;
