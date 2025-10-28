import { Footer, Header } from "@/components";
import "./globals.css";
import Providers from "@/providers/QueryProviders";
import { ToastProvider } from "@/providers/ToastProviders";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import localFont from "next/font/local";

const pretendard = localFont({
  src: "../../public/fonts/PretendardVariable.woff2",
  variable: "--font-pretendard",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" className={pretendard.variable}>
      <body className="mx-auto max-w-[390px] border-2 flex-col-center">
        <Providers>
          <ToastProvider>
            <Header />
            {children}
            <Footer />
          </ToastProvider>
          <Analytics />
          <SpeedInsights />
        </Providers>
      </body>
    </html>
  );
}
