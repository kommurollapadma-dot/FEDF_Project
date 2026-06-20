// App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, Outlet } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext.jsx';
import ProtectedRoute from './components/ProtectedRoute.jsx';
import Sidebar from './components/Sidebar.jsx';
import Homepage from './pages/Homepage.jsx';
import Loginpage from './pages/Loginpage.jsx';
import Dashboard from './pages/Dashboard.jsx';
import RosterBuilder from './pages/RosterBuilder.jsx';
import ShiftSchedule from './pages/ShiftSchedule.jsx';
import NurseProfiles from './pages/NurseProfiles.jsx';
import OvertimeTracker from './pages/OvertimeTracker.jsx';
import LeaveManagement from './pages/LeaveManagement.jsx';
import ConflictAlert from './pages/ConflictAlert.jsx';
import ExportSchedule from './pages/ExportSchedule.jsx';
import Notifications from './pages/Notifications.jsx';
import AdminPanel from './pages/AdminPanel.jsx';
import './App.css';

function App() {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/login" element={<Loginpage />} />
          
          {/* Protected Routes with Sidebar Layout */}
          <Route element={<ProtectedRoute />}>
            <Route element={<SidebarLayout />}>
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/roster-builder" element={<RosterBuilder />} />
              <Route path="/shift-schedule" element={<ShiftSchedule />} />
              <Route path="/nurse-profiles" element={<NurseProfiles />} />
              <Route path="/overtime-tracker" element={<OvertimeTracker />} />
              <Route path="/leave-management" element={<LeaveManagement />} />
              <Route path="/conflict-alerts" element={<ConflictAlert />} />
              <Route path="/export-schedule" element={<ExportSchedule />} />
              <Route path="/notifications" element={<Notifications />} />
              <Route path="/admin-panel" element={<AdminPanel />} />
            </Route>
          </Route>
          
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </AuthProvider>
    </Router>
  );
}

// Sidebar Layout Wrapper Component
function SidebarLayout() {
  return (
    <div className="app-layout">
      <Sidebar />
      <div className="main-content">
        <Outlet />
      </div>
    </div>
  );
}

export default App;