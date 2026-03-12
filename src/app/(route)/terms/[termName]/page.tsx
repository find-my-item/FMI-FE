import { Terms } from "@/components/domain";
import { notFound } from "next/navigation";

interface PageProps {
  params: Promise<{ termName: string }>;
}

export default async function Page({ params }: PageProps) {
  const { termName } = await params;

  if (termName === "privacy") {
    return <Terms termName="privacyPolicyAgreed" />;
  } else if (termName === "marketingConsent") {
    return <Terms termName="marketingConsentAgreed" />;
  } else notFound();
}
