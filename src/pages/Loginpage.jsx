// pages/Loginpage.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './Loginpage.css';

const Loginpage = () => {
  const [activeTab, setActiveTab] = useState('login');
  const [loginData, setLoginData] = useState({ email: '', password: '', role: 'Admin' });
  const [registerData, setRegisterData] = useState({ name: '', email: '', password: '', role: 'Staff Nurse' });
  const [message, setMessage] = useState({ text: '', type: '' });
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleLogin = (e) => {
    e.preventDefault();
    if (!loginData.email || !loginData.password) {
      setMessage({ text: 'Please fill all fields', type: 'error' });
      return;
    }
    setMessage({ text: `${loginData.role} Login Successful!`, type: 'success' });
    login(loginData.email, loginData.password, loginData.role);
    setTimeout(() => navigate('/dashboard'), 1000);
  };

  const handleRegister = (e) => {
    e.preventDefault();
    if (!registerData.name || !registerData.email || !registerData.password) {
      setMessage({ text: 'All fields are required', type: 'error' });
      return;
    }
    setMessage({ text: 'Registration Successful!', type: 'success' });
    setRegisterData({ name: '', email: '', password: '', role: 'Staff Nurse' });
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <div className="logo">
          <img src="/logo.png" alt="PulsePlanner logo" className="login-logo" />
        </div>
        <h1>PulsePlanner</h1>
        <p className="subtitle">Smart Healthcare Authentication System</p>
        
        <div className="tabs">
          <button className={activeTab === 'login' ? 'active' : ''} onClick={() => setActiveTab('login')}>Login</button>
          <button className={activeTab === 'register' ? 'active' : ''} onClick={() => setActiveTab('register')}>Register</button>
        </div>

        {activeTab === 'login' && (
          <form onSubmit={handleLogin}>
            <div className="input-group"><label>Email Address</label><input type="email" value={loginData.email} onChange={(e) => setLoginData({...loginData, email: e.target.value})} placeholder="Enter your email" /></div>
            <div className="input-group"><label>Password</label><input type="password" value={loginData.password} onChange={(e) => setLoginData({...loginData, password: e.target.value})} placeholder="Enter your password" /></div>
            <div className="input-group"><label>Select Role</label><select value={loginData.role} onChange={(e) => setLoginData({...loginData, role: e.target.value})}><option>Admin</option><option>Head Nurse</option><option>Staff Nurse</option></select></div>
            <button type="submit" className="btn">Login Securely</button>
            {message.text && <div className={`message ${message.type}`}>{message.text}</div>}
          </form>
        )}

        {activeTab === 'register' && (
          <form onSubmit={handleRegister}>
            <div className="input-group"><label>Full Name</label><input type="text" value={registerData.name} onChange={(e) => setRegisterData({...registerData, name: e.target.value})} placeholder="Enter your full name" /></div>
            <div className="input-group"><label>Email Address</label><input type="email" value={registerData.email} onChange={(e) => setRegisterData({...registerData, email: e.target.value})} placeholder="Enter your email" /></div>
            <div className="input-group"><label>Create Password</label><input type="password" value={registerData.password} onChange={(e) => setRegisterData({...registerData, password: e.target.value})} placeholder="Create a strong password" /></div>
            <div className="input-group"><label>Select Role</label><select value={registerData.role} onChange={(e) => setRegisterData({...registerData, role: e.target.value})}><option>Staff Nurse</option><option>Head Nurse</option></select></div>
            <button type="submit" className="btn">Create Account</button>
            {message.text && <div className={`message ${message.type}`}>{message.text}</div>}
          </form>
        )}
      </div>
    </div>
  );
};

export default Loginpage;