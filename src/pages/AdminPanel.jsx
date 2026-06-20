// pages/AdminPanel.jsx
import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import ModuleHeader from '../components/ModuleHeader.jsx';

const AdminPanel = () => {
  const { userRole } = useAuth();
  const [stats, setStats] = useState({ nurses: 0, schedules: 0, leaves: 0, notifications: 0 });
  const [restoreFile, setRestoreFile] = useState(null);

  useEffect(() => {
    loadStats();
  }, []);

  const loadStats = () => {
    const nurses = JSON.parse(localStorage.getItem('nurses')) || [];
    const schedules = JSON.parse(localStorage.getItem('shiftSchedules')) || [];
    const leaves = JSON.parse(localStorage.getItem('leaves')) || [];
    const notifications = JSON.parse(localStorage.getItem('notifications')) || [];
    
    setStats({
      nurses: nurses.length,
      schedules: schedules.length,
      leaves: leaves.length,
      notifications: notifications.length,
    });
  };

  const backupData = () => {
    const backup = {
      nurses: JSON.parse(localStorage.getItem('nurses')) || [],
      shiftSchedules: JSON.parse(localStorage.getItem('shiftSchedules')) || [],
      leaves: JSON.parse(localStorage.getItem('leaves')) || [],
      notifications: JSON.parse(localStorage.getItem('notifications')) || [],
      overtimeData: JSON.parse(localStorage.getItem('overtimeData')) || [],
      rosters: JSON.parse(localStorage.getItem('rosters')) || [],
    };
    
    const blob = new Blob([JSON.stringify(backup, null, 2)], { type: 'application/json' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'PulsePlannerBackup.json';
    link.click();
    URL.revokeObjectURL(link.href);
  };

  const restoreData = () => {
    if (!restoreFile) {
      alert('Select backup file');
      return;
    }
    
    const reader = new FileReader();
    reader.onload = (e) => {
      const data = JSON.parse(e.target.result);
      for (let key in data) {
        localStorage.setItem(key, JSON.stringify(data[key]));
      }
      alert('Backup Restored Successfully');
      loadStats();
    };
    reader.readAsText(restoreFile);
  };

  const clearAllData = () => {
    if (confirm('Delete ALL system data?')) {
      localStorage.clear();
      alert('All Data Deleted');
      loadStats();
    }
  };

  return (
    <div>
      <ModuleHeader
        title="Admin Panel"
        subtitle="System Administration & Controls"
        profileText={`Welcome, ${userRole}`}
      />

      <div className="stats">
        <div className="stat-card"><h2>{stats.nurses}</h2><p>Total Nurses</p></div>
        <div className="stat-card"><h2>{stats.schedules}</h2><p>Shift Schedules</p></div>
        <div className="stat-card"><h2>{stats.leaves}</h2><p>Leave Requests</p></div>
        <div className="stat-card"><h2>{stats.notifications}</h2><p>Notifications</p></div>
      </div>

      <div className="card">
        <h2>System Controls</h2>
        <div className="buttons">
          <button className="backup-btn" onClick={backupData}>Backup Data</button>
          <button className="clear-btn" onClick={clearAllData}>Clear All Data</button>
        </div>
        <h3>Restore Backup</h3>
        <input type="file" accept=".json" onChange={(e) => setRestoreFile(e.target.files[0])} />
        <button className="restore-btn" onClick={restoreData}>Restore Data</button>
      </div>

      <div className="card">
        <h2>System Information</h2>
        <p><strong>Project:</strong> PulsePlanner</p>
        <p><strong>Version:</strong> 1.0</p>
        <p><strong>Technology:</strong> React, JSX, LocalStorage</p>
        <p><strong>Storage:</strong> LocalStorage</p>
      </div>
    </div>
  );
};

export default AdminPanel;