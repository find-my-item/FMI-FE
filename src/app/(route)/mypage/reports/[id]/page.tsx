import MyReportsDetailContainer from "./_components/MyReportsDetailContainer/MypageReportsDetailContainer";

interface ReportDetailProps {
  params: Promise<{ id: number }>;
}

const page = async ({ params }: ReportDetailProps) => {
  const { id } = await params;

  return <MyReportsDetailContainer />;
};

export default page;
