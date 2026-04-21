import React, { useState } from 'react';
import { Search, Calendar, Download, ChevronDown, Eye } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const UserRequest = () => {
  const navigate = useNavigate();
  const [expandedRow, setExpandedRow] = useState(null);
  const [searchMode, setSearchMode] = useState('date');

  // Updated data to match the "Krishna Das" format
  const tableData = [
    {
      id: 1,
      firstName: 'Krishna',
      lastName: 'Das',
      username: 'SP028',
      mobile: '809829919',
      email: 'Krishna@gmail.com',
      role: 'Maker',
      date: '19/06/2024',
      status: 'Active'
    },
  ];

  const toggleRow = (id) => {
    setExpandedRow(expandedRow === id ? null : id);
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-100">
      {/* HEADER SECTION */}
      <div className="p-6 border-b border-gray-100">
        <div className="flex items-center gap-2 text-xs text-gray-400 mb-4">
          <span>Bank User Management</span> / <span className="text-gray-600 font-medium">User Request</span>
        </div>
        <h2 className="text-xl font-bold text-gray-800 mb-6">User Request</h2>

        {/* SEARCH MODE RADIOS */}
        <div className="flex items-center gap-6 mb-6">
          <label className="flex items-center gap-2 text-sm cursor-pointer font-medium text-gray-700">
            <input type="radio" checked={searchMode === 'date'} onChange={() => setSearchMode('date')} className="accent-[#8B0000]" />
            Search by Date Range
          </label>
          <label className="flex items-center gap-2 text-sm cursor-pointer text-gray-500">
            <input type="radio" checked={searchMode === 'username'} onChange={() => setSearchMode('username')} className="accent-[#8B0000]" />
            Search by User Name
          </label>
        </div>

        {/* FILTERS */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          {searchMode === 'username' && (
            <div className="relative col-span-4">
              <Search className="absolute left-3 top-3 text-gray-400" size={18} />
              <input type="text" placeholder="Search here" className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border rounded-md text-sm outline-none focus:border-[#8B0000]" />
            </div>
          )}

          {searchMode === 'date' && (
            <>
              <div className="relative">
                <Calendar className="absolute left-3 top-3 text-gray-400" size={18} />
                <input type="date" className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border rounded-md text-sm outline-none" />
              </div>
              <div className="relative">
                <Calendar className="absolute left-3 top-3 text-gray-400" size={18} />
                <input type="date" className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border rounded-md text-sm outline-none" />
              </div>
              <select className="bg-gray-50 border rounded-md px-3 py-2.5 text-sm outline-none">
                <option>User Type</option>
                <option value="cbc_maker">CBC maker</option>
                <option value="master_distributor">Master Distributer</option>
              </select>
              <select className="bg-gray-50 border rounded-md px-3 py-2.5 text-sm outline-none">
                <option>All Status</option>
                <option value="approved">Approved</option>
              </select>
            </>
          )}

          <button className="bg-[#8B0000] text-white px-4 py-2.5 rounded-md flex items-center justify-center gap-2 text-sm font-bold hover:bg-[#700000]">
            <Download size={18} />
            {searchMode === 'date' ? 'Search' : 'Download Excel'}
          </button>
        </div>
      </div>

      {/* TABLE SECTION */}
      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead className="bg-gray-50 border-b border-gray-100">
            <tr className="text-gray-600 text-[13px] font-semibold">
              <th className="px-6 py-4 w-10"></th>
              {[
                "First Name", "Last Name", "User Name", "Mobile No.",
                "Email ID", "Role", "Date Created", "Status", "update"
              ].map((header) => (
                <th key={header} className="px-6 py-4">
                  <div className="flex items-center gap-1">
                    {header} <ChevronDown size={12} className="text-gray-300" />
                  </div>
                </th>
              ))}
              <th className="px-6 py-4 text-center">Action</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-100">
            {tableData.map((row) => (
              <React.Fragment key={row.id}>
                <tr className="hover:bg-gray-50 text-sm group">
                  <td className="px-6 py-5">
                    <input type="checkbox" className="w-4 h-4 rounded border-gray-300 accent-[#8B0000]" />
                  </td>
                  <td className="px-6 py-5 whitespace-nowrap">{row.firstName}</td>
                  <td className="px-6 py-5 whitespace-nowrap">{row.lastName}</td>
                  <td className="px-6 py-5 whitespace-nowrap text-gray-500">{row.username}</td>
                  <td className="px-6 py-5 whitespace-nowrap">{row.mobile}</td>
                  <td className="px-6 py-5 whitespace-nowrap">{row.email}</td>
                  <td className="px-6 py-5 whitespace-nowrap">{row.role}</td>
                  <td className="px-6 py-5 whitespace-nowrap">{row.date}</td>
                  <td className="px-6 py-5">
                    <span className="text-green-600 font-medium bg-green-50 px-2.5 py-0.5 rounded-full text-xs">
                      {row.status}
                    </span>
                  </td>
                  <td className="px-6 py-5 text-center">
                    <div className="flex items-center justify-center gap-4">

                      {/* Update Button (NEW) */}
                      <button
                        onClick={() => navigate('/dashboard/functionalities')}
                        className="text-green-600 hover:underline font-semibold text-sm whitespace-nowrap flex items-center justify-center gap-2"
                      >
                        Update
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="w-4 h-4 text-green-600"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          strokeWidth={2}
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" d="M12 20h9" />
                          <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 3.5a2.121 2.121 0 013 3L7 19l-4 1 1-4 12.5-12.5z" />
                        </svg>
                      </button>

                      {/* Expand Button */}
                      <button onClick={() => toggleRow(row.id)}>
                        <ChevronDown
                          size={18}
                          className={`text-gray-400 transition-transform ${expandedRow === row.id ? 'rotate-180' : ''
                            }`}
                        />
                      </button>

                    </div>
                  </td>

                  <td className="px-6 py-5 text-center">
                    <div className="flex items-center justify-center gap-4">
                      {/* View Details with Eye Icon */}
                      <button
                        onClick={() => navigate('/dashboard/user-profile')}
                        className="text-[#8B0000]  text-sm whitespace-nowrap flex items-center justify-center gap-2"
                      >

                        View Details<Eye size={18} className="text-[#8B0000]" />
                      </button>

                      {/* Original Expand functionality */}
                      <button onClick={() => toggleRow(row.id)}>
                        <ChevronDown size={18} className={`text-gray-400 transition-transform ${expandedRow === row.id ? 'rotate-180' : ''}`} />
                      </button>
                    </div>
                  </td>
                </tr>

              </React.Fragment>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserRequest;
