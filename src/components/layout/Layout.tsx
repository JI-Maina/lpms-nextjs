import Navbar from "./Navbar";
import Sidebar from "./Sidebar";

const Layout = () => {
  return (
    <>
      <Sidebar />
      <main className="w-[calc(100%-256px)] ml-64 bg-gray-50 min-h-screen">
        <Navbar />
      </main>
    </>
  );
};

export default Layout;
