import React, { useState } from 'react';
import { Download, Search, Calendar, ChevronDown, Eye } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const UserListReport = () => {
  const navigate = useNavigate();
  const [searchMode, setSearchMode] = useState('date');

  // Example user data
  const users = [
    {
      firstName: "Krishna",
      lastName: "Das",
      username: "SP028",
      mobile: "809829919",
      email: "Krishna@gmail.com",
      role: "Maker",
      dateCreated: "19/06/2024",
      status: "Active",
    },
    {
      firstName: "Rahul",
      lastName: "Sharma",
      username: "RS102",
      mobile: "987654321",
      email: "Rahul@gmail.com",
      role: "Agent",
      dateCreated: "15/03/2024",
      status: "Pending",
    },
    {
      firstName: "Anita",
      lastName: "Verma",
      username: "AV203",
      mobile: "912345678",
      email: "Anita@gmail.com",
      role: "CBC maker",
      dateCreated: "10/01/2024",
      status: "Approved",
    },
  ];

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
      {/* HEADER */}
      <div className="flex items-center gap-2 text-xs text-gray-400 mb-4">
        <span>Bank User Management</span> / <span className="text-gray-600">User List Report</span>
      </div>

      <h2 className="text-xl font-bold text-gray-800 mb-6">User List Report</h2>

      {/* RADIO */}
      <div className="flex gap-6 mb-6 text-sm">
        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="radio"
            checked={searchMode === 'date'}
            onChange={() => setSearchMode('date')}
            className="accent-[#8B0000]"
          />
          Search by Date Range
        </label>

        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="radio"
            checked={searchMode === 'username'}
            onChange={() => setSearchMode('username')}
            className="accent-[#8B0000]"
          />
          Search by User Name
        </label>
      </div>

      {/* FILTERS */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-8">
        {searchMode === 'username' && (
          <div className="relative col-span-4">
            <Search className="absolute left-3 top-2.5 text-gray-400" size={18} />
            <input
              type="text"
              placeholder="Search here"
              className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-md text-sm outline-none focus:border-[#8B0000]"
            />
          </div>
        )}

        {searchMode === 'date' && (
          <>
            <div className="relative">
              <Calendar className="absolute left-3 top-2.5 text-gray-400" size={18} />
              <input type="date" className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-md text-sm outline-none" />
            </div>
            <div className="relative">
              <Calendar className="absolute left-3 top-2.5 text-gray-400" size={18} />
              <input type="date" className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-md text-sm outline-none" />
            </div>
            <select className="bg-gray-50 border border-gray-200 rounded-md px-3 py-2 text-sm outline-none">
              <option>User Type</option>
              <option>CBC maker</option>
              <option>Master Distributer</option>
              <option>Distributer</option>
              <option>Agent</option>
              <option>CBC</option>
            </select>
            <select className="bg-gray-50 border border-gray-200 rounded-md px-3 py-2 text-sm outline-none">
              <option>All Status</option>
              <option>Rejected</option>
              <option>Pending</option>
              <option>Approved</option>
            </select>
          </>
        )}

        <button className="bg-[#8B0000] text-white px-4 py-2 rounded-md flex items-center justify-center gap-2 text-sm font-bold hover:bg-[#a00000] transition-colors">
          <Download size={18} />
          Download Excel
        </button>
      </div>

      {/* TABLE WRAPPER */}
      <div className="overflow-x-auto rounded-lg">
        <table className="w-full text-left text-sm text-gray-600 border-collapse">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-4 w-10"></th>
              <th className="px-4 py-4 font-semibold">
                <div className="flex items-center gap-1 cursor-pointer">
                  First Name <ChevronDown size={14} className="text-gray-400" />
                </div>
              </th>
              <th className="px-4 py-4 font-semibold">
                <div className="flex items-center gap-1 cursor-pointer">
                  Last Name <ChevronDown size={14} className="text-gray-400" />
                </div>
              </th>
              <th className="px-4 py-4 font-semibold">
                <div className="flex items-center gap-1 cursor-pointer">
                  User Name <ChevronDown size={14} className="text-gray-400" />
                </div>
              </th>
              <th className="px-4 py-4 font-semibold">
                <div className="flex items-center gap-1 cursor-pointer">
                  Mobile No. <ChevronDown size={14} className="text-gray-400" />
                </div>
              </th>
              <th className="px-4 py-4 font-semibold">
                <div className="flex items-center gap-1 cursor-pointer">
                  Email ID <ChevronDown size={14} className="text-gray-400" />
                </div>
              </th>
              <th className="px-4 py-4 font-semibold">
                <div className="flex items-center gap-1 cursor-pointer">
                  Role <ChevronDown size={14} className="text-gray-400" />
                </div>
              </th>
              <th className="px-4 py-4 font-semibold">
                <div className="flex items-center gap-1 cursor-pointer">
                  Date Created <ChevronDown size={14} className="text-gray-400" />
                </div>
              </th>
              <th className="px-4 py-4 font-semibold">
                <div className="flex items-center gap-1 cursor-pointer">
                  Status <ChevronDown size={14} className="text-gray-400" />
                </div>
              </th>
              <th className="px-4 py-4 font-semibold text-center">Action</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-100">
            {users.map((user, index) => (
              <tr key={index} className="hover:bg-gray-50 transition-colors">
                <td className="px-4 py-4">
                  <input type="checkbox" className="w-4 h-4 rounded border-gray-300 accent-[#8B0000]" />
                </td>
                <td className="px-4 py-4 whitespace-nowrap">{user.firstName}</td>
                <td className="px-4 py-4 whitespace-nowrap">{user.lastName}</td>
                <td className="px-4 py-4 whitespace-nowrap text-gray-500">{user.username}</td>
                <td className="px-4 py-4 whitespace-nowrap">{user.mobile}</td>
                <td className="px-4 py-4 whitespace-nowrap">{user.email}</td>
                <td className="px-4 py-4 whitespace-nowrap">{user.role}</td>
                <td className="px-4 py-4 whitespace-nowrap">{user.dateCreated}</td>
                <td className="px-4 py-4">
                  <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${
                    user.status === "Active"
                      ? "text-green-600 bg-green-50"
                      : user.status === "Pending"
                      ? "text-yellow-600 bg-yellow-50"
                      : "text-red-600 bg-red-50"
                  }`}>
                    {user.status}
                  </span>
                </td>
                <td className="px-4 py-4 text-center">
                  <button
                    onClick={() => navigate('/dashboard/user-profile', { state: { user } })}
                        className="text-[#8B0000]  text-sm whitespace-nowrap flex items-center justify-center gap-2"
                  >
                    View Details <Eye size={18} className="text-[#8B0000]" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserListReport;