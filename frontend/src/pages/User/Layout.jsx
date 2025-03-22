import { Footer, Navbar } from "@/components/common";
import { Outlet } from "react-router";

export default function Layout() {
  return (
    <>
      <Navbar />
      <Outlet />
      <Footer />
    </>
  );
}
