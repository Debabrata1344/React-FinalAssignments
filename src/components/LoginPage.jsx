
import React, { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import nsdl_logo from '../assets/nsdl_logo.png';

const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    // 'h-screen' + 'overflow-hidden' ensures NO vertical or horizontal scrollbars
    <div className="h-screen w-full bg-[#FBFBFB] flex items-center justify-center font-sans overflow-hidden relative">
      
      {/* 1. CLIPPED DECORATION: Absolute inset-0 with overflow-hidden ensures blurs stay inside */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute -left-40 top-1/4 w-[600px] h-[800px] bg-red-900 opacity-10 blur-[120px] rounded-full rotate-12"></div>
      </div>

      {/* 2. CENTERED CONTENT WRAPPER */}
      <div className="relative z-10 flex flex-col items-center w-full px-4">
        
        {/* LOGIN CARD: Strict Figma Specs */}
        <div className="w-full max-w-[475px] bg-white rounded-[10px] shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100 flex flex-col items-center p-6 md:p-10">
          
          {/* Logo Section */}
          <div className="w-[274px] max-w-full h-[64px] mb-8 flex items-center justify-center">
            <img 
              src={nsdl_logo} 
              alt="NSDL" 
              className="w-full h-full object-contain" 
            />
          </div>

          <div className="w-full text-center mb-6">
            <h2 className="text-[24px] font-bold text-[#1A1A1A]">Login to your Account</h2>
          </div>

          <form className="w-full max-w-[395px] flex flex-col items-center">
            <div className="w-full flex flex-col gap-4 mb-8">
              {/* Username */}
              <div className="flex flex-col gap-1.5 text-left">
                <label className="text-[14px] text-gray-500 font-medium">Username</label>
                <input 
                  type="text"
                  placeholder="Enter your Username"
                  className="w-full h-[50px] px-4 border border-gray-200 rounded-md focus:outline-none focus:border-red-800 text-[14px]"
                />
              </div>

              {/* Password */}
              <div className="flex flex-col gap-1.5 text-left">
                <label className="text-[14px] text-gray-500 font-medium">Password</label>
                <div className="relative">
                  <input 
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    className="w-full h-[50px] px-4 border border-gray-200 rounded-md focus:outline-none focus:border-red-800 text-[14px]"
                  />
                  <button 
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400"
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>
            </div>

            <button 
              type="submit"
              className="w-full h-[48px] bg-[#8B0000] hover:bg-[#700000] text-white font-bold rounded-md transition-all text-[16px] active:scale-95"
            >
              Login
            </button>
            
            <div className="w-full flex items-center justify-between text-[13px] mt-4">
              <label className="flex items-center gap-2 cursor-pointer text-gray-600">
                <input type="checkbox" className="w-4 h-4 rounded border-gray-300 text-red-800" />
                <span>Remember Me</span>
              </label>
              <a href="#" className="text-red-800 font-semibold hover:underline">
                Forgot Password?
              </a>
            </div>
          </form>
        </div>

        {/* 3. FOOTER: Spaced perfectly below the card */}
        <div className="mt-8 flex gap-8 text-[12px] text-gray-400">
          <a href="#" className="hover:underline">Terms and Conditions</a>
          <a href="#" className="hover:underline">Privacy Policy</a>
          <a href="#" className="hover:underline">CA Privacy Notice</a>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;