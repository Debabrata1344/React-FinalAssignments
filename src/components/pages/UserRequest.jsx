import React, { useState } from 'react';
import { Search, Calendar, ChevronDown, Eye, Loader2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { FetchUserListMaker, getEncryptedData, getDecryptedData } from '../../utils/authService';

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

  const handleSearch = async () => {
    setIsLoading(true);

    const username = localStorage.getItem('userName') || "";
    const auth = localStorage.getItem('access_token') || "";

    try {
      let requestData = {};

      // Build the request object based on search mode
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

      // 1. Encrypt Payload (If your API requires it)
      const jsonPayload = JSON.stringify(requestData);


      // 2. Send Request to API
      // Note: Use encryptedPayload if your backend expects encrypted body, 
      // otherwise use jsonPayload
      const response = await FetchUserListMaker(jsonPayload, auth);

      // 3. Handle Response & Decrypt
      // Assuming the encrypted data is in response.data or response.body
      const finalData = response?.data || response;
      const records = finalData?.resultObj?.result;


      if (Array.isArray(records)) {
        setTableData(records);
      } else {
        setTableData([]);
      }

      setHasSearched(true);
    } catch (error) {
      console.error("Search Error:", error);
      const errorMessage = error.response?.data?.message || "Failed to fetch user list";
      alert(errorMessage);
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
            {/* User Type Dropdown */}
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

            {/* Status Dropdown */}
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

            {/* Search Button */}
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

      {/* Table Section */}
      {hasSearched && (
        <div className="overflow-x-auto border-t border-gray-100">
          <table className="w-full text-left">
            <thead className="bg-gray-50">
              <tr className="text-gray-600 text-[13px] font-bold border-b border-gray-100">
                <th className="px-6 py-4">First Name</th>
                <th className="px-6 py-4">Last Name</th>
                <th className="px-6 py-4">User Name</th>
                <th className="px-6 py-4">Mobile No.</th>
                <th className="px-6 py-4">Email ID</th>
                <th className="px-6 py-4">Date Created</th>
                <th className="px-6 py-4 text-center">Status</th>
                <th className="px-6 py-4 text-center">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {tableData.length > 0 ? (
                tableData.map((row, index) => {
                  // Extract the 'Personal Details' block (Key "1")
                  const personal = row["1"] || {};
                  const dateCreated = row.createdAt
                    ? new Date(row.createdAt).toLocaleDateString('en-GB')
                    : "---";
                  return (
                    <tr key={row._id || index} className="hover:bg-gray-50/50 transition-colors border-b border-gray-100">
                      {/* First Name */}
                      <td className="px-6 py-4 text-sm font-medium text-gray-700">
                        {personal.firstName || "---"}
                      </td>

                      {/* Last Name */}
                      <td className="px-6 py-4 text-sm font-medium text-gray-700">
                        {personal.lastName || "---"}
                      </td>

                      {/* User Name */}
                      <td className="px-6 py-4 text-sm text-gray-500 font-mono">
                        {row.username || "N/A"}
                      </td>

                      {/* Mobile No. */}
                      <td className="px-6 py-4 text-sm text-gray-600">
                        {personal.mobileNumber || "---"}
                      </td>

                      {/* Email ID */}
                      <td className="px-6 py-4 text-sm text-gray-600">
                        {personal.email || "---"}
                      </td>

                      {/* Date Created */}
                      <td className="px-6 py-4 text-sm text-gray-500">
                        {dateCreated}
                      </td>

                      {/* Status (Badge) */}
                      <td className="px-6 py-4 text-center">
                        <span className={`px-2 py-1 rounded text-[10px] font-bold tracking-wide uppercase ${row.status === 'APPROVED'
                            ? 'bg-green-50 text-green-700 border border-green-200'
                            : 'bg-amber-50 text-amber-700 border border-amber-200'
                          }`}>
                          {row.status || 'PENDING'}
                        </span>
                      </td>

                      {/* Action */}
                      <td className="px-6 py-4 text-center">
                        <button
                          className="text-[#8B0000] font-bold text-xs flex items-center gap-1 mx-auto hover:text-red-700 transition-colors"
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
                  <td colSpan="5" className="text-center py-12 text-gray-400 italic text-sm">
                    No records found matching your criteria.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default UserRequest;