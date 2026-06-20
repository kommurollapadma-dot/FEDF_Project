// pages/ExportSchedule.jsx
import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import ModuleHeader from '../components/ModuleHeader.jsx';
import { useLocalStorage } from '../hooks/useLocalStorage';

const ExportSchedule = () => {
  const { userRole } = useAuth();
  const [schedules] = useLocalStorage('shiftSchedules', []);
  const [stats, setStats] = useState({ total: 0, morning: 0, night: 0 });

  useEffect(() => {
    setStats({
      total: schedules.length,
      morning: schedules.filter(s => s.shift === 'Morning').length,
      night: schedules.filter(s => s.shift === 'Night').length,
    });
  }, [schedules]);

  const exportCSV = () => {
    let csv = 'Nurse,Department,Shift,Date\n';
    schedules.forEach(item => {
      csv += `${item.nurse},${item.department},${item.shift},${item.date}\n`;
    });
    
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'ShiftSchedule.csv';
    a.click();
    window.URL.revokeObjectURL(url);
  };

  return (
    <div>
      <ModuleHeader
        title="Export Schedule"
        subtitle="Export and Print Shift Schedules"
        profileText={`Welcome, ${userRole}`}
      />

      <div className="stats">
        <div className="stat-card"><h2>{stats.total}</h2><p>Total Schedules</p></div>
        <div className="stat-card"><h2>{stats.morning}</h2><p>Morning Shifts</p></div>
        <div className="stat-card"><h2>{stats.night}</h2><p>Night Shifts</p></div>
      </div>

      <div className="card">
        <div className="buttons">
          <button className="export-btn" onClick={exportCSV}>Export CSV</button>
          <button className="print-btn" onClick={() => window.print()}>Print Schedule</button>
        </div>
        <table className="print-table">
          <thead><tr><th>Nurse</th><th>Department</th><th>Shift</th><th>Date</th></tr></thead>
          <tbody>
            {schedules.length === 0 ? (
              <tr><td colSpan="4" style={{ textAlign: 'center', color: 'green', fontWeight: 'bold' }}>No Schedule Data Found</td></tr>
            ) : (
              schedules.map((item, idx) => (
                <tr key={idx}>
                  <td>{item.nurse}</td><td>{item.department}</td><td>{item.shift}</td><td>{item.date}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ExportSchedule;