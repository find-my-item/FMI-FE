import { Suspense } from "react";
import NotFound from "@/app/not-found";
import PostEditPage from "./_components/PostEditPage";

interface PageProps {
  params: Promise<{ id: string }>;
}

const Page = async ({ params }: PageProps) => {
  const { id } = await params;
  const postId = Number(id);

  if (isNaN(postId)) return <NotFound />;

  return (
    <Suspense fallback={null}>
      <PostEditPage postId={postId} />
    </Suspense>
  );
};

export default Page;
