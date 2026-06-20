// pages/Homepage.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FaCalendarDays, FaUserNurse, FaClock, FaBell, FaHospital } from 'react-icons/fa6';
import './Homepage.css';

const Homepage = () => {
  const navigate = useNavigate();

  const features = [
    { icon: FaCalendarDays, title: 'Smart Scheduling', description: 'Automatically create balanced nurse schedules with minimal conflicts.' },
    { icon: FaUserNurse, title: 'Nurse Management', description: 'Store and manage nurse profiles, departments, and availability.' },
    { icon: FaClock, title: 'Shift Tracking', description: 'Monitor active shifts, overtime, and attendance in real-time.' },
    { icon: FaBell, title: 'Notifications', description: 'Send instant alerts for schedule updates and shift changes.' },
  ];

  return (
    <>
      <nav className="homepage-navbar">
        <div className="logo">
          <img src="/logo.png" alt="PulsePlanner logo" className="site-logo" />
          <span className="brand-text">Pulse<span>Planner</span></span>
        </div>
        <div className="nav-links">
          <a href="#home">Home</a>
          <a href="#features">Features</a>
          <a href="#about">About</a>
          <button className="nav-btn" onClick={() => navigate('/login')}>Login</button>
        </div>
      </nav>

      <section className="hero" id="home">
        <div className="hero-container">
          <div className="hero-text">
            <h1>Smart Nurse <span>Shift Scheduling</span> System</h1>
            <p>PulsePlanner helps hospitals manage nurse schedules, reduce shift conflicts, track overtime, and improve workforce efficiency with smart healthcare planning.</p>
            <div className="hero-buttons">
              <button className="primary-btn" onClick={() => navigate('/login')}>Get Started</button>
              <button className="secondary-btn">Learn More</button>
            </div>
          </div>
          <div className="hero-image">
            <div className="hero-card">
              <div className="shift-box"><div><h4>Morning Shift</h4><p>08:00 AM - 04:00 PM</p></div><div className="status active">Active</div></div>
              <div className="shift-box"><div><h4>Night Shift</h4><p>10:00 PM - 06:00 AM</p></div><div className="status pending">Pending</div></div>
              <div className="shift-box"><div><h4>Emergency Ward</h4><p>12 Nurses Assigned</p></div><div className="status active">Stable</div></div>
            </div>
          </div>
        </div>
      </section>

      <section className="features" id="features">
        <div className="section-title"><h2>Powerful Features</h2><p>Everything you need for efficient nurse workforce management.</p></div>
        <div className="feature-grid">
          {features.map((feature, idx) => (
            <div key={idx} className="feature-card">
              <feature.icon />
              <h3>{feature.title}</h3>
              <p>{feature.description}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="about" id="about">
        <div className="about-image"><FaHospital className="about-icon" /></div>
        <div className="about-text">
          <h2>Why Choose PulsePlanner?</h2>
          <p>PulsePlanner is designed specifically for hospitals and healthcare institutions. Our platform simplifies nurse scheduling and improves workforce productivity.</p>
          <p>With an intuitive interface and automated scheduling system, hospitals can reduce manual work and focus more on patient care.</p>
          <button className="nav-btn" onClick={() => navigate('/dashboard')}>Explore Dashboard</button>
        </div>
      </section>

      <footer className="footer"><p>© 2026 PulsePlanner | Nurse Shift Scheduling System</p></footer>
    </>
  );
};

export default Homepage;