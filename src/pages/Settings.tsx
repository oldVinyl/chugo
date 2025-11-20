import React from "react";
import {
  MailIcon,
  PhoneIcon,
  IDIcon,
  ForwardIcon,
  HashIcon,
  UploadIcon,
  ProfileIcon,
} from "../assets/Icons";
import pfp from "../assets/userPfp.jpg";
import businesspfp from "../assets/restaurantPlaceholder.png";

const GeneralDetailsPanel: React.FC = () => (
  <div className="flex-1 bg-white p-4 md:p-8 rounded-3xl space-y-6 overflow-auto no-scrollbar">
    <div className="flex flex-col items-center mb-6">
      <img
        src={pfp}
        className="w-24 h-24 rounded-full bg-gray-200 overflow-hidden"
      />
      <div className="flex flex-col items-center mt-2">
        <UploadIcon />
        <p className="text-sm text-gray-500">Profile image</p>
      </div>
    </div>

    <h3 className="text-lg font-semibold text-gray-500">General Details</h3>

    <div className="space-y-1">
      <label className="text-sm font-medium text-gray-500">Name</label>
      <div className="flex items-center border border-gray-300 rounded-lg px-3 py-2 bg-white">
        <span className="text-gray-400 mr-2">
          <ProfileIcon className="w-5 h-5" />
        </span>
        <input
          type="text"
          defaultValue="John Agblo"
          className="flex-1 focus:outline-none placeholder-gray-400 text-gray-800"
        />
      </div>
    </div>

    <div className="space-y-1">
      <div className="flex gap-4 items-center">
        <label className="text-sm font-medium text-gray-500">Email</label>
        <span className="text-xs bg-[var(--blue)] text-white px-2 py-0.5 rounded-full font-medium">
          Not Verified
        </span>
      </div>
      <div className="flex items-center border border-gray-300 rounded-lg px-3 py-2 bg-white">
        <MailIcon className="w-5 h-5 text-gray-400 mr-2" />
        <input
          type="email"
          defaultValue="agblod27@gmail.com"
          className="flex-1 focus:outline-none text-gray-800"
        />
      </div>
    </div>

    <div className="space-y-1">
      <label className="text-sm font-medium text-gray-500">Number</label>
      <div className="flex items-center border border-gray-300 rounded-lg px-3 py-2 bg-white">
        <PhoneIcon className="w-5 h-5 text-gray-400 mr-2" />
        <input
          type="text"
          defaultValue="0558871870"
          className="flex-1 focus:outline-none text-gray-800"
        />
      </div>
    </div>

    <div className="space-y-1">
      <div className="flex gap-4 items-center">
        <label className="text-sm font-medium text-gray-500">National ID</label>
        <span className="text-xs bg-[var(--blue)] text-white px-2 py-0.5 rounded-full font-medium">
          Verified
        </span>
      </div>
      <div className="flex items-center border border-gray-300 rounded-lg px-3 py-2 bg-white">
        <IDIcon className="w-5 h-5 text-gray-400 mr-2" />
        <input
          type="text"
          defaultValue="AgHDKFL34658"
          className="flex-1 focus:outline-none text-gray-800"
        />
      </div>
    </div>
  </div>
);

const BusinessDetailsPanel: React.FC = () => (
  <div className="flex-1 bg-white p-4 rounded-3xl space-y-6 overflow-auto no-scrollbar">
    <div className="flex flex-col items-center mb-6">
      <img
        src={businesspfp}
        className="w-20 h-20 rounded-full bg-gray-100 p-2 border border-gray-200 overflow-hidden"
      />
      <div className="flex flex-col items-center mt-2">
        <UploadIcon />
        <p className="text-sm text-gray-500">Business image</p>
      </div>
    </div>

    <div className="space-y-1">
      <label
        htmlFor="business-name"
        className="text-sm font-medium text-gray-700"
      >
        Business name
      </label>
      <div className="flex items-center border border-gray-300 rounded-lg px-3 py-2 bg-white">
        <HashIcon className="w-5 h-5 text-gray-400 mr-2" />
        <input
          id="business-name"
          type="text"
          placeholder="Name"
          className="flex-1 focus:outline-none placeholder-gray-400 text-gray-800"
        />
      </div>
    </div>

    <div className="space-y-1">
      <label
        htmlFor="business-location"
        className="text-sm font-medium text-gray-700"
      >
        Location
      </label>
      <div className="flex items-center justify-between border border-gray-300 rounded-lg px-3 py-2 bg-white cursor-pointer">
        <span className="flex items-center flex-1 text-gray-800">Location</span>
        <ForwardIcon className="w-5 h-5 text-gray-400 ml-2" />
      </div>
    </div>

    <div className="space-y-1">
      <label
        htmlFor="call-line-1"
        className="text-sm font-medium text-gray-700"
      >
        Call line
      </label>
      <div className="flex items-center border border-gray-300 rounded-lg px-3 py-2 bg-white">
        <HashIcon className="w-5 h-5 text-gray-400 mr-2" />
        <input
          id="call-line-1"
          type="text"
          defaultValue="0552892433"
          className="flex-1 focus:outline-none placeholder-gray-400 text-gray-800"
        />
      </div>
    </div>

    <div className="space-y-1">
      <label
        htmlFor="call-line-2"
        className="text-sm font-medium text-gray-700"
      >
        Call line 2
      </label>
      <div className="flex items-center border border-gray-300 rounded-lg px-3 py-2 bg-white">
        <HashIcon className="w-5 h-5 text-gray-400 mr-2" />
        <input
          id="call-line-2"
          type="text"
          defaultValue="08899"
          className="flex-1 focus:outline-none placeholder-gray-400 text-gray-800"
        />
      </div>
    </div>

    <button className="w-full mt-10 py-3 text-white font-semibold rounded-lg bg-black hover:scale-95 active:scale-105 hover:bg-gray-800 transition duration-200">
      Save
    </button>
  </div>
);

function Settings() {
  return (
    <div className="h-full w-full">
      <div className="w-full h-full rounded-2xl">
        <div className="min-h-screen">
          <div className="flex flex-col lg:flex-row gap-3 h-[85vh]">
            <GeneralDetailsPanel />
            <BusinessDetailsPanel />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Settings;
