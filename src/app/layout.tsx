import { Footer, Header } from "@/components";
import "./globals.css";
import Providers from "@/providers/QueryProviders";
import { ToastProvider } from "@/providers/ToastProviders";
import { Analytics } from "@vercel/analytics/next";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className="mx-auto max-w-[390px] border-2 flex-col-center">
        <Providers>
          <ToastProvider>
            <Header />
            {children}
            <Footer />
            <Analytics />
          </ToastProvider>
        </Providers>
      </body>
    </html>
  );
}
