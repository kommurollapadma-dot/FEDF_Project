// pages/RosterBuilder.jsx
import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import ModuleHeader from '../components/ModuleHeader.jsx';
import { useLocalStorage } from '../hooks/useLocalStorage';

const RosterBuilder = () => {
  const { userRole } = useAuth();
  const [rosters, setRosters] = useLocalStorage('rosters', []);
  const [formData, setFormData] = useState({ nurse: '', department: 'ICU', shift: 'Morning', date: '' });

  const departments = ['ICU', 'Emergency', 'Pediatrics', 'General Ward'];
  const shifts = ['Morning', 'Evening', 'Night'];

  const addRoster = () => {
    if (!formData.nurse || !formData.date) {
      alert('Fill all fields');
      return;
    }
    setRosters([...rosters, { ...formData }]);
    setFormData({ nurse: '', department: 'ICU', shift: 'Morning', date: '' });
  };

  const deleteRoster = (index) => {
    const newRosters = [...rosters];
    newRosters.splice(index, 1);
    setRosters(newRosters);
  };

  return (
    <div>
      <ModuleHeader
        title="Roster Builder"
        profileText={`Welcome, ${userRole} 👨‍⚕️`}
      />
      
      <div className="form-box">
        <h2>Create Roster</h2>
        <div className="form-grid">
          <input type="text" placeholder="Nurse Name" value={formData.nurse} onChange={(e) => setFormData({...formData, nurse: e.target.value})} />
          <select value={formData.department} onChange={(e) => setFormData({...formData, department: e.target.value})}>{departments.map(d => <option key={d}>{d}</option>)}</select>
          <select value={formData.shift} onChange={(e) => setFormData({...formData, shift: e.target.value})}>{shifts.map(s => <option key={s}>{s}</option>)}</select>
          <input type="date" value={formData.date} onChange={(e) => setFormData({...formData, date: e.target.value})} />
          <button className="add-btn" onClick={addRoster}>Add Roster</button>
        </div>
      </div>

      <div className="table-box">
        <h2>Roster Schedule</h2>
        <table>
          <thead><tr><th>Nurse</th><th>Department</th><th>Shift</th><th>Date</th><th>Action</th></tr></thead>
          <tbody>
            {rosters.map((roster, idx) => (
              <tr key={idx}>
                <td>{roster.nurse}</td><td>{roster.department}</td><td>{roster.shift}</td><td>{roster.date}</td>
                <td><button className="delete-btn" onClick={() => deleteRoster(idx)}>Delete</button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RosterBuilder;