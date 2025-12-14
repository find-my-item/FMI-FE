import { Footer, Header } from "@/components";
import "./globals.css";
import Providers from "@/providers/QueryProviders";
import { ToastProvider } from "@/providers/ToastProviders";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import localFont from "next/font/local";
import Script from "next/script";

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
      <head>
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="apple-mobile-web-app-title" content="찾아줘!" />
        <link rel="apple-touch-icon" href="/icons/icon-192x192.png" />
        <Script
          async
          src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_ID}`}
        />
        <Script
          id="gtag-init"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
      gtag('config', '${process.env.NEXT_PUBLIC_GA_ID}');
    `,
          }}
        />
      </head>
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
