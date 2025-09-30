import { Footer, Header } from "@/components";
import "./globals.css";
import Providers from "@/providers/QueryProviders";
import { ToastProvider } from "@/providers/ToastProviders";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className="flex-col-center mx-auto max-w-[390px] border-2">
        <Providers>
          <ToastProvider>
            <Header />
            {children}
            <Footer />
          </ToastProvider>
        </Providers>
      </body>
    </html>
  );
}
