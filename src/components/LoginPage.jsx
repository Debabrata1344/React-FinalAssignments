import React, { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import nsdl_logo from '../assets/nsdl_logo.png';

const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      // 🔥 Replace this with your real API
      await new Promise((resolve) => setTimeout(resolve, 2000));

      // success → redirect
      console.log("Login successful");

      // window.location.href = "/dashboard";

    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-screen w-full bg-[#FBFBFB] flex items-center justify-center font-sans overflow-hidden relative">

      {/* background blur */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute -left-40 top-1/4 w-[600px] h-[800px] bg-red-900 opacity-10 blur-[120px] rounded-full rotate-12"></div>
      </div>

      <div className="relative z-10 flex flex-col items-center w-full px-4">

        <div className="w-full max-w-[475px] bg-white rounded-[10px] shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100 flex flex-col items-center p-6 md:p-10">

          {/* Logo */}
          <div className="w-[274px] h-[64px] mb-8 flex items-center justify-center">
            <img src={nsdl_logo} alt="NSDL" className="w-full h-full object-contain" />
          </div>

          <h2 className="text-[24px] font-bold mb-6">Login to your Account</h2>

          <form className="w-full" onSubmit={handleLogin}>

            {/* Username */}
            <div className="mb-4">
              <label className="text-[14px] text-gray-500">Username</label>
              <input
                type="text"
                placeholder="Enter Username"
                className="w-full h-[50px] px-4 border rounded-md focus:outline-none focus:border-red-800"
              />
            </div>

            {/* Password */}
            <div className="mb-6">
              <label className="text-[14px] text-gray-500">Password</label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter password"
                  className="w-full h-[50px] px-4 border rounded-md focus:outline-none focus:border-red-800"
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

            {/* LOGIN BUTTON WITH LOADER */}
            <button
              type="submit"
              disabled={loading}
              className={`w-full h-[48px] flex items-center justify-center gap-2 rounded-md text-white font-bold transition-all ${
                loading ? "bg-gray-400 cursor-not-allowed" : "bg-[#8B0000] hover:bg-[#700000]"
              }`}
            >
              {loading ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  Logging in...
                </>
              ) : (
                "Login"
              )}
            </button>

            {/* Footer */}
            <div className="flex justify-between text-[13px] mt-4">
              <label className="flex items-center gap-2 text-gray-600">
                <input type="checkbox" className="w-4 h-4" />
                Remember Me
              </label>

              <a href="#" className="text-red-800 font-semibold">
                Forgot Password?
              </a>
            </div>

          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;