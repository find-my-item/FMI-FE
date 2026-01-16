import ClientDetail from "./_components/ClientDetail/ClientDetail";

interface ListDetailProps {
  params: Promise<{ id: number }>;
}

const page = async ({ params }: ListDetailProps) => {
  const { id } = await params;

  return (
    <>
      <ClientDetail id={id} />
    </>
  );
};

export default page;
