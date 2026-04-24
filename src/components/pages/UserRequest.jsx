import React, { useState } from 'react';
import { Search, Calendar, ChevronDown, Eye, Loader2, ChevronRight, ChevronLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { FetchUserListMaker } from '../../utils/authService';

const UserRequest = () => {
  const navigate = useNavigate();
  const [searchMode, setSearchMode] = useState('date');
  const [hasSearched, setHasSearched] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // States for Inputs
  const [usernameInput, setUsernameInput] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [userType, setUserType] = useState('User Type');
  const [status, setStatus] = useState('Status');

  // State for Table Data
  const [tableData, setTableData] = useState([]);
  
  // Pagination State
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(3);

  // --- PAGINATION LOGIC (Move this here, right before return) ---
  const safeTableData = Array.isArray(tableData) ? tableData : [];
  const totalRecords = safeTableData.length;
  const totalPages = Math.ceil(totalRecords / (rowsPerPage || 10)) || 1;
  const validCurrentPage = Math.min(currentPage, totalPages);

  const indexOfLastRow = validCurrentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentTableData = safeTableData.slice(indexOfFirstRow, indexOfLastRow);

  const getPaginationRange = () => {
  const delta = 2; // Number of pages to show on either side of current page
  const range = [];
  const rangeWithDots = [];
  let l;

  range.push(1);
  for (let i = validCurrentPage - delta; i <= validCurrentPage + delta; i++) {
    if (i < totalPages && i > 1) {
      range.push(i);
    }
  }
  if (totalPages > 1) range.push(totalPages);

  for (let i of range) {
    if (l) {
      if (i - l === 2) {
        rangeWithDots.push(l + 1);
      } else if (i - l !== 1) {
        rangeWithDots.push('...');
      }
    }
    rangeWithDots.push(i);
    l = i;
  }
  return rangeWithDots;
};

  const handleSearch = async () => {
    setIsLoading(true);
    const username = localStorage.getItem('userName') || "";
    const auth = localStorage.getItem('access_token') || "";

    try {
      let requestData = {};
      if (searchMode === 'date') {
        requestData = {
          status: status === 'Status' ? 'ALL' : status.toUpperCase(),
          username: username,
          startDate: startDate || "",
          endDate: endDate || "",
          role: userType === 'User Type' ? 'ALL' : userType
        };
      } else {
        if (!usernameInput) {
          alert("Please enter a username to search");
          setIsLoading(false);
          return;
        }
        requestData = {
          username: usernameInput,
          role: userType === 'User Type' ? 'ALL' : userType,
          status: "ALL"
        };
      }

      const jsonPayload = JSON.stringify(requestData);
      const response = await FetchUserListMaker(jsonPayload, auth);
      const finalData = response?.data || response;
      const records = finalData?.resultObj?.result;

      if (Array.isArray(records)) {
        setTableData(records);
        setCurrentPage(1); // Reset to page 1 on new search
      } else {
        setTableData([]);
      }
      setHasSearched(true);
    } catch (error) {
      console.error("Search Error:", error);
      alert(error.response?.data?.message || "Failed to fetch user list");
      setTableData([]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-100 min-h-[500px]">
      <div className="p-6">
        {/* Breadcrumbs */}
        <div className="flex items-center gap-2 text-[11px] text-gray-400 mb-4 uppercase tracking-wider">
          <span>Bank User Management</span>
          <span className="text-gray-300">/</span>
          <span className="text-gray-500 font-semibold">User Request</span>
        </div>

        <h2 className="text-xl font-bold text-gray-800 mb-6">User Request</h2>

        {/* Search Mode Selection */}
        <div className="flex items-center gap-8 mb-6">
          <label className="flex items-center gap-2 text-sm cursor-pointer">
            <input
              type="radio"
              checked={searchMode === 'date'}
              onChange={() => setSearchMode('date')}
              className="w-4 h-4 accent-[#8B0000]"
            />
            <span className={searchMode === 'date' ? 'text-gray-800 font-medium' : 'text-gray-400'}>
              Search by Date Range
            </span>
          </label>
          <label className="flex items-center gap-2 text-sm cursor-pointer">
            <input
              type="radio"
              checked={searchMode === 'username'}
              onChange={() => setSearchMode('username')}
              className="w-4 h-4 accent-[#8B0000]"
            />
            <span className={searchMode === 'username' ? 'text-gray-800 font-medium' : 'text-gray-400'}>
              Search by User Name
            </span>
          </label>
        </div>

        {/* Filters Section */}
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex-shrink-0">
            {searchMode === 'date' ? (
              <div className="flex items-center border border-gray-200 rounded px-3 py-2 bg-white min-w-[320px]">
                <input
                  type="date"
                  className="outline-none text-sm text-gray-400 bg-transparent w-full"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                />
                <span className="mx-2 text-gray-300">→</span>
                <input
                  type="date"
                  className="outline-none text-sm text-gray-400 bg-transparent w-full"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                />
                <Calendar size={16} className="text-gray-400 ml-2" />
              </div>
            ) : (
              <div className="relative w-[320px]">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                <input
                  type="text"
                  placeholder="Enter User Name"
                  className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded text-sm outline-none"
                  value={usernameInput}
                  onChange={(e) => setUsernameInput(e.target.value)}
                />
              </div>
            )}
          </div>

          <div className="flex items-center gap-3">
            <div className="relative">
              <select
                value={userType}
                onChange={(e) => setUserType(e.target.value)}
                className="appearance-none border border-gray-200 rounded px-4 py-2 pr-10 text-sm text-gray-500 outline-none bg-white min-w-[140px]"
              >
                <option>User Type</option>
                <option value="CBC">CBC</option>
                <option value="CBC Maker">CBC Maker</option>
                <option value="Master Distributor">Master Distributor</option>
                <option value="Distributor">Distributor</option>
                <option value="Agent">Agent</option>
              </select>
              <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
            </div>

            <div className="relative">
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                className="appearance-none border border-gray-200 rounded px-4 py-2 pr-10 text-sm text-gray-500 outline-none bg-white min-w-[120px]"
              >
                <option value="ALL">ALL</option>
                <option value="APPROVED">APPROVED</option>
                <option value="PENDING">PENDING</option>
                <option value="REJECTED">REJECTED</option>
              </select>
              <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
            </div>

            <button
              onClick={handleSearch}
              disabled={isLoading}
              className="bg-[#8B0000] text-white px-6 py-2 rounded shadow-sm flex items-center gap-2 text-sm font-semibold hover:bg-[#700000] disabled:opacity-50 transition-colors"
            >
              {isLoading ? <Loader2 size={18} className="animate-spin" /> : <Search size={18} />}
              Search
            </button>
          </div>
        </div>
      </div>

      {hasSearched && (
        <div className="flex flex-col border-t border-gray-100">
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-gray-50">
                <tr className="text-gray-600 text-[13px] font-bold border-b border-gray-100">
                  <th className="px-6 py-4">First Name</th>
                  <th className="px-6 py-4">Last Name</th>
                  <th className="px-6 py-4">Date Created</th>
                  <th className="px-6 py-4">Updated Created</th>
                  <th className="px-6 py-4">User Name</th>
                  <th className="px-6 py-4">Mobile No.</th>
                  <th className="px-6 py-4">Email ID</th>
                  <th className="px-6 py-4">Parent username</th>
                  <th className="px-6 py-4">CBC Name</th>
                  <th className="px-6 py-4">MDS Name</th>
                  <th className="px-6 py-4">DS Name</th>
                  <th className="px-6 py-4">Address</th>
                  <th className="px-6 py-4">Role</th>
                  <th className="px-6 py-4 text-center">Status</th>
                  
                  <th className="px-6 py-4">Updated Phone</th>
                  <th className="px-6 py-4">Updated Email</th>
                  <th className="px-6 py-4">Address</th>
                  <th className="px-6 py-4">Role</th>
                  <th className="px-6 py-4 text-center">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {currentTableData.length > 0 ? (
                  currentTableData.map((row, index) => {
                    const personal = row?.["1"] || {};
                    const compamy = row?.["2"] || {};

                    return (
                      <tr key={row?._id || index} className="hover:bg-gray-50/50 transition-colors border-b border-gray-100">
                        <td className="px-6 py-4 text-sm font-medium text-gray-700">{personal?.firstName || "---"}</td>
                        <td className="px-6 py-4 text-sm font-medium text-gray-700">{personal?.lastName || "---"}</td>
                        <td className="px-6 py-4 text-sm text-gray-500">
                          {row?.createdAt ? new Date(row.createdAt).toLocaleDateString('en-GB') : "---"}
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-500">
                          {row?.updatedAt ? new Date(row.updatedAt).toLocaleDateString('en-GB') : "---"}
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-500 font-mono">{row?.username || "N/A"}</td>
                        <td className="px-6 py-4 text-sm text-gray-600">{personal?.mobileNumber || "---"}</td>
                        <td className="px-6 py-4 text-sm text-gray-600">{personal?.email || "---"}</td>


                        <td className="px-6 py-4 text-sm text-gray-600">{row?.username || "---"}</td>
                        <td className="px-6 py-4 text-sm text-gray-600">{ "---"}</td>
                        <td className="px-6 py-4 text-sm text-gray-600">{ "---"}</td>
                        <td className="px-6 py-4 text-sm text-gray-600">{ "---"}</td>
                        <td className="px-6 py-4 text-sm text-gray-600">{personal?.city || "---"}</td>
                        <td className="px-6 py-4 text-sm text-gray-600">{row?.userRole || "---"}</td>
                        <td className="px-6 py-4 text-center">
                          <span className={`px-2 py-1 rounded text-[10px] font-bold uppercase border ${
                            row?.status === 'APPROVED' ? 'bg-green-50 text-green-700 border-green-200' : 'bg-amber-50 text-amber-700 border-amber-200'
                          }`}>
                            {row?.status || 'PENDING'}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-600">{personal?.mobileNumber || "---"}</td>

                        <td className="px-6 py-4 text-sm text-gray-600">{personal?.email || "---"}</td>
                        <td className="px-6 py-4 text-sm text-gray-600">{personal?.city || "---"}</td>

                        <td className="px-6 py-4 text-sm text-gray-600">{row?.userRole || "---"}</td>

                    
                        
                        
                        <td className="px-6 py-4 text-center">
                          <button 
                            className="text-[#8B0000] font-bold text-xs flex items-center gap-1 mx-auto"
                            onClick={() => navigate('/dashboard/user-profile', { state: { user: row } })}
                          >
                            View Details <Eye size={14} />
                          </button>
                        </td>
                      </tr>
                    );
                  })
                ) : (
                  <tr>
                    <td colSpan="8" className="text-center py-12 text-gray-400 italic text-sm">No records found.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

       {totalRecords > 0 && (
  <div className="px-6 py-4 border-t border-gray-100 flex items-center justify-between bg-white flex-wrap gap-4">
    <div className="flex items-center gap-6 text-[12px] text-gray-500 font-medium">
      <div className="flex items-center gap-2">
        <span>Row per page</span>
        <div className="relative">
          <select 
            value={rowsPerPage}
            onChange={(e) => {
              setRowsPerPage(Number(e.target.value));
              setCurrentPage(1);
            }}
            className="appearance-none border border-gray-200 rounded pl-2 pr-6 py-1 bg-white outline-none cursor-pointer"
          >
            <option value={3}>3</option>
            <option value={5}>5</option>
            <option value={10}>10</option>
            <option value={50}>50</option>
          </select>
          <ChevronDown size={12} className="absolute right-1.5 top-1/2 -translate-y-1/2 pointer-events-none" />
        </div>
      </div>

      {/* Go to Page Input */}
      <div className="flex items-center gap-2">
        <span>Go to</span>
        <input 
          type="text"
          className="w-10 border border-gray-200 rounded text-center py-1 outline-none focus:border-[#8B0000]"
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              const val = parseInt(e.target.value);
              if (val > 0 && val <= totalPages) setCurrentPage(val);
              e.target.value = '';
            }
          }}
        />
      </div>
      
      <span>Total Records: {totalRecords}</span>
    </div>

    <div className="flex items-center gap-1">
      <button 
        onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
        disabled={validCurrentPage === 1}
        className={`w-8 h-8 flex items-center justify-center rounded border transition-colors ${validCurrentPage === 1 ? 'text-gray-200 cursor-not-allowed' : 'text-gray-400 hover:bg-gray-50'}`}
      >
        <ChevronLeft size={16} />
      </button>

      {getPaginationRange().map((page, index) => (
        <button
          key={index}
          onClick={() => typeof page === 'number' && setCurrentPage(page)}
          disabled={page === '...'}
          className={`w-8 h-8 flex items-center justify-center rounded border text-xs font-bold transition-all ${
            validCurrentPage === page 
              ? 'border-[#8B0000] bg-white text-[#8B0000]' 
              : page === '...' ? 'border-transparent text-gray-400 cursor-default' : 'border-gray-200 text-gray-600 hover:bg-gray-50'
          }`}
        >
          {page}
        </button>
      ))}

      <button 
        onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
        disabled={validCurrentPage === totalPages}
        className={`w-8 h-8 flex items-center justify-center rounded border transition-colors ${validCurrentPage === totalPages ? 'text-gray-200 cursor-not-allowed' : 'text-gray-400 hover:bg-gray-50'}`}
      >
        <ChevronRight size={16} />
      </button>
    </div>
  </div>
)}
        </div>
      )}
    </div>
  );
};

export default UserRequest;