import React, { useState } from 'react';
import { ChevronLeft, Mail, Phone, MapPin } from 'lucide-react';
import { useLocation, useNavigate } from "react-router-dom";

// Asset Imports
import panCardImg from '../../assets/pan-card-front.png';
import panCardback from '../../assets/pan-back.png';
import aadharfront from '../../assets/aadhar-card-front.png';
import aadharback from '../../assets/aadhar-back.jpg';
import chrome from '../../assets/chrome.jpg';

const UserProfile = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // Extract user data from navigation state
  const user = location.state?.user ?? {};

  const [activeTab, setActiveTab] = useState('Basic Details');

  // API Structure Mappings
  const personal = user["1"] || {};  // Identity/Personal
  const business = user["2"] || {};  // Business/GST/PAN
  const contact = user["3"] || {};   // Admin/Contact
  const bank = user["4"] || {};      // Bank Details
  const agreement = user["5"] || {}; // Agreements & Features

  // Derived Values
  const fullName = `${personal.firstName ?? ""} ${personal.lastName ?? ""}`.trim() || "N/A";
  const displayEmail = personal.email || contact.adminEmail || "N/A";
  const displayMobile = personal.mobileNumber || contact.adminMobileNumber || "N/A";

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

      {/* Breadcrumb */}
      <div className="mb-6 text-sm text-gray-500">
        User Management / User Request
      </div>

      {/* Header */}
      <div className="mb-6 flex items-center gap-2">
        <ChevronLeft
          className="cursor-pointer hover:text-red-500 transition-colors"
          onClick={() => navigate(-1)}
        />
        <h1 className="text-xl font-bold">Profile Details</h1>
      </div>

      {/* TOP SECTION */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">

        {/* LEFT CARD: User Overview */}
        <div className="rounded-lg bg-white p-8 shadow-sm text-center relative border border-gray-100">
          <span className="absolute top-4 right-4 text-xs font-semibold text-green-600 bg-green-50 px-2 py-1 rounded">
            {user.status ?? "ACTIVE"}
          </span>

          <div className="mx-auto mb-4 h-24 w-24 overflow-hidden rounded-full ring-4 ring-gray-50">
            <img
              src={`https://ui-avatars.com/api/?name=${fullName}&background=random`}
              alt="User Avatar"
              className="h-full w-full object-cover"
            />
          </div>

          <h2 className="text-lg font-bold">{fullName}</h2>
          <p className="mb-6 text-sm text-red-500 font-medium">
            Username: {user.username || personal.username || "N/A"}
          </p>

          <div className="space-y-3 text-left border-t pt-6">
            <div className="flex items-center gap-3 text-sm">
              <Mail size={16} className="text-gray-400" />
              <span className="truncate">{displayEmail}</span>
            </div>
            <div className="flex items-center gap-3 text-sm">
              <Phone size={16} className="text-gray-400" />
              <span>{displayMobile}</span>
            </div>
          </div>
        </div>

        {/* RIGHT CARD: Quick Stats */}
        <div className="rounded-lg bg-white p-8 shadow-sm lg:col-span-2 border border-gray-100">
          <h3 className="mb-6 text-md font-semibold text-gray-600">Personal Overview</h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-y-6 gap-x-12 border-b pb-8">
            <DetailItem label="PAN" value={business.pan || personal.pan} />
            <DetailItem label="Aadhaar" value="[Aadhaar Redacted]" />
            <DetailItem label="Created Date" value={user.createdAt ? new Date(user.createdAt).toLocaleDateString('en-GB') : "N/A"} />
            <DetailItem label="Submission Date" value={agreement.agreementStartDate || agreement.submissionDate || "N/A"} />
          </div>

          <div className="pt-6 flex gap-3">
            <MapPin size={18} className="text-gray-400 shrink-0" />
            <div>
              <p className="text-xs text-gray-400 uppercase tracking-wider mb-1">Registered Address</p>
              <p className="text-sm leading-relaxed max-w-md">
                {personal.address || `${personal.district || ""}, ${personal.state || ""} ${personal.pinCode || ""}` || "N/A"}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* TABS SECTION */}
      <div className="mt-8 rounded-lg bg-white shadow-sm overflow-hidden border border-gray-100">

        {/* TAB HEADER */}
        <div className="flex border-b overflow-x-auto scrollbar-hide">
          {tabs.map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-6 py-4 text-sm font-medium whitespace-nowrap border-b-2 transition-all ${activeTab === tab
                  ? 'border-red-500 text-red-500 bg-red-50/30'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:bg-gray-50'
                }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* TAB CONTENT */}
        <div className="p-8 min-h-[350px]">

          {activeTab === 'Basic Details' && (
            <Grid>
              <FormItem label="Full Name" value={fullName} />
              <FormItem label="Institution" value={business.institutionType} />
              <FormItem label="GST Number" value={business.gstNumber || business.gstin} />
              <FormItem label="District" value={personal.district} />
              <FormItem label="State" value={personal.state} />
              <FormItem label="PIN Code" value={personal.pinCode || personal.pin} />
            </Grid>
          )}

          {activeTab === 'PAN Details' && (
            <div className="flex flex-col lg:flex-row justify-between items-start gap-8">
              {/* Left side: Data with wide spacing */}
              <div className="flex-1 w-full space-y-6">
                <FormItem label="Name" value={fullName} />
                <FormItem label="PAN Number" value={personal.pan || "MJFI34OUYR"} />
                <FormItem label="DOI" value={personal.doi || "2022-09-23"} />
              </div>

              {/* Right side: Side-by-side images */}
              <div className="flex gap-4 shrink-0">
                <img
                  src={panCardImg}
                  alt="PAN Front"
                  className="h-32 w-52 object-cover rounded-xl border shadow-sm"
                />
                <img
                  src={panCardback}
                  alt="PAN Back"
                  className="h-32 w-52 object-cover rounded-xl border shadow-sm"
                />
              </div>
            </div>
          )}

          {activeTab === 'Aadhar Details' && (
            <div className="flex flex-col lg:flex-row justify-between items-start gap-8">
              {/* Left side: Data with wide spacing */}
              <div className="flex-1 w-full space-y-6">
                <FormItem label="Name" value={fullName} />
                <FormItem label="Father Name" value={personal.fatherName || "N/A"} />
                <FormItem
                  label="Aadhaar Number"
                  value={personal.aadhaar ? `XXXX-XXXX-${personal.aadhaar.slice(-4)}` : "N/A"}
                />
                <FormItem label="DOB" value={personal.dob || "N/A"} />
                <FormItem label="DOI" value={user.doi || "N/A"} />
              </div>

              {/* Right side: Front and Back images aligned side-by-side */}
              <div className="flex gap-4 shrink-0">
                <img
                  src={aadharfront}
                  alt="Aadhaar Front"
                  className="h-32 w-52 object-cover rounded-xl border shadow-sm"
                />
                <img
                  src={aadharback}
                  alt="Aadhaar Back"
                  className="h-32 w-52 object-cover rounded-xl border shadow-sm"
                />
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
                <FormItem label="Latitude" value={contact.latitude || "N/A"} />
                <FormItem label="Longitude" value={contact.longitude || "N/A"} />
                <FormItem label="City" value={user.city || personal.city || "N/A"} />
                <FormItem label="State" value={user.state || personal.state || "N/A"} />
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

const SplitLayout = ({ children }) => (
  <div className="flex flex-col lg:flex-row gap-12 items-start">
    {children}
  </div>
);

const ImageRow = ({ images }) => (
  <div className="flex gap-4">
    {images.map((img, i) => (
      <img
        key={i}
        src={img.src}
        alt={img.alt}
        className="h-44 w-72 object-cover rounded-xl border bg-white shadow-sm hover:scale-[1.02] transition-transform cursor-zoom-in"
      />
    ))}
  </div>
);

const DetailItem = ({ label, value }) => (
  <div>
    <p className="text-xs text-gray-400 mb-1">{label}</p>
    <p className="text-sm font-semibold truncate">{value || "N/A"}</p>
  </div>
);

const FormItem = ({ label, value }) => (
  <div className="flex gap-4 items-baseline">
    <span className="text-sm text-gray-400 w-32 shrink-0 font-medium">{label} :</span>
    <span className="text-sm font-semibold text-gray-700">{value || "N/A"}</span>
  </div>
);

export default UserProfile;