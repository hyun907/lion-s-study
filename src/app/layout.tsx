import type { Metadata } from "next";
import "./styles/globals.css";
import "./styles/reset.css";
import localFont from "next/font/local";

const pretendard = localFont({
  src: "./fonts/PretendardVariable.woff2",
  weight: "45 920",
  display: "swap"
});

export const metadata: Metadata = {
  title: "사자의 서재",
  description: "[멋쟁이사자처럼] 사자의 서재"
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" className={pretendard.className}>
      <body className={pretendard.className}>{children}</body>
    </html>
  );
}
