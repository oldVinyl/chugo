import "./App.css";
import Sidebar from "./components/Sidebar";
import Topbar from "./components/Topbar";
import { Outlet } from "react-router-dom";

const Layout: React.FC = () => (
  <div className="flex flex-col gap-2 lg:p-2 max-lg:py-2 min-h-screen w-full max-w-screen bg-[--bg]">
    <Topbar />
    <div className="lg:flex h-full w-full gap-2">
      <Sidebar />
      <div className="flex-1 md:overflow-hidden lg:pl-[7vw] max-lg:w-full md:h-[85vh] max-lg:h-auto max-lg:overflow-visible">
        <Outlet />
      </div>
    </div>
  </div>
);

export default Layout;
