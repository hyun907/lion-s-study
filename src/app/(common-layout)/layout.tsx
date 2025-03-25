export default function Layout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      {/* 헤더 */}
      {children}
      {/* 푸터 */}
    </>
  );
}
