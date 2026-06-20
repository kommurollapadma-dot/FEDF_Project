// pages/LeaveManagement.jsx
import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import ModuleHeader from '../components/ModuleHeader.jsx';
import { useLocalStorage } from '../hooks/useLocalStorage';

const LeaveManagement = () => {
  const { userRole } = useAuth();
  const [leaves, setLeaves] = useLocalStorage('leaves', []);
  const [formData, setFormData] = useState({ nurse: '', date: '', type: 'Sick Leave' });
  const [stats, setStats] = useState({ total: 0, approved: 0, pending: 0 });

  const leaveTypes = ['Sick Leave', 'Casual Leave', 'Emergency Leave', 'Maternity Leave'];

  useEffect(() => {
    setStats({
      total: leaves.length,
      approved: leaves.filter(l => l.status === 'Approved').length,
      pending: leaves.filter(l => l.status === 'Pending').length,
    });
  }, [leaves]);

  const applyLeave = () => {
    if (!formData.nurse || !formData.date) {
      alert('Fill all fields');
      return;
    }
    setLeaves([...leaves, { ...formData, status: 'Pending' }]);
    setFormData({ nurse: '', date: '', type: 'Sick Leave' });
  };

  const approveLeave = (index) => {
    const newLeaves = [...leaves];
    newLeaves[index].status = 'Approved';
    setLeaves(newLeaves);
  };

  const rejectLeave = (index) => {
    const newLeaves = [...leaves];
    newLeaves[index].status = 'Rejected';
    setLeaves(newLeaves);
  };

  const deleteLeave = (index) => {
    if (confirm('Delete Leave Request?')) {
      const newLeaves = [...leaves];
      newLeaves.splice(index, 1);
      setLeaves(newLeaves);
    }
  };

  const getStatusClass = (status) => {
    if (status === 'Approved') return 'approved';
    if (status === 'Rejected') return 'rejected';
    return 'pending';
  };

  return (
    <div>
      <ModuleHeader
        title="Leave Management"
        subtitle="Manage Nurse Leave Requests"
        profileText={`Welcome, ${userRole}`}
      />

      <div className="stats">
        <div className="stat-card"><h2>{stats.total}</h2><p>Total Requests</p></div>
        <div className="stat-card"><h2>{stats.approved}</h2><p>Approved</p></div>
        <div className="stat-card"><h2>{stats.pending}</h2><p>Pending</p></div>
      </div>

      <div className="card">
        <h2>Apply Leave</h2>
        <div className="form-grid">
          <input type="text" placeholder="Nurse Name" value={formData.nurse} onChange={(e) => setFormData({...formData, nurse: e.target.value})} />
          <input type="date" value={formData.date} onChange={(e) => setFormData({...formData, date: e.target.value})} />
          <select value={formData.type} onChange={(e) => setFormData({...formData, type: e.target.value})}>{leaveTypes.map(t => <option key={t}>{t}</option>)}</select>
          <button className="add-btn" onClick={applyLeave}>Apply Leave</button>
        </div>
      </div>

      <div className="card">
        <h2>Leave Requests</h2>
        <table>
          <thead><tr><th>Nurse</th><th>Date</th><th>Type</th><th>Status</th><th>Actions</th></tr></thead>
          <tbody>
            {leaves.map((leave, idx) => (
              <tr key={idx}>
                <td>{leave.nurse}</td><td>{leave.date}</td><td>{leave.type}</td>
                <td className={getStatusClass(leave.status)}>{leave.status}</td>
                <td>
                  <button className="approve-btn" onClick={() => approveLeave(idx)}>Approve</button>
                  <button className="reject-btn" onClick={() => rejectLeave(idx)}>Reject</button>
                  <button className="delete-btn" onClick={() => deleteLeave(idx)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default LeaveManagement;