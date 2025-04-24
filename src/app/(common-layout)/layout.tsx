import TopBar from "@/app/_component/common/TopBar";
import Footer from "../_component/common/Footer";

export default function Layout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <TopBar />
      {children}
      <Footer />
    </>
  );
}
