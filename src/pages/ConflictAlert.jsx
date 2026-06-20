// pages/ConflictAlert.jsx
import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import ModuleHeader from '../components/ModuleHeader.jsx';
import { useLocalStorage } from '../hooks/useLocalStorage';

const ConflictAlert = () => {
  const { userRole } = useAuth();
  const [shifts] = useLocalStorage('shiftSchedules', []);
  const [leaves] = useLocalStorage('leaves', []);
  const [alerts, setAlerts] = useState([]);
  const [stats, setStats] = useState({ total: 0, high: 0, medium: 0 });

  const generateAlerts = () => {
    const newAlerts = [];

    // Check for multiple shifts on same date for same nurse
    for (let i = 0; i < shifts.length; i++) {
      for (let j = i + 1; j < shifts.length; j++) {
        if (shifts[i].nurse === shifts[j].nurse && shifts[i].date === shifts[j].date) {
          newAlerts.push({
            id: `CA${100 + newAlerts.length}`,
            nurse: shifts[i].nurse,
            description: 'Multiple shifts assigned on same date',
            priority: 'High'
          });
        }
      }
    }

    // Check for approved leave but shift assigned
    leaves.forEach(leave => {
      if (leave.status === 'Approved') {
        shifts.forEach(shift => {
          if (leave.nurse === shift.nurse && leave.date === shift.date) {
            newAlerts.push({
              id: `CA${100 + newAlerts.length}`,
              nurse: leave.nurse,
              description: 'Approved leave but shift assigned',
              priority: 'Medium'
            });
          }
        });
      }
    });

    setAlerts(newAlerts);
    setStats({
      total: newAlerts.length,
      high: newAlerts.filter(a => a.priority === 'High').length,
      medium: newAlerts.filter(a => a.priority === 'Medium').length,
    });
  };

  useEffect(() => {
    generateAlerts();
  }, [shifts, leaves]);

  const getPriorityClass = (priority) => {
    if (priority === 'High') return 'high';
    return 'medium';
  };

  return (
    <div>
      <ModuleHeader
        title="Conflict Alerts"
        subtitle="Monitor scheduling conflicts and leave clashes"
        profileText={`Welcome, ${userRole}`}
      />

      <div className="stats">
        <div className="stat-card"><h2>{stats.total}</h2><p>Total Alerts</p></div>
        <div className="stat-card"><h2>{stats.high}</h2><p>High Priority</p></div>
        <div className="stat-card"><h2>{stats.medium}</h2><p>Medium Priority</p></div>
      </div>

      <div className="card">
        <button className="refresh-btn" onClick={generateAlerts}>Refresh Alerts</button>
        <table>
          <thead><tr><th>Alert ID</th><th>Nurse</th><th>Description</th><th>Priority</th></tr></thead>
          <tbody>
            {alerts.length === 0 ? (
              <tr><td colSpan="4" style={{ textAlign: 'center', color: 'green', fontWeight: 'bold' }}>No Conflicts Detected ✅</td></tr>
            ) : (
              alerts.map(alert => (
                <tr key={alert.id}>
                  <td>{alert.id}</td><td>{alert.nurse}</td><td>{alert.description}</td>
                  <td className={getPriorityClass(alert.priority)}>{alert.priority}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ConflictAlert;