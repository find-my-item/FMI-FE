import NotFound from "@/app/not-found";
import { Terms } from "@/components/domain";

interface PageProps {
  params: Promise<{ termName: string }>;
}

export default async function Page({ params }: PageProps) {
  const { termName } = await params;

  if (termName === "privacy") {
    return <Terms termName="privacyPolicyAgreed" />;
  }

  if (termName === "marketingConsent") {
    return <Terms termName="marketingConsentAgreed" />;
  } else return <NotFound />;
}
