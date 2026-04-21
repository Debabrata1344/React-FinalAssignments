import React, { useState } from 'react';
import { ChevronLeft, Mail, Phone } from 'lucide-react';
import panCardImg from '../../assets/pan-card-front.png';
import panCardback from '../../assets/pan-back.png';
import aadharfront from '../../assets/aadhar-card-front.png';
import aadharback from '../../assets/aadhar-back.jpg';
import chrome from '../../assets/chrome.jpg';
import { useLocation } from "react-router-dom";

const UserProfile = () => {
  const location = useLocation();
  const user = location.state?.user || {};

  const [activeTab, setActiveTab] = useState('Basic Details');

  const tabs = [
    'Basic Details',
    'PAN Details',
    'Aadhar Details',
    'Matching Details',
    'Geo-Tagging Analysis',
    'Browser Data'
  ];

  const fullName = `${user.firstName || ""} ${user.lastName || ""}`;

  return (
    <div className="min-h-screen bg-gray-50 p-6 font-sans text-gray-800">

      {/* Breadcrumb */}
      <div className="mb-6 flex items-center gap-2 text-sm text-gray-500">
        <span>User Management</span> / <span>User Request</span>
      </div>

      {/* Header */}
      <div className="mb-6 flex items-center gap-2">
        <ChevronLeft className="cursor-pointer" />
        <h1 className="text-xl font-bold">Profile Details</h1>
      </div>

      {/* TOP SECTION */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">

        {/* LEFT CARD */}
        <div className="rounded-lg bg-white p-8 shadow-sm text-center relative">
          <span className="absolute top-4 right-4 text-xs font-semibold text-green-500 bg-green-50 px-2 py-1 rounded">
            {user.status || "Active"}
          </span>

          <div className="mx-auto mb-4 h-24 w-24 overflow-hidden rounded-full bg-blue-100">
            <img
              src={`https://ui-avatars.com/api/?name=${fullName}&background=random`}
              alt="avatar"
              className="h-full w-full object-cover"
            />
          </div>

          <h2 className="text-lg font-bold">{fullName}</h2>

          <p className="mb-6 text-sm text-red-400 font-medium">
            User Name : {user.username}
          </p>

          <div className="space-y-3 text-left border-t pt-6">
            <div className="flex items-center gap-3 text-sm">
              <Mail size={16} className="text-gray-400" />
              <span>{user.email}</span>
            </div>
            <div className="flex items-center gap-3 text-sm">
              <Phone size={16} className="text-gray-400" />
              <span>{user.mobile}</span>
            </div>
          </div>
        </div>

        {/* RIGHT CARD */}
        <div className="rounded-lg bg-white p-8 shadow-sm lg:col-span-2">
          <h3 className="mb-6 text-md font-semibold text-gray-600">
            Personal Details
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-y-6 gap-x-12 border-b pb-8">
            <DetailItem label="PAN" value={user.pan || "xxxxxxxxx8748"} />
            <DetailItem label="Aadhaar" value={user.aadhaar || "xxxxxxxxx1234"} />
            <DetailItem label="Created Date" value={user.date || "20/06/2024"} />
            <DetailItem label="Submission Date" value={user.submissionDate || "25/06/2024"} />
          </div>

          <div className="pt-6">
            <p className="text-xs text-gray-400 uppercase tracking-wider mb-1">
              Address
            </p>
            <p className="text-sm leading-relaxed max-w-md">
              {user.address || "123, Main Street, Bhubaneswar, Odisha - 751024"}
            </p>
          </div>
        </div>
      </div>

      {/* TABS */}
      <div className="mt-8 rounded-lg bg-white shadow-sm overflow-hidden">

        {/* TAB HEADER */}
        <div className="flex border-b overflow-x-auto">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-6 py-4 text-sm font-medium whitespace-nowrap border-b-2 ${
                activeTab === tab
                  ? 'border-red-500 text-red-500'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* TAB CONTENT */}
        <div className="p-8 min-h-[300px]">

          {/* BASIC */}
          {activeTab === 'Basic Details' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-8">
              <FormItem label="Name" value={fullName} />
              <FormItem label="City" value={user.city || "Bhubaneswar"} />
              <FormItem label="GSTIN" value={user.gstin || "GTREU2435"} />
              <FormItem label="State" value={user.state || "Odisha"} />
              <FormItem label="PIN" value={user.pin || "751024"} />
              <FormItem label="Address" value={user.address || "BBSR"} />
            </div>
          )}

          {/* PAN */}
          {activeTab === 'PAN Details' && (
            <div className="flex flex-col lg:flex-row gap-12">
              <div className="flex flex-col gap-6 w-full lg:w-1/3">
                <FormItem label="Name" value={fullName} />
                <FormItem label="PAN Number" value={user.pan || "xxxxxxxxx8748"} />
                <FormItem label="DOI" value={user.doi || "31-09-2020"} />
              </div>

              <div className="flex flex-wrap gap-4">
                <img src={panCardImg} className="h-40 w-64 object-cover rounded-xl border" />
                <img src={panCardback} className="h-40 w-64 object-cover rounded-xl border" />
              </div>
            </div>
          )}

          {/* AADHAR */}
          {activeTab === 'Aadhar Details' && (
            <div className="flex flex-col lg:flex-row gap-12">

              <div className="flex flex-col gap-6 w-full lg:w-1/3">
                <FormItem label="Name" value={fullName} />
                <FormItem label="Father Name" value={user.fatherName || "Asish Kumar"} />
                <FormItem label="Aadhaar Number" value={user.aadhaar || "xxxxxxxxxxxx2345"} />
                <FormItem label="DOB" value={user.dob || "21-03-1990"} />
                <FormItem label="DOI" value={user.doi || "31-09-2020"} />
              </div>

              <div className="flex gap-4">
                <img src={aadharfront} className="h-44 w-72 object-cover rounded-xl border" />
                <img src={aadharback} className="h-44 w-72 object-cover rounded-xl border" />
              </div>
            </div>
          )}

          {/* MATCHING */}
          {activeTab === 'Matching Details' && (
            <div className="flex flex-col lg:flex-row gap-12">

              <div className="flex flex-col gap-6 w-full lg:w-1/3">
                <FormItem label="PAN Name" value={fullName} />
                <FormItem label="Aadhaar Name" value={fullName} />
                <FormItem label="Match Score" value="100%" />
              </div>

              <div className="flex gap-4">
                <img src={panCardImg} className="h-44 w-72 object-cover rounded-xl border" />
                <img src={aadharfront} className="h-44 w-72 object-cover rounded-xl border" />
              </div>
            </div>
          )}

          {/* GEO */}
          {activeTab === 'Geo-Tagging Analysis' && (
            <div className="flex flex-col lg:flex-row gap-12">

              <div className="flex flex-col gap-6 w-full lg:w-1/3">
                <FormItem label="IP" value={user.ip || "NA"} />
                <FormItem label="Latitude" value={user.latitude || "NA"} />
                <FormItem label="Longitude" value={user.longitude || "NA"} />
                <FormItem label="City" value={user.city || "Bhubaneswar"} />
                <FormItem label="State" value={user.state || "Odisha"} />
              </div>

              <img
                src="https://via.placeholder.com/600x300"
                className="rounded-xl border w-full lg:w-2/3"
              />
            </div>
          )}

          {/* BROWSER */}
          {activeTab === 'Browser Data' && (
            <div className="flex flex-col lg:flex-row gap-12">

              <div className="flex flex-col gap-6 w-full lg:w-1/2">
                <FormItem label="Browser" value={user.browser || "Chrome"} />
                <FormItem label="OS" value={user.os || "Windows"} />
                <FormItem label="Language" value={user.language || "English"} />
              </div>

              <img src={chrome} className="w-48 h-48 object-contain" />
            </div>
          )}

        </div>
      </div>
    </div>
  );
};

/* REUSABLE COMPONENTS */
const DetailItem = ({ label, value }) => (
  <div>
    <p className="text-xs text-gray-400 mb-1">{label}</p>
    <p className="text-sm font-medium">{value}</p>
  </div>
);

const FormItem = ({ label, value }) => (
  <div className="flex gap-4">
    <span className="text-sm text-gray-400 w-28">{label} :</span>
    <span className="text-sm font-medium">{value}</span>
  </div>
);

export default UserProfile;