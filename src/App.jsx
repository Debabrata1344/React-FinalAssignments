import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';


// Auth Components
import AuthSystem from './components/AuthSystem';

// Layout Components
import DashboardLayout from './components/layout/DashboardLayout';

// Page Components
import DashboardHome from './components/pages/DashboardHome';
import UserRequest from './components/pages/UserRequest';
import UserListReport from './components/pages/UserListReport';
import AuditTrail from './components/pages/AuditTrail';
import Functionalities from './components/pages/Functionalities';
import OnboardingReports from './components/pages/OnboardingReports';
import TransactionReports from './components/pages/TransactionReports';
import WalletAdjustment from './components/pages/WalletAdjustment';
import CreateCBCUserForm from './components/pages/CBCUserForm';
import UserProfile from './components/UserDetails/profile';


const ProtectedRoute = ({ children }) => {
    const token = localStorage.getItem('access_token');
    if (!token) return <Navigate to="/login" replace />;
    return children;
};

function App() {
  return (
    <Router>
      <Routes>

        {/* AUTH */}
        <Route path="/login" element={<AuthSystem />} />

        {/* DASHBOARD */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <DashboardLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<DashboardHome />} />

          {/* User Management */}
          <Route path="user-request" element={<UserRequest />} />
          <Route path="user-list" element={<UserListReport />} />
          <Route path="functionalities" element={<Functionalities />} />
          <Route path="/dashboard/user-profile" element={<UserProfile />} />

          {/* ✅ ADD THIS HERE */}
          <Route path="create-user" element={<CreateCBCUserForm />} />

          {/* Audit */}
          <Route path="audit-trail" element={<AuditTrail />} />

          {/* Reports */}
          <Route path="reports">
            <Route path="onboarding" element={<OnboardingReports />} />
            <Route path="transaction" element={<TransactionReports />} />
          </Route>

          {/* Wallet */}
          <Route path="wallet-adjustment" element={<WalletAdjustment />} />
        </Route>

        {/* REDIRECTS */}
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="*" element={<Navigate to="/login" replace />} />

      </Routes>
    </Router>
  );
}

export default App;