import Link from "next/link";
import { Button, Icon } from "@/components/common";

interface ErrorViewProps {
  code: string;
  title: string;
  description: React.ReactNode;
  iconName: "NotFound" | "ServerError";
}

const ErrorView = ({ code, title, description, iconName }: ErrorViewProps) => {
  return (
    <main className="min-h-screen flex-col-center">
      <Icon name={iconName} size={74} />

      <section className="space-y-12">
        <header className="gap-[6px] flex-col-center">
          <div className="gap-[10px] py-1 flex-col-center">
            <h1 className="text-title2-medium text-layout-header-default">{code}</h1>
            <h2 className="text-h2-bold text-layout-header-default">{title}</h2>
          </div>

          <p className="text-center text-body2-regular text-layout-body-default">{description}</p>
        </header>

        <footer className="flex-center">
          <Button as={Link} href="/" variant="outlined" replace className="min-h-11">
            홈으로 이동하기
          </Button>
        </footer>
      </section>
    </main>
  );
};

export default ErrorView;
