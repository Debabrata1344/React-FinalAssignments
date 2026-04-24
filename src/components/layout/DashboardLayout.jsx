import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import Header from './Header';

const DashboardLayout = () => {
  // This state controls the sidebar toggle for the whole app
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  return (
    <div className="flex h-screen w-full bg-[#F8F9FA] font-sans overflow-hidden">
      
      {/* 1. SIDEBAR CONTAINER 
          Setting a high z-index and relative position here ensures 
          the Sidebar stays above the Header's modal overlay.
      */}
      <div className="relative z-[999] h-full shadow-lg">
        <Sidebar isOpen={isSidebarOpen} />
      </div>

      {/* 2. RIGHT SIDE CONTENT AREA */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden relative z-10">
        
        {/* FIXED HEADER 
            Pass the toggle function to the menu button in Header
        */}
        <Header toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} />

        {/* DYNAMIC PAGE CONTENT */}
        <main className="flex-1 overflow-y-auto bg-[#F8F9FA] p-4 md:p-6">
          <div className="max-w-[1600px] mx-auto">
            {/* The <Outlet /> renders the current sub-route 
                (DashboardHome, UserRequest, etc.) 
            */}
            <Outlet />
          </div>
        </main>
        
      </div>
    </div>
  );
};

// CRITICAL: This default export matches your import in App.jsx
export default DashboardLayout;