// pages/Notifications.jsx
import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import ModuleHeader from '../components/ModuleHeader.jsx';
import { useLocalStorage } from '../hooks/useLocalStorage';

const Notifications = () => {
  const { userRole } = useAuth();
  const [notifications, setNotifications] = useLocalStorage('notifications', []);
  const [formData, setFormData] = useState({ title: '', message: '' });
  const [stats, setStats] = useState({ total: 0, unread: 0, read: 0 });

  useEffect(() => {
    setStats({
      total: notifications.length,
      unread: notifications.filter(n => n.status === 'Unread').length,
      read: notifications.filter(n => n.status === 'Read').length,
    });
  }, [notifications]);

  const addNotification = () => {
    if (!formData.title || !formData.message) {
      alert('Please fill all fields');
      return;
    }
    setNotifications([...notifications, { ...formData, status: 'Unread' }]);
    setFormData({ title: '', message: '' });
  };

  const markRead = (index) => {
    const newNotifications = [...notifications];
    newNotifications[index].status = 'Read';
    setNotifications(newNotifications);
  };

  const deleteNotification = (index) => {
    if (confirm('Delete Notification?')) {
      const newNotifications = [...notifications];
      newNotifications.splice(index, 1);
      setNotifications(newNotifications);
    }
  };

  const getStatusClass = (status) => status === 'Read' ? 'read' : 'unread';

  return (
    <div>
      <ModuleHeader
        title="Notifications"
        subtitle="Manage System Notifications"
        profileText={`Welcome, ${userRole}`}
      />

      <div className="stats">
        <div className="stat-card"><h2>{stats.total}</h2><p>Total Notifications</p></div>
        <div className="stat-card"><h2>{stats.unread}</h2><p>Unread</p></div>
        <div className="stat-card"><h2>{stats.read}</h2><p>Read</p></div>
      </div>

      <div className="card">
        <h2>Create Notification</h2>
        <div className="form-grid">
          <input type="text" placeholder="Notification Title" value={formData.title} onChange={(e) => setFormData({...formData, title: e.target.value})} />
          <textarea placeholder="Notification Message" value={formData.message} onChange={(e) => setFormData({...formData, message: e.target.value})}></textarea>
          <button className="add-btn" onClick={addNotification}>Add Notification</button>
        </div>
      </div>

      <div className="card">
        <h2>Notification Center</h2>
        <table>
          <thead><tr><th>Title</th><th>Message</th><th>Status</th><th>Actions</th></tr></thead>
          <tbody>
            {notifications.length === 0 ? (
              <tr><td colSpan="4" style={{ textAlign: 'center', color: 'green', fontWeight: 'bold' }}>No Notifications Available</td></tr>
            ) : (
              notifications.map((n, idx) => (
                <tr key={idx}>
                  <td>{n.title}</td><td>{n.message}</td>
                  <td className={getStatusClass(n.status)}>{n.status}</td>
                  <td>
                    <button className="read-btn" onClick={() => markRead(idx)}>Read</button>
                    <button className="delete-btn" onClick={() => deleteNotification(idx)}>Delete</button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Notifications;