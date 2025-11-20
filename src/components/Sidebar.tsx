import {
  AnalyticsIcon,
  BasketIcon,
  HomeIcon,
  LogoutIcon,
  QRCodeScanIcon,
  SettingsIcon,
  UploadMenuIcon,
  UserManagementIcon,
  WalletIcon,
} from "../assets/Icons";
import { NavLink } from "react-router-dom";

const SidebarLink: React.FC<{
  to: string;
  Icon: React.FC<React.SVGProps<SVGSVGElement>>;
}> = ({ to, Icon }) => (
  <NavLink
    to={to}
    className={({ isActive }) =>
      `rounded-full h-[4.25vw] w-[4.25vw] flex justify-center items-center transition-colors
      ${isActive ? "bg-[var(--acc)]" : "bg-[var(--bg)] hover:bg-gray-300"}`
    }
  >
    <Icon className="h-[2vw] w-[2vw] hidden lg:block" />
  </NavLink>
);

const Sidebar: React.FC = () => (
  <div className=" max-lg:hidden absolute left-2.5 flex w-[6vw] min-w-[60px] h-[var(--sidebar-cont-h)] flex-col justify-end">
    <div className="bg-white h-[var(--sidebar-h)] rounded-full flex flex-col justify-between p-2 overflow-hidden ">
      <nav className="flex flex-col justify-start items-center gap-[0.35vw]">
        <SidebarLink to="/home" Icon={HomeIcon} />
        <SidebarLink to="/basket" Icon={BasketIcon} />
        <SidebarLink to="/wallet" Icon={WalletIcon} />
        <SidebarLink to="/analytics" Icon={AnalyticsIcon} />
        <SidebarLink to="/upload" Icon={UploadMenuIcon} />
        <SidebarLink to="/scan" Icon={QRCodeScanIcon} />
      </nav>
      <nav className="flex flex-col justify-end items-center gap-[0.35vw]">
        <SidebarLink to="/settings" Icon={SettingsIcon} />
        <SidebarLink to="/users" Icon={UserManagementIcon} />
        <SidebarLink to="/" Icon={LogoutIcon} />
      </nav>
    </div>
  </div>
);

export default Sidebar;
