import TopBar from "@/app/_component/common/TopBar";

export default function Layout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <TopBar />
      {children}
      {/* 푸터 */}
    </>
  );
}
