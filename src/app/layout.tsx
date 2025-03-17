import type { Metadata } from "next";
import "./globals.css";

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
    <html lang="ko">
      <body className={"추후 폰트 적용"}>{children}</body>
    </html>
  );
}
