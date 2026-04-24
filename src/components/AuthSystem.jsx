import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Eye, EyeOff, Loader2 } from 'lucide-react';
import nsdl_logo from '../assets/nsdl_logo.png';
import chrome from '../assets/chrome.jpg'; // Imported for your Browser tab consistency
import { 
  getEncryptedData, 
  performBankLogin, 
  getDecryptedData, 
  dashboardapi, 
  forgotPassword, 
  verifyOtp 
} from '../utils/authService';

// ================= COMPONENT WRAPPER (Outside to prevent focus loss) =================
const CardWrapper = ({ children }) => (
  <div className="relative h-screen w-full bg-[#FBFBFB] flex items-center justify-center overflow-hidden">
    <div className="absolute inset-0 pointer-events-none">
      <div
        className="absolute -left-40 top-0 w-[700px] h-[700px]"
        style={{
          background: 'radial-gradient(circle, rgba(153,27,27,0.6), transparent 70%)',
          filter: 'blur(140px)',
        }}
      />
      <div
        className="absolute -left-20 top-40 w-[500px] h-[500px]"
        style={{
          background: 'radial-gradient(circle, rgba(153,27,27,0.4), transparent 70%)',
          filter: 'blur(120px)',
        }}
      />
    </div>

    {/* Main Content Card */}
    <div className="relative z-10 w-full max-w-[475px] bg-white rounded-[10px] shadow-lg p-10 border border-gray-100">
      <img src={nsdl_logo} alt="NSDL" className="w-[200px] mx-auto mb-6" />
      {children}
    </div>

    {/* Footer Links */}
    <div className="absolute bottom-6 w-full flex justify-center gap-6 text-[12px] text-gray-400">
      <span className="cursor-pointer hover:underline">Terms and Conditions</span>
      <span className="cursor-pointer hover:underline">Privacy Policy</span>
      <span className="cursor-pointer hover:underline">CA Privacy Notice</span>
    </div>
  </div>
);

