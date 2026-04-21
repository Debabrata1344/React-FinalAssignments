import React, { useState } from 'react';
import { Menu, Bell, ChevronDown, LogOut } from 'lucide-react';

const Header = ({ toggleSidebar }) => {
  const [menuOpen, setMenuOpen] = useState(false);

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

        {/* Notification */}
        <div className="relative cursor-pointer">
          <Bell size={22} className="text-gray-500" />
          <span className="absolute -top-1 -right-1 bg-[#8B0000] text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-bold">
            9
          </span>
        </div>

        {/* Profile */}
        <div className="relative flex items-center gap-3 border-l border-gray-200 pl-4">

          <div className="w-8 h-8 rounded-full bg-[#FFE4E4] border overflow-hidden">
            <img
              src="https://api.dicebear.com/7.x/avataaars/svg?seed=Stebin"
              alt="user"
            />
          </div>

          <span className="text-sm font-semibold text-gray-700">
            Stebin Ben
          </span>

          {/* Toggle */}
          <button onClick={() => setMenuOpen(!menuOpen)}>
            <ChevronDown size={18} className="text-gray-500" />
          </button>

          {/* Dropdown */}
          {menuOpen && (
            <div className="absolute right-0 top-12 w-44 bg-white border border-gray-200 rounded-lg shadow-md z-50">

              <button className="flex items-center gap-2 w-full px-4 py-2 hover:bg-gray-100 text-sm">
                <LogOut size={16} />
                Profile
              </button>

              <button className="flex items-center gap-2 w-full px-4 py-2 hover:bg-gray-100 text-sm">
                <LogOut size={16} />
                Change Password
              </button>

              <button
                onClick={handleLogout}
                className="flex items-center gap-2 w-full px-4 py-2 hover:bg-gray-100 text-sm text-red-600"
              >
                <LogOut size={16} />
                Logout
              </button>

            </div>
          )}

        </div>
      </div>
    </header>
  );
};

export default Header;