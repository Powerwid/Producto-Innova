import { Outlet } from "react-router-dom";
import Header from "@layouts/Header/header";
import Sidebear from "@layouts/sidebear/sidebear";
import Footer from "@layouts/Footer/footer";
import { useState } from "react";

export default function App() {

  const [sidebarOpen, setSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setSidebarOpen(prev => !prev);
  };

  return (
    <div className="flex min-h-screen">
      <Sidebear isOpen={sidebarOpen}/>

      <div className="flex flex-col flex-1">
        <Header toggleSidebar={toggleSidebar} isSidebarOpen={sidebarOpen} />

        <main className="flex-1 overflow-y-auto">
          <Outlet />
        </main>

        <Footer />
      </div>
    </div>
  );
}
