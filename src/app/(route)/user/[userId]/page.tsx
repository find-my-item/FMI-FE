import { UserProfileDetailHeader, UserProfileView } from "./_components";
import type { Metadata } from "next";

interface PageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id } = await params;

  const user = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users/${id}/meta`, {
    next: { revalidate: 60 },
  }).then((res) => res.json());

  const title = `${user.nickname}`;

  return {
    title,
  };
}

const Page = () => {
  return (
    <>
      <UserProfileDetailHeader />

      <UserProfileView />
    </>
  );
};

export default Page;
