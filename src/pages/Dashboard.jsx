// pages/Dashboard.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import ModuleHeader from '../components/ModuleHeader.jsx';
import { FaUserNurse, FaClock, FaFileLines, FaTriangleExclamation } from 'react-icons/fa6';

const Dashboard = () => {
  const { userRole } = useAuth();
  const navigate = useNavigate();
  const [stats, setStats] = useState({ nurses: 0, shifts: 0, pendingLeaves: 0, conflicts: 0 });

  useEffect(() => {
    const nurses = JSON.parse(localStorage.getItem('nurses')) || [];
    const shifts = JSON.parse(localStorage.getItem('shiftSchedules')) || [];
    const leaves = JSON.parse(localStorage.getItem('leaves')) || [];
    const conflicts = JSON.parse(localStorage.getItem('conflicts')) || [];
    
    setStats({
      nurses: nurses.length,
      shifts: shifts.length,
      pendingLeaves: leaves.filter(l => l.status === 'Pending').length,
      conflicts: conflicts.length
    });
  }, []);

  const cards = [
    { icon: FaUserNurse, value: stats.nurses, label: 'Total Nurses', color: '#3b82f6' },
    { icon: FaClock, value: stats.shifts, label: 'Active Shifts', color: '#3b82f6' },
    { icon: FaFileLines, value: stats.pendingLeaves, label: 'Pending Leaves', color: '#3b82f6' },
    { icon: FaTriangleExclamation, value: stats.conflicts, label: 'Conflict Alerts', color: '#3b82f6' },
  ];

  const quickActions = [
    { label: 'Create Schedule', path: '/roster-builder', icon: 'fa-plus' },
    { label: 'Assign Shift', path: '/shift-schedule', icon: 'fa-user-check' },
    { label: 'Approve Leave', path: '/leave-management', icon: 'fa-check' },
    { label: 'Generate Report', path: '/export-schedule', icon: 'fa-chart-line' },
  ];

  return (
    <div className="dashboard-container">
      <ModuleHeader
        title="Dashboard Overview"
        subtitle="Manage schedules, nurses, and hospital operations efficiently."
        profileText={`Welcome, ${userRole} 👨‍⚕️`}
      />

      <div className="banner">
        <div className="banner-text"><h2>Healthcare Workforce Management</h2><p>Monitor nurse schedules, manage shifts, and streamline hospital staffing operations.</p></div>
        <div className="banner-icon"><i className="fa-solid fa-hospital"></i></div>
      </div>

      <div className="cards">
        {cards.map((card, idx) => (
          <div key={idx} className="card">
            <card.icon style={{ fontSize: 35, color: card.color }} />
            <h3>{card.label}</h3>
            <p>{card.value}</p>
          </div>
        ))}
      </div>

      <div className="actions">
        <h2>Quick Actions</h2>
        <div className="buttons">
          {quickActions.map((action, idx) => (
            <button key={idx} onClick={() => navigate(action.path)}><i className={`fa-solid ${action.icon}`}></i> {action.label}</button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;