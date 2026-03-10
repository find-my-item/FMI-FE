import { Terms } from "@/components/domain";
import { ErrorView } from "@/components/state";

export default async function Page({ params }: { params: { termName: string } }) {
  const { termName } = await params;

  if (termName === "privacy") {
    return <Terms termName="privacyPolicyAgreed" />;
  }

  if (termName === "marketing") {
    return <Terms termName="marketingConsent" />;
  } else {
    return (
      <ErrorView
        iconName="NotFound"
        code="404"
        title="페이지를 찾을 수 없습니다."
        description={
          <>
            존재하지 않는 주소를 입력했거나 <br />
            요청하신 페이지를 사용할 수 없습니다.
          </>
        }
      />
    );
  }
}
