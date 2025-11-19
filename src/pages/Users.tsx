import { useState } from "react";
import { Users as mockUsers } from "../api/mock/Users";
import { BinIcon, UploadIcon } from "../assets/Icons";
import type { User } from "../types";

const UserListItem: React.FC<{ user: User; setActiveUser: (user: User) => void }> = ({ user, setActiveUser }) => (
  <div 
    onClick={() => setActiveUser(user)}
    className="flex justify-between h-full items-center p-4 rounded-full bg-[var(--bg)] transition hover:bg-gray-200 cursor-pointer">
    <div className="flex items-center">
      <div className="mr-4 w-10 h-10">
        <img className="rounded-full" src={user.image} alt={user.name} />
      </div>
      <span className="text-gray-800 font-medium">{user.name}</span>
    </div>
    <div className="flex items-center text-gray-500">
      <span className="mr-4">~{user.role}</span>
      <button>
        <BinIcon />
      </button>
    </div>
  </div>
);

const StatusPanel: React.FC<{ activeUser?: User }> = ({ activeUser }) => {
  if (!activeUser) return <p className="p-6 bg-white rounded-2xl w-full h-full">Select a User to see their details</p>;

  return (
    <div className="p-6 bg-white rounded-2xl w-full h-full">
      <h3 className="text-xl font-semibold mb-4 text-gray-800">Status</h3>

      <div className="flex flex-col items-center mb-4 gap-2">
        <div className="w-28 h-28 flex items-center justify-center rounded-full border-4" style={{ borderColor: 'var(--acc)' }}>
          <img src={activeUser.image} alt={activeUser.name} className="w-20 h-20 rounded-full object-cover" />
        </div>
        <div className="flex flex-col items-center justify-center">
          <UploadIcon />
          <p className="text-sm text-gray-500">Profile image</p>
        </div>
      </div>

      <div className="space-y-2">
        <div className="relative">
          <select className="w-full p-3 rounded-lg border appearance-none">
            <option value={activeUser.role}>{activeUser.role}</option>
            <option value="staff">Staff</option>
            <option value="user">User</option>
            <option value="admin">Admin</option>
          </select>
          <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
            <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
            </svg>
          </div>
        </div>

        <input type="text" value={activeUser.username} placeholder="Username" className="w-full p-3 rounded-lg border focus:outline-none" />
        <input type="password" value={activeUser.passkey.toString()} placeholder="Passkey" className="w-full p-3 rounded-lg border focus:outline-none" />

        <div className="flex space-x-6 pt-2">
          <label className="flex items-center text-sm font-medium cursor-pointer">
            <input type="radio" name="user-role" checked={activeUser.role === 'staff'} className="hidden" />
            <span className="w-4 h-4 mr-2 border rounded-full flex items-center justify-center transition-all duration-200" style={{ backgroundColor: activeUser.role === 'staff' ? 'var(--acc)' : 'white' }}>
              {activeUser.role === 'staff' && <span className="w-2 h-2 rounded-full bg-white"></span>}
            </span>
            Staff
          </label>

          <label className="flex items-center text-sm font-medium cursor-pointer">
            <input type="radio" name="user-role" checked={activeUser.role === 'admin'} className="hidden" />
            <span className="w-4 h-4 mr-2 border rounded-full flex items-center justify-center" style={{ borderColor: 'var(--bord)', backgroundColor: activeUser.role === 'admin' ? 'var(--acc)' : 'white' }}>
              {activeUser.role === 'admin' && <span className="w-2 h-2 rounded-full bg-white"></span>}
            </span>
            Admin
          </label>
        </div>

        <button className="w-full py-3 mt-10 text-white font-semibold rounded-lg transition duration-200" style={{ backgroundColor: 'black' }}>
          Upload
        </button>
      </div>
    </div>
  );
};

function Users() {
  const [activeUser, setActiveUser] = useState<User | undefined>(undefined);

  return (
    <div className="h-full w-full">
      <div className="w-full h-full rounded-2xl">
        <div className="min-h-screen">
          <div className="flex flex-col lg:flex-row gap-3">
            <div className="lg:w-2/3 h-full space-y-2 p-4 rounded-xl bg-white">
              {mockUsers.map((user, idx) => (
                <UserListItem key={idx} user={user} setActiveUser={setActiveUser} />
              ))}
            </div>

            <div className="lg:w-1/3 h-full">
              <StatusPanel activeUser={activeUser} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Users;