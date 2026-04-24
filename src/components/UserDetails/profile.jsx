import React, { useState } from 'react';
import { ChevronLeft, Mail, Phone, MapPin } from 'lucide-react';
import { useLocation, useNavigate } from "react-router-dom";

// Asset Imports (Keeping your existing imports)
import panCardImg from '../../assets/pan-card-front.png';
import panCardback from '../../assets/pan-back.png';
import aadharfront from '../../assets/aadhar-card-front.png';
import aadharback from '../../assets/aadhar-back.jpg';
import chrome from '../../assets/chrome.jpg';

const UserProfile = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // Role Validation Logic
  const userRole = localStorage.getItem("userName"); 
  const isMaker = userRole?.includes("maker");
  const isChecker = userRole?.includes("checker");

  const user = location.state?.user ?? {};
  const [activeTab, setActiveTab] = useState('Basic Details');

  // API Structure Mappings
  const personal = user["1"] || {};
  const business = user["2"] || {};
  const contact = user["3"] || {};
  const bank = user["4"] || {};
  const agreement = user["5"] || {};

  const statusStyles = {
  APPROVED: "text-green-600 bg-green-50 border-green-200",
  ACTIVE: "text-green-600 bg-green-50 border-green-200",
  PENDING: "text-amber-600 bg-amber-50 border-amber-200",
  REJECTED: "text-red-600 bg-red-50 border-red-200",
  INACTIVE: "text-gray-600 bg-gray-50 border-gray-200",
};

  const fullName = `${personal.firstName ?? ""} ${personal.lastName ?? ""}`.trim() || "N/A";
  const displayEmail = personal.email || contact.adminEmail || "N/A";
  const displayMobile = personal.mobileNumber || contact.adminMobileNumber || "N/A";
  const address = `${personal.city ?? ""} ${" ,"}${personal.district ?? ""}${" ,"}${personal.state ?? ""}${" ,"}${personal.country ?? ""}${" ,"}${personal.pinCode ?? ""}`.trim() || "N/A";

  const tabs = [
    'Basic Details',
    'PAN Details',
    'Aadhar Details',
    'Matching Details',
    'Geo-Tagging Analysis',
    'Browser Data'
  ];

  return (
    <div className="min-h-screen bg-gray-50 p-6 font-sans text-gray-800">
      {/* Breadcrumb & Header (Keeping your existing layout) */}
      <div className="mb-6 text-sm text-gray-500">User Management / User Request</div>
      <div className="mb-6 flex items-center gap-2">
        <ChevronLeft className="cursor-pointer hover:text-red-500 transition-colors" onClick={() => navigate(-1)} />
        <h1 className="text-xl font-bold">Profile Details</h1>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Left/Right Cards (Keeping your existing code) */}
        <div className="rounded-lg bg-white p-8 shadow-sm text-center relative border border-gray-100">
<span className={`absolute top-4 right-4 text-xs font-semibold px-2 py-1 rounded border ${
  statusStyles[user.status] || statusStyles.INACTIVE
}`}>
  {user.status ?? "ACTIVE"}
