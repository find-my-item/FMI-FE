import { Footer } from "@/components/layout";
import "./globals.css";
import Providers from "@/providers/QueryProviders";
import { ToastProvider } from "@/providers/ToastProviders";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import localFont from "next/font/local";
import Script from "next/script";
import { Metadata } from "next";
import MSWProvider from "@/providers/MSWProvider";

const pretendard = localFont({
  src: "../../public/fonts/PretendardVariable.woff2",
  variable: "--font-pretendard",
});

export const metadata: Metadata = {
  title: "찾아줘!",
  description: "분실물 찾기 서비스",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const isProd = process.env.VERCEL_ENV === "production";
  const gaId = process.env.NEXT_PUBLIC_GA_ID;
  const clarityId = process.env.NEXT_PUBLIC_CLARITY_ID;

  return (
    <html lang="ko" className={pretendard.variable}>
      <head>
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="apple-mobile-web-app-title" content="찾아줘!" />
        <link rel="apple-touch-icon" href="/icons/icon-192x192.png" />
      </head>
      <body className="mx-auto max-w-[390px] border-2 flex-col-center">
        {isProd && gaId && (
          <>
            <Script
              strategy="afterInteractive"
              src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
            />
            <Script
              id="gtag-init"
              strategy="afterInteractive"
              dangerouslySetInnerHTML={{
                __html: `
                  window.dataLayer = window.dataLayer || [];
                  function gtag(){dataLayer.push(arguments);}
                  gtag('js', new Date());
                  gtag('config', '${gaId}');
                `,
              }}
            />
          </>
        )}
        {isProd && clarityId && (
          <Script
            id="clarity-script"
            strategy="afterInteractive"
            dangerouslySetInnerHTML={{
              __html: `
              (function(c,l,a,r,i,t,y){
                c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
                t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
                y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
              })(window, document, "clarity", "script", "${clarityId}");
            `,
            }}
          />
        )}
        <Providers>
          <ToastProvider>
            <MSWProvider />
            <main className="w-full">{children}</main>
            <Footer />
          </ToastProvider>
          <Script
            src="https://t1.kakaocdn.net/kakao_js_sdk/2.7.7/kakao.min.js"
            integrity="sha384-tJkjbtDbvoxO+diRuDtwRO9JXR7pjWnfjfRn5ePUpl7e7RJCxKCwwnfqUAdXh53p"
            crossOrigin="anonymous"
            strategy="afterInteractive"
          />
          {isProd && (
            <>
              <Analytics />
              <SpeedInsights />
            </>
          )}
        </Providers>
      </body>
    </html>
  );
}
