import { Outlet } from "react-router-dom";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";

export default function MainLayout() {
  return (
    <>
      <Navbar />

      <main className="min-h-screen">
        <Outlet />
      </main>

      <Footer />
    </>
  );
}