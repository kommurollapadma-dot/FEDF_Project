// components/Sidebar.jsx
import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  FaTableColumns, 
  FaCalendarDays, 
  FaClock, 
  FaUserNurse, 
  FaHeartPulse, 
  FaFileLines, 
  FaTriangleExclamation, 
  FaFileExport, 
  FaBell, 
  FaGear,
  FaRightFromBracket 
} from 'react-icons/fa6';
import { useAuth } from '../context/AuthContext';

const Sidebar = () => {
  const { logout, userRole } = useAuth();

  const menuItems = [
    { path: '/dashboard', icon: FaTableColumns, label: 'Dashboard' },
    { path: '/roster-builder', icon: FaCalendarDays, label: 'Roster Builder' },
    { path: '/shift-schedule', icon: FaClock, label: 'Shift Schedule' },
    { path: '/nurse-profiles', icon: FaUserNurse, label: 'Nurse Profiles' },
    { path: '/overtime-tracker', icon: FaHeartPulse, label: 'Overtime Tracker' },
    { path: '/leave-management', icon: FaFileLines, label: 'Leave Management' },
    { path: '/conflict-alerts', icon: FaTriangleExclamation, label: 'Conflict Alerts' },
    { path: '/export-schedule', icon: FaFileExport, label: 'Export Schedule' },
    { path: '/notifications', icon: FaBell, label: 'Notifications' },
    { path: '/admin-panel', icon: FaGear, label: 'Admin Panel' },
  ];

  return (
    <div className="sidebar">
      <div className="logo">
        <img src="/logo.png" alt="PulsePlanner logo" />
        <span>PulsePlanner</span>
      </div>
      <ul className="menu">
        {menuItems.map((item) => (
          <li key={item.path}>
            <NavLink 
              to={item.path} 
              className={({ isActive }) => isActive ? 'active' : ''}
            >
              <item.icon />
              <span>{item.label}</span>
            </NavLink>
          </li>
        ))}
        <li onClick={logout}>
          <FaRightFromBracket />
          <span>Logout</span>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;