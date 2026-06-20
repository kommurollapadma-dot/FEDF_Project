// pages/ShiftSchedule.jsx
import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import ModuleHeader from '../components/ModuleHeader.jsx';
import { useLocalStorage } from '../hooks/useLocalStorage';

const ShiftSchedule = () => {
  const { userRole } = useAuth();
  const [shifts, setShifts] = useLocalStorage('shiftSchedules', []);
  const [formData, setFormData] = useState({ nurse: '', department: 'ICU', shift: 'Morning', date: '' });
  const [stats, setStats] = useState({ total: 0, morning: 0, evening: 0, night: 0 });

  const departments = ['ICU', 'Emergency', 'Pediatrics', 'General Ward'];
  const shiftsList = ['Morning', 'Evening', 'Night'];

  useEffect(() => {
    updateStats();
  }, [shifts]);

  const updateStats = () => {
    setStats({
      total: shifts.length,
      morning: shifts.filter(s => s.shift === 'Morning').length,
      evening: shifts.filter(s => s.shift === 'Evening').length,
      night: shifts.filter(s => s.shift === 'Night').length,
    });
  };

  const assignShift = () => {
    if (!formData.nurse || !formData.date) {
      alert('Please fill all fields');
      return;
    }
    setShifts([...shifts, { ...formData }]);
    setFormData({ nurse: '', department: 'ICU', shift: 'Morning', date: '' });
  };

  const deleteShift = (index) => {
    if (confirm('Delete this shift?')) {
      const newShifts = [...shifts];
      newShifts.splice(index, 1);
      setShifts(newShifts);
    }
  };

  const getShiftClass = (shift) => {
    if (shift === 'Morning') return 'shift-morning';
    if (shift === 'Evening') return 'shift-evening';
    return 'shift-night';
  };

  return (
    <div>
      <ModuleHeader
        title="Shift Schedule"
        profileText={`Welcome, ${userRole} 👨‍⚕️`}
      />

      <div className="stats">
        <div className="stat-card"><h2>{stats.total}</h2><p>Total Shifts</p></div>
        <div className="stat-card"><h2>{stats.morning}</h2><p>Morning</p></div>
        <div className="stat-card"><h2>{stats.evening}</h2><p>Evening</p></div>
        <div className="stat-card"><h2>{stats.night}</h2><p>Night</p></div>
      </div>

      <div className="card">
        <h2>Assign Shift</h2>
        <div className="form-grid">
          <input type="text" placeholder="Nurse Name" value={formData.nurse} onChange={(e) => setFormData({...formData, nurse: e.target.value})} />
          <select value={formData.department} onChange={(e) => setFormData({...formData, department: e.target.value})}>{departments.map(d => <option key={d}>{d}</option>)}</select>
          <select value={formData.shift} onChange={(e) => setFormData({...formData, shift: e.target.value})}>{shiftsList.map(s => <option key={s}>{s}</option>)}</select>
          <input type="date" value={formData.date} onChange={(e) => setFormData({...formData, date: e.target.value})} />
          <button className="btn" onClick={assignShift}>Assign Shift</button>
        </div>
      </div>

      <div className="card">
        <h2>Assigned Shifts</h2>
        <table>
          <thead><tr><th>Nurse</th><th>Department</th><th>Shift</th><th>Date</th><th>Action</th></tr></thead>
          <tbody>
            {shifts.map((shift, idx) => (
              <tr key={idx}>
                <td>{shift.nurse}</td><td>{shift.department}</td>
                <td className={getShiftClass(shift.shift)}>{shift.shift}</td>
                <td>{shift.date}</td>
                <td><button className="delete-btn" onClick={() => deleteShift(idx)}>Delete</button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ShiftSchedule;