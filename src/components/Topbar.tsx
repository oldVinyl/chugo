import { useState } from "react";
import {
  AnalyticsIcon,
  BasketIcon,
  HomeIcon,
  LogoutIcon,
  NotificationsIcon,
  QRCodeScanIcon,
  SearchIcon,
  SettingsIcon,
  UploadMenuIcon,
  UserManagementIcon,
  WalletIcon,
} from "../assets/Icons";
import logo from "../assets/logo.png"
import restaurantLogo from "../assets/restaurantPlaceholder.png";
import { NavLink } from "react-router-dom";

const SidebarLink: React.FC<{
  to: string;
  label: string;
  Icon: React.FC<React.SVGProps<SVGSVGElement>>;
  onClick?: () => void;
}> = ({ to, label, Icon, onClick }) => (
  <NavLink
    to={to}
    onClick={onClick}
    className={({ isActive }) =>
      `px-4 py-3 rounded-lg lg:hidden text-lg font-medium transition-colors flex items-center gap-3 ${
        isActive ? "bg-[var(--acc)]" : "hover:bg-gray-200"
      }`
    }
  >
    {Icon && <Icon className="h-6 w-6 lg:hidden inline"/>}
    {label}
  </NavLink>
);

export default function Topbar() {
  const [searchOpen, setSearchOpen] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="w-full h-[60px] flex justify-center items-center relative">
      {/* Desktop / md+ */}
      <div className="hidden md:grid grid-cols-2 w-full justify-between gap-[20%] items-center max-lg:px-2">
        <div className="flex justify-start items-center gap-2">
          <img src={logo} alt="chugo-logo" className="w-[90px] h-[60px]" />
          <div className="relative w-full h-full">
            <input
              className="bg-white w-full h-[60px] rounded-full pl-12 pr-4 focus:outline-none"
              type="search"
            />
            <SearchIcon className="absolute h-[15px] w-[15px] top-6 left-4" />
          </div>
        </div>
        <div className="flex justify-end items-center gap-2">
          <div className="bg-white h-[60px] rounded-full w-[60px] flex items-center justify-center">
            <NotificationsIcon className="h-[30px] w-[30px]" />
          </div>
          <div className="bg-white h-[60px] rounded-full w-fit p-2 pr-5 flex items-center gap-2 justify-center">
            <div>
              <img
                className="h-[50px] w-[50px]"
                src={restaurantLogo}
                alt="restaurant"
              />
            </div>
            <div>
              <p className="whitespace-nowrap">Sales Manager</p>
              <p className="whitespace-nowrap text-sm">Chickenman Pizzaman</p>
            </div>
          </div>

          {/* md-lg */}
          <button
            className="flex lg:hidden flex-col justify-center items-center w-10 h-10 relative z-40"
            onClick={() => setSidebarOpen(!sidebarOpen)}
          >
            <span
              className={`block h-1 w-5 bg-black rounded-full transition-all duration-300 ${
                sidebarOpen ? "rotate-45 translate-y-2" : ""
              }`}
            />
            <span
              className={`block h-1 w-5 bg-black my-1 transition-all rounded-full duration-300 ${
                sidebarOpen ? "opacity-0" : ""
              }`}
            />
            <span
              className={`block h-1 w-5 bg-black transition-all rounded-full duration-300 ${
                sidebarOpen ? "-rotate-45 -translate-y-2" : ""
              }`}
            />
          </button>
        </div>
      </div>

      {/* Mobile / <md */}
      <div className="flex md:hidden w-full justify-between items-center p-2">
        <img className="w-[70px]" src={logo} alt="chugo-logo" />

        <div className="flex items-center gap-2">
          <button
            className="bg-white h-[40px] w-[40px] rounded-full flex items-center justify-center"
            onClick={() => setSearchOpen(true)}
          >
            <SearchIcon className="h-[20px] w-[20px]" />
          </button>

          <div className="bg-white h-[40px] w-[40px] rounded-full flex items-center justify-center">
            <NotificationsIcon className="h-[20px] w-[20px]" />
          </div>

          <div className="bg-white h-[40px] w-[40px] rounded-full flex items-center justify-center overflow-hidden">
            <img
              className="h-full w-full object-cover"
              src={restaurantLogo}
              alt="restaurant"
            />
          </div>

          <button
            className="flex flex-col justify-center items-center w-10 h-10 relative z-40"
            onClick={() => setSidebarOpen(!sidebarOpen)}
          >
            <span
              className={`block h-1 w-5 bg-black rounded-full transition-all duration-300 ${
                sidebarOpen ? "rotate-45 translate-y-2" : ""
              }`}
            />
            <span
              className={`block h-1 w-5 bg-black my-1 transition-all rounded-full duration-300 ${
                sidebarOpen ? "opacity-0" : ""
              }`}
            />
            <span
              className={`block h-1 w-5 bg-black transition-all rounded-full duration-300 ${
                sidebarOpen ? "-rotate-45 -translate-y-2" : ""
              }`}
            />
          </button>
        </div>
      </div>

      <div
        className={`fixed lg:hidden inset-0 z-30 flex justify-end transition-all duration-300 ${
          sidebarOpen ? "pointer-events-auto" : "pointer-events-none"
        }`}
      >
        <div
          className={`absolute inset-0 bg-black/50 transition-opacity duration-300 ${
            sidebarOpen ? "opacity-100" : "opacity-0"
          }`}
          onClick={() => setSidebarOpen(false)}
        />
        <div
          className={`bg-white w-3/4 max-w-xs h-full p-6 pt-12 flex flex-col justify-between transform transition-transform duration-300 ease-in-out
          ${sidebarOpen ? "translate-x-0" : "translate-x-full"}`}
        >
          <nav className="flex flex-col gap-4 mt-6">
            <SidebarLink to="/home" Icon={HomeIcon} label="Home" onClick={() => setSidebarOpen(false)} />
            <SidebarLink to="/basket" Icon={BasketIcon} label="Basket" onClick={() => setSidebarOpen(false)} />
            <SidebarLink to="/wallet" Icon={WalletIcon} label="Wallet" onClick={() => setSidebarOpen(false)} />
            <SidebarLink to="/analytics" Icon={AnalyticsIcon} label="Analytics" onClick={() => setSidebarOpen(false)} />
            <SidebarLink to="/upload" Icon={UploadMenuIcon} label="Upload Menu" onClick={() => setSidebarOpen(false)} />
            <SidebarLink to="/scan" Icon={QRCodeScanIcon} label="Scan QR" onClick={() => setSidebarOpen(false)} />
          </nav>
          <nav className="flex flex-col gap-4 mt-6">
            <SidebarLink to="/settings" Icon={SettingsIcon} label="Settings" onClick={() => setSidebarOpen(false)} />
            <SidebarLink to="/users" Icon={UserManagementIcon}label="Users" onClick={() => setSidebarOpen(false)} />
            <SidebarLink to="/" Icon={LogoutIcon} label="Logout" onClick={() => setSidebarOpen(false)} />
          </nav>
        </div>
      </div>

      {searchOpen && (
        <div className="fixed inset-0 z-50 flex justify-center items-start pt-20 bg-black/50">
          <div className="relative bg-white py-4 px-2 pt-10 rounded-xl w-[90%] max-w-sm">
            <div className="flex items-center gap-2">
              <div className="relative w-full">
                <SearchIcon className="absolute h-5 w-5 right-3 top-2.5" />
                <input
                  type="search"
                  placeholder="Search..."
                  className="flex-1 w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none"
                />
              </div>
              <p className="absolute left-4 top-2">Looking for Something?</p>
              <button
                onClick={() => setSearchOpen(false)}
                className="absolute top-0 right-2 text-black font-bold rotate-45 text-3xl"
              >
                +
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
