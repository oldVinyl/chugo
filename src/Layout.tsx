import "./App.css";
import Sidebar from "./components/Sidebar";
import Topbar from "./components/Topbar";
import { Outlet } from "react-router-dom";

const Layout: React.FC = () => (
  <div className="flex flex-col gap-2 p-2 min-h-screen w-full max-w-screen bg-[--bg]">
    <Topbar />
    <div className="flex h-full w-full gap-2">
      <Sidebar />
      <div className="flex-1 overflow-hidden pl-[7vw] h-[85vh]">
        <Outlet />
      </div>
    </div>
  </div>
);

export default Layout;
