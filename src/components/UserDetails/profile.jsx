import React, { useState } from 'react';
import { ChevronLeft, Mail, Phone } from 'lucide-react';
import panCardImg from '../../assets/pan-card-front.png';
import panCardback from '../../assets/pan-back.png';
import aadharfront from '../../assets/aadhar-card-front.png';
import aadharback from '../../assets/aadhar-back.jpg';
import chrome from '../../assets/chrome.jpg';

const UserProfile = () => {
  const [activeTab, setActiveTab] = useState('Basic Details');

  const tabs = [
    'Basic Details', 'PAN Details', 'Aadhar Details',
    'Matching Details', 'Geo-Tagging Analysis', 'Browser Data'
  ];

  return (
    <div className="min-h-screen bg-gray-50 p-6 font-sans text-gray-800">
      {/* Breadcrumb & Header */}
      <div className="mb-6 flex items-center gap-2 text-sm text-gray-500">
        <span>User Management</span> / <span>User Request</span>
      </div>
      <div className="mb-6 flex items-center gap-2">
        <ChevronLeft className="cursor-pointer" />
        <h1 className="text-xl font-bold">Profile Details</h1>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Left Card: Summary */}
        <div className="rounded-lg bg-white p-8 shadow-sm text-center relative">
          <span className="absolute top-4 right-4 text-xs font-semibold text-green-500 bg-green-50 px-2 py-1 rounded">Active</span>
          <div className="mx-auto mb-4 h-24 w-24 overflow-hidden rounded-full bg-blue-100">
            <img src="https://placeholder.com" alt="Avatar" className="h-full w-full object-cover" />
          </div>
          <h2 className="text-lg font-bold">Adeline Ballard</h2>
          <p className="mb-6 text-sm text-red-400 font-medium">User Name : Adeline</p>

          <div className="space-y-3 text-left border-t pt-6">
            <div className="flex items-center gap-3 text-sm">
              <Mail size={16} className="text-gray-400" />
              <span>Adeline@gmail.com</span>
            </div>
            <div className="flex items-center gap-3 text-sm">
              <Phone size={16} className="text-gray-400" />
              <span>+91-9998888800</span>
            </div>
          </div>
        </div>

        {/* Right Card: Personal Details */}
        <div className="rounded-lg bg-white p-8 shadow-sm lg:col-span-2">
          <h3 className="mb-6 text-md font-semibold text-gray-600">Personal Details</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-y-6 gap-x-12 border-b pb-8">
            <DetailItem label="PAN" value="XXXXXX67F" />
            <DetailItem label="Aadhaar" value="XXXX XXXX XXXX 7463" />
            <DetailItem label="Created Date" value="12/09/2025" />
            <DetailItem label="Submission Date" value="15/09/2025" />
          </div>
          <div className="pt-6">
            <p className="text-xs text-gray-400 uppercase tracking-wider mb-1">Address</p>
            <p className="text-sm leading-relaxed max-w-md">Plot No. E-12, SRB Tower, 11th Floor Infocity, Chandaka Industrial Estate, I E, Area, Bhubaneswar, Odisha 751024</p>
          </div>
        </div>
      </div>

      {/* Tabs Section */}
      <div className="mt-8 rounded-lg bg-white shadow-sm overflow-hidden">
        <div className="flex border-b overflow-x-auto">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-6 py-4 text-sm font-medium whitespace-nowrap transition-colors border-b-2 ${activeTab === tab
                  ? 'border-red-500 text-red-500'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Tab Content Area */}
        <div className="p-8 min-h-[300px]">
          {activeTab === 'Basic Details' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-8">
              <FormItem label="Name" value="Adeline Ballard" />
              <FormItem label="City" value="Bhubaneswar" />
              <FormItem label="GSTIN" value="NA" />
              <FormItem label="State" value="Odisha" />
              <FormItem label="PIN" value="645683" />
              <FormItem label="Address" value="Plot No. E-12, SRB Tower, 11th Floor Infocity, Chandaka Industrial Estate, I E, Area, Bhubaneswar, Odisha 751024" />
            </div>
          )}

          {/* PAN Details Tab (New) */}
          {activeTab === 'PAN Details' && (
            <div className="flex flex-col lg:flex-row gap-12">
              {/* Text Info */}
              <div className="flex flex-col gap-6 w-full lg:w-1/3">
                <FormItem label="Name" value="Adeline Ballard" />
                <FormItem label="PAN Number" value="XXXXXX023X" />
                <FormItem label="DOI" value="22-02-2025" />
              </div>

              {/* Image Previews */}
              <div className="flex flex-wrap gap-4">
                <div className="group relative overflow-hidden rounded-xl border border-gray-200 shadow-sm transition-hover hover:shadow-md">
                  <img
                    src={panCardImg}
                    alt="PAN Card Front"
                    className="h-40 w-64 object-cover"
/>
                  <div className="absolute inset-0 bg-black/5 group-hover:bg-transparent transition-colors" />
                </div>

                <div className="group relative overflow-hidden rounded-xl border border-gray-200 shadow-sm transition-hover hover:shadow-md">
                  <img
                    src={panCardback}
                    alt="PAN Card Back"
                    className="h-40 w-64 object-cover"
                  />
                  <div className="absolute inset-0 bg-black/5 group-hover:bg-transparent transition-colors" />
                </div>
              </div>
            </div>
          )}{/* Aadhar Details Tab */}
          {activeTab === 'Aadhar Details' && (
            <div className="flex flex- lg:flex-row gap-12 animate-in fade-in duration-300">
              {/* Text Info */}
              <div className="flex flex-col gap-6 w-full lg:w-1/3">
                <FormItem label="Name" value="Adeline Ballard" />
                <FormItem label="Father Name" value="Alex Doe" />
                <FormItem label="Aadhaar Number" value="XXXX XXXX XXXX 7685" />
                <FormItem label="DOB" value="21-02-2000" />
                <FormItem label="DOI" value="22-02-2025" />
              </div>

              {/* Image Previews */}
              <div className="flex  gap-4 items-start">
                {/* Aadhaar Card Front */}
                <div className="group relative overflow-hidden rounded-xl border border-gray-200 shadow-sm transition-all hover:shadow-md">
                  <img
                    src={aadharfront}
                    alt="Aadhar Front"
                    className="h-44 w-72 object-cover"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors" />
                </div>

                {/* Aadhaar Card Back */}
                <div className="group relative overflow-hidden rounded-xl border border-gray-200 shadow-sm transition-all hover:shadow-md">
                  <img
                    src={aadharback}
                    alt="Aadhar Back"
                    className="h-44 w-72 object-cover"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors" />
                </div>
              </div>
            </div>
          )}
          {/* Matching Details Tab */}
          {activeTab === 'Matching Details' && (
            <div className="flex flex-col lg:flex-row gap-12 animate-in fade-in duration-300">
              {/* Comparison Info */}
              <div className="flex flex-col gap-6 w-full lg:w-1/3">
                <FormItem label="PAN Name" value="Adeline Ballard" />
                <FormItem label="Aadhaar Name" value="Adeline Ballard" />

                <div className="flex gap-4">
                  <span className="text-sm text-gray-400 w-24 shrink-0">Match Score :</span>
                  <span className="text-sm font-bold text-green-600 bg-green-50 px-2 py-0.5 rounded">100%</span>
                </div>
              </div>

              {/* Side-by-Side Document Comparison */}
              <div className="flex gap-4 items-start">
                {/* PAN Card Preview */}
                <div className="group relative overflow-hidden rounded-xl border border-gray-200 shadow-sm">
                  <img
                    src={panCardImg}
                    alt="PAN Card"
                    className="h-44 w-72 object-cover"
                  />
                  <div className="absolute top-2 left-2 bg-white/90 px-2 py-1 rounded text-[10px] font-bold uppercase tracking-tight shadow-sm">PAN</div>
                </div>

                {/* Aadhaar Card Preview */}
                <div className="group relative overflow-hidden rounded-xl border border-gray-200 shadow-sm">
                  <img
                    src={aadharfront}
                    alt="Aadhar Card"
                    className="h-44 w-72 object-cover"
                  />
                  <div className="absolute top-2 left-2 bg-white/90 px-2 py-1 rounded text-[10px] font-bold uppercase tracking-tight shadow-sm">Aadhar</div>
                </div>
              </div>
            </div>
          )}
          {/* Geo-Tagging Analysis Tab */}
          {activeTab === 'Geo-Tagging Analysis' && (
            <div className="flex flex-col lg:flex-row gap-12 animate-in fade-in duration-300">
              {/* Metadata Info */}
              <div className="flex flex-col gap-6 w-full lg:w-1/3">
                <FormItem label="IP" value="NA" />
                <FormItem label="Latitude" value="26.938474" />
                <FormItem label="Longitude" value="32.938474" />
                <FormItem label="PIN" value="763427" />
                <FormItem label="City" value="Bhubaneswar" />
                <FormItem label="State" value="Odisha" />
                <FormItem label="Address" value="Plot No. E-12, SRB Tower, 11th Floor Infocity, Chandaka Industrial Estate, I E, Area, Bhubaneswar, Odisha 751024" />
              </div>

              {/* Map View */}
              <div className="w-full lg:w-2/3">
                <div className="overflow-hidden rounded-2xl border border-gray-200 shadow-sm transition-hover hover:shadow-md h-[250px] lg:h-[350px] relative">
                  <img
                    src="https://placeholder.com"
                    alt="Location Map"
                    className="h-full w-full object-cover"
                  />
                  {/* Mock Map Marker */}
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                    <div className="h-4 w-4 bg-red-500 rounded-full border-2 border-white shadow-lg animate-pulse" />
                  </div>
                </div>
                <p className="mt-3 text-xs text-gray-400 italic">* Location coordinates verified via browser metadata</p>
              </div>
            </div>
          )}
          {/* Browser Data Tab */}
          {activeTab === 'Browser Data' && (
            <div className="flex flex-col lg:flex-row items-center lg:items-start gap-12 animate-in fade-in duration-300">
              {/* Technical Metadata */}
              <div className="flex flex-col gap-6 w-full lg:w-1/2">
                <FormItem label="Browser" value="NA" />
                <FormItem label="User OS" value="NA" />
                <FormItem label="Platform" value="NA" />
                <FormItem label="Browser Language" value="NA" />
                <FormItem label="Cookie Enable" value="NA" />
              </div>

              {/* Browser Visual Indicator */}
              <div className="flex flex-1 justify-center lg:justify-end pr-12 pt-4">
                <div >
                  <img
                    src={chrome}
                    alt="Chrome Logo"
                    className="h-full w-full object-contain"
                  />
                  {/* Subtle glow effect */}
                  <div className="absolute inset-0 rounded-full bg-blue-400/10 blur-2xl -z-10" />
                </div>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};

// Sub-components for cleaner structure
const DetailItem = ({ label, value }) => (
  <div>
    <p className="text-xs text-gray-400 uppercase tracking-wider mb-1">{label}</p>
    <p className="text-sm font-medium">{value}</p>
  </div>
);

const FormItem = ({ label, value }) => (
  <div className="flex gap-4">
    <span className="text-sm text-gray-400 w-24 shrink-0">{label} :</span>
    <span className="text-sm font-medium text-gray-700 leading-relaxed">{value}</span>
  </div>
);

export default UserProfile;
