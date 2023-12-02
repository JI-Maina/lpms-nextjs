import { useState } from "react";

import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import MobileSidebar from "./MobileSidebar";

const Layout = () => {
  const [mobileSidebar, setMobileSidebar] = useState<boolean>(false);

  const toggleSidebar = () => {
    setMobileSidebar(!mobileSidebar);
  };

  return (
    <>
      <Sidebar />

      {mobileSidebar && <MobileSidebar />}

      <main className="w-full md:w-[calc(100%-256px)] md:ml-64  min-h-screen">
        <Navbar toggleSidebar={toggleSidebar} />
      </main>
    </>
  );
};

export default Layout;
