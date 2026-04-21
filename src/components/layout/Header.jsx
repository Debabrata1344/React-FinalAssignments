import React, { useState } from 'react';
import { Menu, Bell, ChevronDown, LogOut ,Wallet } from 'lucide-react';

const Header = ({ toggleSidebar }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [showProfile, setShowProfile] = useState(false);


  const userData = JSON.parse(localStorage.getItem("user_details")) || {};

  const userName = userData.userType || "User";

  const handleLogout = () => {
    localStorage.clear();
    window.location.href = '/login';
  };

  return (
    <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-6 z-10">

      {/* LEFT */}
      <button
        onClick={toggleSidebar}
        className="p-2 hover:bg-gray-100 rounded-lg text-gray-600"
      >
        <Menu size={24} />
      </button>

      

      {/* RIGHT */}
      <div className="flex items-center gap-6">
        
        
{/* WALLET BALANCE */}
<div className="flex items-center gap-2 ">

  <Wallet size={18} className="text-[#8B0000]" />

  <span className="text-sm font-semibold text-gray-700">
    ₹ 2,55,489.00
  </span>

</div>
        {/* Notification */}
        <div className="relative cursor-pointer">
          
          <Bell size={22} className="text-gray-500" />
          <span className="absolute -top-1 -right-1 bg-[#8B0000] text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-bold">
            9
          </span>
        </div>

        {/* Profile */}
        <div className="relative flex items-center gap-3 border-l border-gray-200 pl-4">

          {/* Avatar */}
          <div className="w-8 h-8 rounded-full bg-[#FFE4E4] border overflow-hidden">
            <img
              src="https://api.dicebear.com/7.x/avataaars/svg?seed=Stebin"
              alt="user"
            />
          </div>

          {/* Name */}
          <span className="text-sm font-semibold text-gray-700">
            {userName}
          </span>

          {/* Dropdown Toggle */}
          <button onClick={() => setMenuOpen(!menuOpen)}>
            <ChevronDown size={18} className="text-gray-500" />
          </button>

          {/* Dropdown */}
          {menuOpen && (
            <div className="absolute right-0 top-12 w-44 bg-white border border-gray-200 rounded-lg shadow-md z-50">

              {/* Profile Button */}
              <button
                onClick={() => {
                  setShowProfile(true);
                  setMenuOpen(false);
                }}
                className="w-full px-4 py-2 hover:bg-gray-100 text-sm text-left"
              >
                Profile
              </button>

              <button className="w-full px-4 py-2 hover:bg-gray-100 text-sm text-left">
                Change Password
              </button>

              <button
                onClick={handleLogout}
                className="w-full px-4 py-2 hover:bg-gray-100 text-sm text-red-600 text-left"
              >
                Logout
              </button>

            </div>
          )}

        </div>
      </div>

      {/* ================= PROFILE CARD ================= */}
{showProfile && (
  <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">

    <div className="bg-white w-[420px] rounded-xl shadow-lg p-6 relative">

      {/* Close */}
      <button
        onClick={() => setShowProfile(false)}
        className="absolute top-3 right-3 text-gray-500"
      >
        ✕
      </button>

      <h2 className="text-xl font-bold mb-4 text-[#8B0000]">
        User Profile
      </h2>

      {/* ✅ AVATAR SECTION */}
      <div className="flex flex-col items-center mb-5">

        <div className="w-20 h-20 rounded-full overflow-hidden border-2 border-[#8B0000]">
          <img
            src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${userData.userType || "user"}`}
            alt="avatar"
            className="w-full h-full"
          />
        </div>

        <p className="mt-2 font-semibold text-gray-700">
          {userData.firstName} {userData.lastName}
        </p>

        <p className="text-xs text-gray-500">
          {userData.userType}
        </p>

      </div>

      {/* DETAILS */}
      <div className="space-y-2 text-sm">

        <p><b>First Name:</b> {userData.firstName}</p>
        <p><b>Last Name:</b> {userData.lastName}</p>
        <p><b>Username:</b> {userData.user_name || userData.userName}</p>
        <p><b>Email:</b> {userData.email}</p>
        <p><b>Mobile:</b> {userData.mobileNumber}</p>
        <p><b>Role:</b> {userData.roleName}</p>
        <p><b>User Type:</b> {userData.userType}</p>
        <p><b>Admin Name:</b> {userData.adminName}</p>

      </div>

      <button
        onClick={() => setShowProfile(false)}
        className="mt-5 w-full bg-[#8B0000] text-white py-2 rounded-md"
      >
        Close
      </button>

    </div>
  </div>
)}
    </header>
  );
};

export default Header;