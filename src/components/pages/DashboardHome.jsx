import React from 'react';

const DashboardHome = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#fcfcfc] font-sans">
      <div className="space-y-2">
        {/* Main Title */}
        <h1 className="text-2xl font-semibold text-gray-800 tracking-tight">
          Welcome to NSDL
        </h1>
        
        {/* Sub-text */}
        <p className="text-gray-400 text-sm font-medium tracking-wide uppercase">
          Banking made easy - <span className="italic">JUST IN A JIFFY</span>
        </p>
      </div>
    </div>
  );
};

export default DashboardHome;