const AuthSystem = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState('login');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  // Form States
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [forgotUsername, setForgotUsername] = useState('');
  const [otp, setOtp] = useState('');

  const [errors, setErrors] = useState({
    username: "",
    password: ""
  });

  // ================= LOGIN LOGIC =================
  const handleLogin = async (e) => {
    e.preventDefault();
    let newErrors = { username: "", password: "" };

    if (!username.trim()) newErrors.username = "Username is required";
    if (!password.trim()) newErrors.password = "Password is required";

    setErrors(newErrors);
    if (newErrors.username || newErrors.password) return;

    setLoading(true);
    try {
      const encryptionResponse = await getEncryptedData({
        grant_type: "password",
        username,
        password
      });

      const encryptedStringOnly = encryptionResponse?.RequestData || encryptionResponse;
      const bankResponse = await performBankLogin(encryptedStringOnly);
      const encryptedBodyFromServer = bankResponse.data?.RequestData || bankResponse.data;
      const finalData = await getDecryptedData(encryptedBodyFromServer);

      if (finalData?.access_token) {
        localStorage.setItem('access_token', finalData.access_token);
        localStorage.setItem("userName", finalData.userType);
        localStorage.setItem('user_details', JSON.stringify(finalData));

        // Dashboard Info Fetch
        const dashBoardResponse = await dashboardapi(finalData.access_token); 
        const dashEncrypted = dashBoardResponse.data?.RequestData || dashBoardResponse.data;
        const dashBoardData = await getDecryptedData(dashEncrypted);

        if(dashBoardData?.dashboardInfo){
          localStorage.setItem('dashboard_info', JSON.stringify(dashBoardData.dashboardInfo));
        }

        navigate('/dashboard');
      } else {
        alert("Invalid credentials");
      }
    } catch (err) {
      console.error("Auth Flow Error:", err);
      alert("Login Error");
    } finally {
      setLoading(false);
    }
  };

  // ================= FORGOT PASSWORD LOGIC =================
  const handleSendOTP = async () => {
    if (!forgotUsername.trim()) {
      alert("Please enter your username");
      return;
    }

    setLoading(true);
    try {
      const response = await forgotPassword(forgotUsername);
      // Processing response if encryption is involved
      console.log("OTP Sent to:", forgotUsername);
      setStep('otp'); 
    } catch (err) {
      console.error("OTP Error:", err);
      alert("Failed to send OTP. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // ================= VERIFY OTP LOGIC =================
  const verifySendOTP = async () => {
    if (!otp.trim()) {
      alert("Please enter your OTP");
      return;
    }

    setLoading(true);
    try {
      const request = {
        userName: forgotUsername || username,
        otp: otp
      };

      const jsonData = JSON.stringify(request);
      const response = await verifyOtp(jsonData);
      
      const encryptedBody = response.data?.RequestData || response.data;
      const decryptedData = await getDecryptedData(encryptedBody);
      
      console.log("Verification Success:", decryptedData);
      setStep('success'); 
    } catch (err) {
      console.error("OTP Verification Error:", err);
      alert("Invalid OTP or verification failed.");
    } finally {
      setLoading(false);
    }
  };

  // ================= RENDERING =================

  // LOGIN STEP
  if (step === 'login') {
    return (
      <CardWrapper>
        <form onSubmit={handleLogin} className="space-y-5">
          <h2 className="text-xl font-bold text-center">Login to your Account</h2>
          <div>
            <label className="text-sm text-gray-500">Username</label>
            <input
              type="text"
              value={username}
              onChange={(e) => {
                setUsername(e.target.value);
                setErrors({ ...errors, username: "" });
              }}
              className={`w-full h-[45px] px-3 border rounded ${errors.username ? "border-red-500" : "border-gray-300"}`}
              placeholder="Enter Username"
            />
            {errors.username && <p className="text-red-500 text-sm">{errors.username}</p>}
          </div>

          <div>
            <label className="text-sm text-gray-500">Password</label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  setErrors({ ...errors, password: "" });
                }}
                className={`w-full h-[45px] px-3 border rounded ${errors.password ? "border-red-500" : "border-gray-300"}`}
                placeholder="Enter Password"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
            {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full h-[45px] bg-red-800 text-white rounded flex justify-center items-center hover:bg-red-900 transition-colors"
          >
            {loading ? <Loader2 className="animate-spin" /> : "Login"}
          </button>

          <div className="flex justify-between text-sm">
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" className="accent-red-800" /> Remember Me
            </label>
            <button type="button" onClick={() => setStep('forgot')} className="text-red-800 font-medium hover:underline">
              Forgot Password?
            </button>
          </div>
        </form>
      </CardWrapper>
    );
  }

  // FORGOT STEP
  if (step === 'forgot') {
    return (
      <CardWrapper>
        <h2 className="text-xl font-bold text-center mb-4">Forgot Password</h2>
        <div className="space-y-4">
          <div>
            <label className="text-sm text-gray-500">Username</label>
            <input
              type="text"
              placeholder="Enter Username"
              value={forgotUsername}
              onChange={(e) => setForgotUsername(e.target.value)}
              className="w-full h-[45px] px-3 border border-gray-300 rounded focus:border-red-800 outline-none"
            />
          </div>
          <button
            onClick={handleSendOTP}
            disabled={loading}
            className="w-full h-[45px] bg-red-800 text-white rounded flex justify-center items-center disabled:bg-gray-400"
          >
            {loading ? <Loader2 className="animate-spin" /> : "Send OTP"}
          </button>
          <p className="text-center">
            <button onClick={() => setStep('login')} className="text-red-800 text-sm font-medium hover:underline">
              Back to Login
            </button>
          </p>
        </div>
      </CardWrapper>
    );
  }

  // OTP STEP
  if (step === 'otp') {
    return (
      <CardWrapper>
        <h2 className="text-xl font-bold text-center mb-4">Enter OTP</h2>
        <div className="space-y-4">
          <input
            type="text"
            maxLength={6}
            placeholder="Enter 6-digit OTP"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            className="w-full h-[45px] px-3 border border-gray-300 rounded text-center tracking-widest text-lg focus:border-red-800 outline-none"
          />
          <button
            onClick={verifySendOTP}
            disabled={loading}
            className="w-full h-[45px] bg-red-800 text-white rounded flex justify-center items-center disabled:bg-gray-400"
          >
            {loading ? <Loader2 className="animate-spin" /> : "Verify OTP"}
          </button>
          <div className="text-center">
            <button onClick={() => setStep('forgot')} className="text-sm text-gray-500 hover:text-red-800">
              Resend OTP?
            </button>
          </div>
        </div>
      </CardWrapper>
    );
  }

  // SUCCESS STEP
  if (step === 'success') {
    return (
      <CardWrapper>
        <div className="text-center space-y-4">
          <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-2">
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h2 className="text-xl font-bold">Verification Successful</h2>
          <p className="text-gray-500 text-sm">Your identity has been verified. You can now log in.</p>
          <button
            onClick={() => setStep('login')}
            className="w-full h-[45px] bg-red-800 text-white rounded hover:bg-red-900 transition-colors"
          >
            Back to Login
          </button>
        </div>
      </CardWrapper>
    );
  }

  return null;
};

export default AuthSystem;