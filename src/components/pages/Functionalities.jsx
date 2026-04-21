import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

const Functionalities = () => {
  const navigate = useNavigate();
  
  // States
  const [selected, setSelected] = useState(["Account Opening", "BBPS", "MATM", "UPI", "POS"]);
  const [notSelected, setNotSelected] = useState(["DMT", "AePS", "Card"]);
  const [isModalOpen, setIsModalOpen] = useState(false); // Modal control

  // Handlers
  const handleSelect = (item) => {
    setNotSelected(notSelected.filter(i => i !== item));
    setSelected([...selected, item]);
  };

  const handleDeselect = (item) => {
    setSelected(selected.filter(i => i !== item));
    setNotSelected([...notSelected, item]);
  };

  const selectAll = () => {
    setSelected([...selected, ...notSelected]);
    setNotSelected([]);
  };

  const deselectAll = () => {
    setNotSelected([...notSelected, ...selected]);
    setSelected([]);
  };

  const handleUpdate = () => {
    console.log("Feature updated successfully!");
    setIsModalOpen(false);
    // Add your API logic here
  };

  return (
    <div className="bg-[#fcfcfc] min-h-screen p-8 font-sans relative">
      {/* Breadcrumbs & Header */}
      <div className="flex items-center gap-2 text-[10px] text-gray-400 mb-4 uppercase tracking-wider">
        <span>Bank User Management</span> / <span>User List Report</span> / <span className="text-gray-600">Functionalities</span>
      </div>

      <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-gray-800 mb-8 group">
        <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" /> 
        <span className="font-bold text-xl tracking-tight">Functionalities</span>
      </button>

      {/* Main Content Sections */}
      <div className="space-y-6">
        <div className="bg-white rounded-md border border-gray-100 p-6 shadow-sm">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-sm font-semibold text-gray-700">Select Features</h3>
            <button onClick={selectAll} className="text-xs font-bold text-green-500 hover:underline">Select All</button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {notSelected.map(item => (
              <FeatureCard key={item} label={item} actionLabel="Select" colorClass="text-green-500" onClick={() => handleSelect(item)} />
            ))}
          </div>
        </div>

        <div className="bg-white rounded-md border border-gray-100 p-6 shadow-sm">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-sm font-semibold text-gray-700">Select Features</h3>
            <button onClick={deselectAll} className="text-xs font-bold text-red-500 hover:underline">Deselect All</button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {selected.map(item => (
              <FeatureCard key={item} label={item} actionLabel="Deselect" colorClass="text-red-500" onClick={() => handleDeselect(item)} />
            ))}
          </div>
        </div>
      </div>

      {/* Footer Actions */}
      <div className="mt-10 flex justify-end items-center gap-8">
        <button className="text-sm font-bold text-red-500 hover:text-red-600">Cancel</button>
        <button 
          onClick={() => setIsModalOpen(true)} // Open modal on Save
          className="bg-[#8B0000] text-white px-8 py-2 rounded text-sm font-bold shadow-md hover:bg-red-900 transition-colors"
        >
          Save
        </button>
      </div>

      {/* Confirmation Modal */}
{isModalOpen && (
  <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
    <div className="bg-white rounded-sm shadow-2xl max-w-[400px] w-full overflow-hidden">
      {/* Header */}
      <div className="px-5 py-4 border-b border-gray-200">
        <h2 className="text-sm font-bold text-gray-800">Conformation!</h2>
      </div>
      
      {/* Body */}
      <div className="px-5 py-10">
        <p className="text-[13px] text-gray-600">Are you sure you want to update the feature?</p>
      </div>
      
      {/* Footer Actions */}
      <div className="px-5 py-4 flex justify-end items-center gap-6">
        <button 
          onClick={() => setIsModalOpen(false)}
          className="text-[11px] font-bold text-red-600 uppercase tracking-tight hover:opacity-70"
        >
          Cancel
        </button>
        <button 
          onClick={handleUpdate}
          className="bg-[#8B0000] text-white px-6 py-2 rounded-sm text-[11px] font-bold uppercase tracking-tight shadow-md hover:bg-red-900 transition-colors"
        >
          Update
        </button>
      </div>
    </div>
  </div>
)}

    </div>
  );
};

const FeatureCard = ({ label, actionLabel, colorClass, onClick }) => (
  <div className="flex items-center justify-between border border-gray-200 rounded-md p-3 hover:border-gray-300 transition-colors bg-white">
    <span className="text-sm font-medium text-gray-600 px-2">{label}</span>
    <button 
      onClick={onClick}
      className={`text-[11px] font-bold uppercase tracking-tighter border-l pl-4 py-1 h-full min-w-[70px] text-right ${colorClass} hover:opacity-70 transition-opacity`}
    >
      {actionLabel}
    </button>
  </div>
);

export default Functionalities;
