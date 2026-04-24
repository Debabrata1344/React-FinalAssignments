import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Eye, EyeOff, Loader2 } from 'lucide-react';
import nsdl_logo from '../assets/nsdl_logo.png';
import { getEncryptedData, performBankLogin, getDecryptedData ,dashboardapi} from '../utils/authService';


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

    {/* Footer Links (Optional, based on your image) */}
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

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const [errors, setErrors] = useState({
    username: "",
    password: ""
  });

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

      const encryptedStringOnly =
        typeof encryptionResponse === 'object'
          ? encryptionResponse.RequestData
          : encryptionResponse;

      const bankResponse = await performBankLogin(encryptedStringOnly);

      const encryptedBodyFromServer =
        bankResponse.data.RequestData || bankResponse.data;

      const finalData = await getDecryptedData(encryptedBodyFromServer);

      if (finalData?.access_token) {
        localStorage.setItem('access_token', finalData.access_token);
        localStorage.setItem("userName", finalData.userType);
        localStorage.setItem('user_details', JSON.stringify(finalData));

       const dashBoardResponse = await dashboardapi(finalData.access_token); 
       const encryptedBodydashBoardResponse =
        bankResponse.data.RequestData || bankResponse.data;
        const dashBoardData = await getDecryptedData(encryptedBodyFromServer);

        const dashboardData = await getDecryptedData(encryptedBodyFromServer);
        if(dashboardData?.dashboardInfo){
          localStorage.setItem('dashboard_info', JSON.stringify(dashboardData.dashboardInfo));
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


    


  // ================= LOGIN =================
  if (step === 'login') {
    return (
      <CardWrapper>
        <form onSubmit={handleLogin} className="space-y-5">

          <h2 className="text-xl font-bold text-center">
            Login to your Account
          </h2>

          {/* USERNAME */}
          <div>
            <label className="text-sm text-gray-500">Username</label>
            <input
              type="text"
              value={username}
              onChange={(e) => {
                setUsername(e.target.value);
                setErrors({ ...errors, username: "" });
              }}
              className={`w-full h-[45px] px-3 border rounded ${
                errors.username ? "border-red-500" : "border-gray-300"
              }`}
              placeholder="Enter Username"
            />
            {errors.username && (
              <p className="text-red-500 text-sm">{errors.username}</p>
            )}
          </div>

          {/* PASSWORD */}
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
                className={`w-full h-[45px] px-3 border rounded ${
                  errors.password ? "border-red-500" : "border-gray-300"
                }`}
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

            {errors.password && (
              <p className="text-red-500 text-sm">{errors.password}</p>
            )}
          </div>

          {/* BUTTON */}
          <button
            type="submit"
            disabled={loading}
            className="w-full h-[45px] bg-red-800 text-white rounded flex justify-center items-center"
          >
            {loading ? <Loader2 className="animate-spin" /> : "Login"}
          </button>

          {/* FOOTER */}
          <div className="flex justify-between text-sm">
            <label className="flex items-center gap-2">
              <input type="checkbox" />
              Remember Me
            </label>

            <button
              type="button"
              onClick={() => setStep('forgot')}
              className="text-red-800"
            >
              Forgot Password?
            </button>
          </div>

        </form>
      </CardWrapper>
    );
  }

  // ================= FORGOT =================
  if (step === 'forgot') {
    return (
      <CardWrapper>
        <h2 className="text-xl font-bold text-center mb-4">Forgot Password</h2>

        <input
          type="text"
          placeholder="Enter Username"
          className="w-full h-[45px] px-3 border rounded mb-4"
        />

        <button
          onClick={() => setStep('otp')}
          className="w-full h-[45px] bg-red-800 text-white rounded"
        >
          Send OTP
        </button>

        <p className="text-center mt-4">
          <button onClick={() => setStep('login')} className="text-red-800">
            Back to Login
          </button>
        </p>
      </CardWrapper>
    );
  }

  // ================= OTP =================
  if (step === 'otp') {
    return (
      <CardWrapper>
        <h2 className="text-xl font-bold text-center mb-4">Enter OTP</h2>

        <input
          type="text"
          placeholder="Enter OTP"
          className="w-full h-[45px] px-3 border rounded mb-4"
        />

        <button
          onClick={() => setStep('success')}
          className="w-full h-[45px] bg-red-800 text-white rounded"
        >
          Verify
        </button>
      </CardWrapper>
    );
  }

  // ================= SUCCESS =================
  if (step === 'success') {
    return (
      <CardWrapper>
        <h2 className="text-xl font-bold text-center mb-4">
          Verification Successful
        </h2>

        <button
          onClick={() => setStep('login')}
          className="w-full h-[45px] bg-red-800 text-white rounded"
        >
          Back to Login
        </button>
      </CardWrapper>
    );
  }
};

export default AuthSystem;