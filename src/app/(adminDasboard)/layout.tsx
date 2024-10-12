import Navbar from "@/components/shared/Navbar";
import AdminSidebar from "@/components/sidebar/AdminSidebar";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "admin dashboard",
  description: "Gardening",
};

export default function CommonLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <body className={`antialiased`}>
      <Navbar />

      <div className="flex justify-center gap-16 items-start">
        <div className="  fixed left-0">
          <AdminSidebar />
        </div>
        <div className="w-[70%] ">{children}</div>
      </div>
    </body>
  );
}
