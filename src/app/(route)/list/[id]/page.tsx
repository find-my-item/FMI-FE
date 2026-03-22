import { hasValidToken } from "@/utils/hasValidToken/hasValidToken";
import ClientDetail from "./_components/ClientDetail/ClientDetail";
import type { Metadata } from "next";

interface ListDetailProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: ListDetailProps): Promise<Metadata> {
  const { id } = await params;

  const post = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/posts/${id}/share`, {
    next: { revalidate: 600 },
  }).then((res) => res.json());

  const title = `${post?.result?.title ?? "물품"} | ${post?.result?.address ?? "주소"}`;
  const description = post?.result?.summary ?? "리스트 상세";
  const thumbnailUrl =
    post?.result?.thumbnailUrl ??
    "https://fmi-project-s3-bucket.s3.ap-northeast-2.amazonaws.com/9e619169-f_default-share.png";

  return {
    title,
    description,
    openGraph: {
      images: [
        {
          url: thumbnailUrl,
          alt: title,
        },
      ],
    },
    twitter: {
      images: [thumbnailUrl],
    },
  };
}

const page = async ({ params }: ListDetailProps) => {
  const { id } = await params;

  const isLoggedIn = await hasValidToken();

  return <ClientDetail id={Number(id)} isLoggedIn={isLoggedIn} />;
};

export default page;
