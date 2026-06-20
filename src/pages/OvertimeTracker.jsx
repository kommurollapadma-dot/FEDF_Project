// pages/OvertimeTracker.jsx
import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import ModuleHeader from '../components/ModuleHeader.jsx';
import { useLocalStorage } from '../hooks/useLocalStorage';

const OvertimeTracker = () => {
  const { userRole } = useAuth();
  const [overtimeData, setOvertimeData] = useLocalStorage('overtimeData', []);
  const [formData, setFormData] = useState({ name: '', hours: '', date: '' });
  const [stats, setStats] = useState({ totalRecords: 0, totalHours: 0 });

  useEffect(() => {
    const totalHours = overtimeData.reduce((sum, item) => sum + Number(item.hours), 0);
    setStats({ totalRecords: overtimeData.length, totalHours });
  }, [overtimeData]);

  const addOvertime = () => {
    if (!formData.name || !formData.hours || !formData.date) {
      alert('Please fill all fields');
      return;
    }
    setOvertimeData([...overtimeData, formData]);
    setFormData({ name: '', hours: '', date: '' });
  };

  const deleteRecord = (index) => {
    if (confirm('Delete this overtime record?')) {
      const newData = [...overtimeData];
      newData.splice(index, 1);
      setOvertimeData(newData);
    }
  };

  return (
    <div>
      <ModuleHeader
        title="Overtime Tracker"
        subtitle="Track nurse overtime records efficiently."
        profileText={`Welcome, ${userRole} 👨‍⚕️`}
      />

      <div className="cards">
        <div className="card"><h2>{stats.totalRecords}</h2><p>Total Records</p></div>
        <div className="card"><h2>{stats.totalHours}</h2><p>Total Overtime Hours</p></div>
      </div>

      <div className="form-box">
        <h2>Add Overtime Record</h2>
        <div className="form-grid">
          <input type="text" placeholder="Nurse Name" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} />
          <input type="number" placeholder="Overtime Hours" value={formData.hours} onChange={(e) => setFormData({...formData, hours: e.target.value})} />
          <input type="date" value={formData.date} onChange={(e) => setFormData({...formData, date: e.target.value})} />
          <button className="add-btn" onClick={addOvertime}>Add Record</button>
        </div>
      </div>

      <div className="table-box">
        <h2>Overtime Records</h2>
        <table>
          <thead><tr><th>Nurse Name</th><th>Hours</th><th>Date</th><th>Action</th></tr></thead>
          <tbody>
            {overtimeData.map((item, idx) => (
              <tr key={idx}>
                <td>{item.name}</td><td>{item.hours}</td><td>{item.date}</td>
                <td><button className="delete-btn" onClick={() => deleteRecord(idx)}>Delete</button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default OvertimeTracker;