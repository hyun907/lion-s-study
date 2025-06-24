import { Analytics } from "@vercel/analytics/next";
import type { Metadata } from "next";
import "@toast-ui/editor/dist/toastui-editor.css";
import "./styles/globals.css";
import "./styles/reset.css";
import Modal from "./_component/common/Modal";
import Script from "next/script";

export const metadata: Metadata = {
  title: "사자의 서재",
  description: "[멋쟁이사자처럼] 사자의 서재",
  icons: {
    icon: [{ url: "/favicon.ico" }, { url: "/favicon.ico", type: "/favicon.ico" }]
  },
  openGraph: {
    type: "website",
    url: "https://lion-s-study.vercel.app/",
    title: "사자의 서재",
    description: "숭실대 멋쟁이사자처럼 사자의 서재 사이트입니다.",
    siteName: "사자의 서재",
    images: [
      {
        url: "/og-image.png",
        width: 800,
        height: 400,
        alt: "사자의 서재"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "사자의 서재",
    description: "숭실대 멋쟁이사자처럼 사자의 서재 사이트입니다.",
    images: ["/og-image.png"]
  }
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" style={{ fontFamily: "Pretendard, sans-serif" }}>
      <head>
        <meta property="og:title" content="사자의 서재" />
        <meta property="og:description" content="숭실대 멋쟁이사자처럼 사자의 서재 사이트입니다." />
        <meta property="og:image" content="/og-image.png" />
        <meta property="og:image:width" content="800" />
        <meta property="og:image:height" content="400" />
        <meta property="og:url" content="https://lion-s-study.vercel.app/" />
        <meta property="og:type" content="website" />
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-WVQRZ7YXGX"
          strategy="afterInteractive"
        />
        <Script id="gtag-init" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){ dataLayer.push(arguments); }
            gtag('js', new Date());
            gtag('config', 'G-WVQRZ7YXGX');
          `}
        </Script>
      </head>
      <body>
        <div id="modal-root" />
        <Modal />
        {children}
        <Analytics />;
      </body>
    </html>
  );
}
