import React, { useState } from 'react';
import { createPortal } from 'react-dom';
import { Menu, Bell, ChevronDown, Wallet } from 'lucide-react';

const Header = ({ toggleSidebar }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [showProfile, setShowProfile] = useState(false);

  // Safely parse user details from localStorage
  const userData = JSON.parse(localStorage.getItem("user_details")) || {};
  const userNameDisplay = userData.userType || "User";

  const handleLogout = () => {
    localStorage.clear();
    window.location.href = '/login';
  };

  return (
    <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-6 relative z-30">
      
      {/* LEFT SECTION: Hamburger Menu */}
      <button
        onClick={toggleSidebar}
        className="p-2 hover:bg-gray-100 rounded-lg text-gray-600 transition-colors"
      >
        <Menu size={24} />
      </button>

      {/* RIGHT SECTION: Wallet, Notifications, and Profile */}
      <div className="flex items-center gap-6">
        
        {/* WALLET BALANCE */}
        <div className="flex items-center gap-2">
          <Wallet size={18} className="text-[#8B0000]" />
          <span className="text-sm font-semibold text-gray-700">
            ₹ 2,55,489.00
          </span>
        </div>

        {/* NOTIFICATIONS */}
        <div className="relative cursor-pointer group">
          <Bell size={22} className="text-gray-500 group-hover:text-gray-700" />
          <span className="absolute -top-1 -right-1 bg-[#8B0000] text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-bold border-2 border-white">
            9
          </span>
        </div>

        {/* PROFILE DROPDOWN */}
        <div className="relative flex items-center gap-3 border-l border-gray-200 pl-4">
          <div className="w-8 h-8 rounded-full bg-[#FFE4E4] border border-red-100 overflow-hidden">
            <img
              src="https://api.dicebear.com/7.x/avataaars/svg?seed=Stebin"
              alt="user"
            />
          </div>

          <span className="text-sm font-semibold text-gray-700 hidden md:block">
            {userNameDisplay}
          </span>

          <button 
            onClick={() => setMenuOpen(!menuOpen)}
            className="p-1 hover:bg-gray-50 rounded"
          >
            <ChevronDown size={18} className={`text-gray-500 transition-transform ${menuOpen ? 'rotate-180' : ''}`} />
          </button>

          {/* DROPDOWN MENU */}
          {menuOpen && (
            <>
              {/* Invisible backdrop to close menu when clicking outside */}
              <div className="fixed inset-0 z-40" onClick={() => setMenuOpen(false)}></div>
              
              <div className="absolute right-0 top-12 w-48 bg-white border border-gray-200 rounded-lg shadow-xl z-50 py-1">
                <button
                  onClick={() => {
                    setShowProfile(true);
                    setMenuOpen(false);
                  }}
                  className="w-full px-4 py-2 hover:bg-gray-50 text-sm text-left text-gray-700 flex items-center gap-2"
                >
                  Profile Details
                </button>
                <button className="w-full px-4 py-2 hover:bg-gray-50 text-sm text-left text-gray-700">
                  Change Password
                </button>
                <hr className="my-1 border-gray-100" />
                <button
                  onClick={handleLogout}
                  className="w-full px-4 py-2 hover:bg-red-50 text-sm text-red-600 text-left font-medium"
                >
                  Logout
                </button>
              </div>
            </>
          )}
        </div>
      </div>

{/* ================= COMPACT PROFILE MODAL ================= */}
{showProfile && (
  <div className="fixed inset-0 bg-black/40 backdrop-blur-[2px] flex items-center justify-center z-[9999] p-4">
    {/* max-w-[380px] makes it a true 'little card' */}
    <div className="bg-white w-full max-w-[380px] rounded-lg shadow-2xl p-5 relative border border-gray-100">
      
      {/* Title Section */}
      <div className="mb-5">
        <h2 className="text-xl font-bold text-slate-800">User Profile</h2>
        <p className="text-[13px] font-semibold text-gray-500">View personal information</p>
      </div>

      {/* Data List - Using a tighter layout */}
      <div className="space-y-2 text-[13px] text-gray-800">
        <div className="flex gap-2">
            <span className="font-bold min-w-[80px] text-gray-700">Name:</span> 
            <span className="truncate">{userData.firstName} {userData.lastName}</span>
        </div>
        <div className="flex gap-2">
            <span className="font-bold min-w-[80px] text-gray-700">Phone No:</span> 
            <span>{userData.mobileNumber || "N/A"}</span>
        </div>
        <div className="flex gap-2">
            <span className="font-bold min-w-[80px] text-gray-700">Email ID:</span> 
            <span className="truncate text-blue-600">{userData.email || "N/A"}</span>
        </div>
        <div className="flex gap-2">
            <span className="font-bold min-w-[80px] text-gray-700">Address:</span> 
            <span>{userData.address || "Patia"}</span>
        </div>
        <div className="flex gap-2">
            <span className="font-bold min-w-[80px] text-gray-700">State:</span> 
            <span>{userData.state || "Odisha"}</span>
        </div>
        <div className="flex gap-2">
            <span className="font-bold min-w-[80px] text-gray-700">User ID:</span> 
            <span>{userData.userName || "N/A"}</span>
        </div>
        <div className="flex gap-2">
            <span className="font-bold min-w-[80px] text-gray-700">Pan ID:</span> 
            <span className="uppercase">{userData.panId || "EICPR6266H"}</span>
        </div>
        <div className="flex gap-2 border-t border-gray-100 pt-2 mt-2">
            <span className="font-bold min-w-[80px] text-gray-700">User Type:</span> 
            <span className="px-2 py-0.5 bg-red-50 text-[#8B0000] rounded text-[11px] font-bold uppercase">
                {userData.userType || "N/A"}
            </span>
        </div>
      </div>

      {/* Action Button */}
      <button
        onClick={() => setShowProfile(false)}
        className="mt-6 w-full bg-[#8B0000] hover:bg-red-900 text-white py-2 rounded font-bold text-sm transition-all active:scale-95 shadow-md"
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