// pages/NurseProfiles.jsx
import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import ModuleHeader from '../components/ModuleHeader.jsx';
import { useLocalStorage } from '../hooks/useLocalStorage';

const NurseProfiles = () => {
  const { userRole } = useAuth();
  const [nurses, setNurses] = useLocalStorage('nurses', []);
  const [searchTerm, setSearchTerm] = useState('');
  const [formData, setFormData] = useState({ name: '', id: '', department: '', experience: '', contact: '' });
  const [stats, setStats] = useState({ total: 0, departments: 0 });

  useEffect(() => {
    const uniqueDepts = new Set(nurses.map(n => n.department));
    setStats({ total: nurses.length, departments: uniqueDepts.size });
  }, [nurses]);

  const addNurse = () => {
    if (!formData.name || !formData.id || !formData.department) {
      alert('Please fill all fields');
      return;
    }
    setNurses([...nurses, formData]);
    setFormData({ name: '', id: '', department: '', experience: '', contact: '' });
  };

  const deleteNurse = (index) => {
    if (confirm('Delete Nurse?')) {
      const newNurses = [...nurses];
      newNurses.splice(index, 1);
      setNurses(newNurses);
    }
  };

  const filteredNurses = nurses.filter(n => 
    n.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    n.department.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <ModuleHeader
        title="Nurse Profiles"
        subtitle="Manage nurse information and records."
        profileText={`Welcome, ${userRole} 👨‍⚕️`}
      />

      <div className="cards">
        <div className="card"><h2>{stats.total}</h2><p>Total Nurses</p></div>
        <div className="card"><h2>{stats.departments}</h2><p>Departments</p></div>
      </div>

      <div className="form-box">
        <h2>Add Nurse</h2>
        <div className="form-grid">
          <input type="text" placeholder="Nurse Name" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} />
          <input type="text" placeholder="Nurse ID" value={formData.id} onChange={(e) => setFormData({...formData, id: e.target.value})} />
          <input type="text" placeholder="Department" value={formData.department} onChange={(e) => setFormData({...formData, department: e.target.value})} />
          <input type="number" placeholder="Experience" value={formData.experience} onChange={(e) => setFormData({...formData, experience: e.target.value})} />
          <input type="text" placeholder="Contact Number" value={formData.contact} onChange={(e) => setFormData({...formData, contact: e.target.value})} />
          <button className="add-btn" onClick={addNurse}>Add Nurse</button>
        </div>
      </div>

      <div className="table-box">
        <input type="text" className="search-box" placeholder="Search Nurse..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
        <table>
          <thead><tr><th>Name</th><th>ID</th><th>Department</th><th>Experience</th><th>Contact</th><th>Action</th></tr></thead>
          <tbody>
            {filteredNurses.map((nurse, idx) => (
              <tr key={idx}>
                <td>{nurse.name}</td><td>{nurse.id}</td><td>{nurse.department}</td>
                <td>{nurse.experience} Years</td><td>{nurse.contact}</td>
                <td><button className="delete-btn" onClick={() => deleteNurse(idx)}>Delete</button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default NurseProfiles;