</span>          <div className="mx-auto mb-4 h-24 w-24 overflow-hidden rounded-full ring-4 ring-gray-50">
            <img src={`https://ui-avatars.com/api/?name=${fullName}&background=random`} alt="Avatar" className="h-full w-full object-cover" />
          </div>
          <h2 className="text-lg font-bold">{fullName}</h2>
          <p className="mb-6 text-sm text-red-500 font-medium">Username: {user.username || "N/A"}</p>
          <div className="space-y-3 text-left border-t pt-6">
            <div className="flex items-center gap-3 text-sm"><Mail size={16} /> <span>{displayEmail}</span></div>
            <div className="flex items-center gap-3 text-sm"><Phone size={16} /> <span>{displayMobile}</span></div>
          </div>
        </div>

        <div className="rounded-lg bg-white p-8 shadow-sm lg:col-span-2 border border-gray-100">
          <h3 className="mb-6 text-md font-semibold text-gray-600">Personal Overview</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-y-6 gap-x-12 border-b pb-8">
            <DetailItem label="PAN" value={business.pan} />
            <DetailItem label="Aadhaar" value="xxxxxxxx8978" />
            <DetailItem label="Created Date" value={user.createdAt ? new Date(user.createdAt).toLocaleDateString('en-GB') : "N/A"} />
            <DetailItem label="Submission Date" value={agreement.submissionDate || "N/A"} />
          </div>
         <DetailItem label="Address" value={address} /> 
        </div>
      </div>

      {/* TABS SECTION */}
      <div className="mt-8 rounded-lg bg-white shadow-sm overflow-hidden border border-gray-100">
        <div className="flex border-b overflow-x-auto">
          {tabs.map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-6 py-4 text-sm font-medium border-b-2 ${activeTab === tab ? 'border-red-500 text-red-500 bg-red-50/30' : 'border-transparent text-gray-500'}`}
            >
              {tab}
            </button>
          ))}
        </div>

        <div className="p-8">
          <div className="min-h-[300px]">
            {activeTab === 'Basic Details' && (
              <Grid>
                <FormItem label="Full Name" value={fullName} showCheckbox={isChecker} />
                <FormItem label="Institution" value={business.institutionType} showCheckbox={isChecker} />
                <FormItem label="GST Number" value={business.gstNumber} showCheckbox={isChecker} />
                <FormItem label="District" value={personal.district} showCheckbox={isChecker} />
                <FormItem label="State" value={personal.state} showCheckbox={isChecker} />
                <FormItem label="PIN Code" value={personal.pinCode} showCheckbox={isChecker} />
              </Grid>
            )}

            {activeTab === 'PAN Details' && (
              <div className="flex flex-col lg:flex-row justify-between gap-8">
                <div className="flex-1 space-y-6">
                  <FormItem label="Name" value={fullName} showCheckbox={isChecker} />
                  <FormItem label="PAN Number" value={business.pan || "N/A"} showCheckbox={isChecker} />
                  <FormItem label="DOI" value={personal.doi || "N/A"} showCheckbox={isChecker} />
                </div>
                <div className="flex gap-4 shrink-0">
                  <img src={panCardImg} className="h-32 w-52 object-cover rounded-xl border" />
                  <img src={panCardback} className="h-32 w-52 object-cover rounded-xl border" />
                </div>
              </div>
            )}

            {activeTab === 'Aadhar Details' && (
              <div className="flex flex-col lg:flex-row justify-between gap-8">
                <div className="flex-1 space-y-6">
                  <FormItem label="Name" value={fullName} showCheckbox={isChecker} />
                  <FormItem label="Father Name" value={personal.fatherName} showCheckbox={isChecker} />
                  <FormItem label="Aadhaar" value="XXXX-XXXX-XXXX" showCheckbox={isChecker} />
                  <FormItem label="DOB" value={personal.dob} showCheckbox={isChecker} />
                </div>
                <div className="flex gap-4 shrink-0">
                  <img src={aadharfront} className="h-32 w-52 object-cover rounded-xl border" />
                  <img src={aadharback} className="h-32 w-52 object-cover rounded-xl border" />
                </div>
              </div>
            )}
                 {activeTab === 'Matching Details' && (
            <div className="flex flex-col lg:flex-row justify-between items-start gap-8">
              <div className="flex-1 w-full space-y-6">
                <FormItem label="PAN Name" value={fullName} />
                <FormItem label="Aadhaar Name" value={fullName} />
                <FormItem label="Match Score" value="100%" />
              </div>

              <div className="flex gap-4 shrink-0">
                <img
                  src={panCardImg}
                  alt="PAN"
                  className="h-32 w-52 object-cover rounded-xl border shadow-sm"
                />
                <img
                  src={aadharfront}
                  alt="Aadhaar"
                  className="h-32 w-52 object-cover rounded-xl border shadow-sm"
                />
              </div>
            </div>
          )}
          {activeTab === 'Geo-Tagging Analysis' && (
            <div className="flex flex-col lg:flex-row justify-between items-start gap-8">
              <div className="flex-1 w-full space-y-6">
                <FormItem label="IP Address" value={contact.ip || "N/A"} />
                <FormItem label="Latitude" value={business.latitude || "N/A"} />
                <FormItem label="Longitude" value={business.longitude || "N/A"} />
                <FormItem label="City" value={ personal.city || "N/A"} />
                <FormItem label="State" value={ personal.state || "N/A"} />
              </div>

              <div className="w-full lg:w-[440px] shrink-0">
                <img
                  src="https://via.placeholder.com/600x300?text=Location+Map+Preview"
                  alt="Map"
                  className="rounded-xl border w-full h-48 object-cover shadow-sm"
                />
              </div>
            </div>
          )}
          {activeTab === 'Browser Data' && (
            <div className="flex flex-col lg:flex-row justify-between items-start gap-8">
              <div className="flex-1 w-full space-y-6">
                <FormItem label="Browser" value={user.browser || "N/A"} />
                <FormItem label="Operating System" value={user.os || "N/A"} />
                <FormItem label="Language" value={user.language || "N/A"} />
              </div>

              <div className="flex justify-center w-full lg:w-auto pr-12">
                <img
                  src={chrome}
                  alt="Browser Logo"
                  className="w-32 h-32 object-contain opacity-80"
                />
              </div>
            </div>
          )}


            {/* Other tabs follow the same pattern... */}
          </div>

          {/* ACTION BUTTONS: Visible only to Checker */}
          {isChecker && (
            <div className="mt-12 flex justify-end items-center gap-6 border-t pt-8">
              <button 
                onClick={() => alert("Rejected")}
                className="text-red-500 font-semibold hover:underline"
              >
                Reject
              </button>
              <button 
                onClick={() => alert("Approved")}
                className="bg-green-500 hover:bg-green-600 text-white px-10 py-2.5 rounded-lg font-bold transition-colors shadow-md"
              >
                Approve
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

/* REUSABLE UI COMPONENTS */

const Grid = ({ children }) => (
  <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-8 h-fit">
    {children}
  </div>
);

const DetailItem = ({ label, value }) => (
  <div>
    <p className="text-xs text-gray-400 mb-1">{label}</p>
    <p className="text-sm font-semibold truncate">{value || "N/A"}</p>
  </div>
);

const FormItem = ({ label, value, showCheckbox }) => (
  <div className="flex items-center justify-between border-b border-gray-50 pb-2">
    <div className="flex gap-4 items-baseline">
      <span className="text-sm text-gray-400 w-32 shrink-0 font-medium">{label} :</span>
      <span className="text-sm font-semibold text-gray-700">{value || "N/A"}</span>
    </div>
    {showCheckbox && (
      <input 
        type="checkbox" 
        className="w-4 h-4 accent-red-800 cursor-pointer"
      />
    )}
  </div>
);

export default UserProfile;