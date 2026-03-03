import React, { useState } from 'react';
import axios from 'axios';
import { Routes, Route, useNavigate } from 'react-router-dom';
import './App.css';

function Dashboard() {
  const navigate = useNavigate();
  return (
    <div className="App">
      <h1>🎊 أهلاً بك في لوحة التحكم</h1>
      <button onClick={() => { localStorage.removeItem('token'); navigate('/'); }} style={{width: '200px', background: '#e94560'}}>خروج</button>
    </div>
  );
}

function AuthForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleAction = async (type) => {
    const endpoint = `http://127.0.0.1:5000/api/auth/${type}`;
    try {
      const res = await axios.post(endpoint, { email, password });
      alert("✅ " + (res.data.msg || "تمت العملية"));
      
if (type === 'login') {
  // بنبعت التوكن في الـ URL كأننا بنبعت رسالة
  const token = res.data.token;
  window.location.replace(`http://127.0.0.1:5500/old-design/index.html?token=${token}`);
}
    } catch (err) {
      alert("❌ " + (err.response?.data?.msg || "خطأ في البيانات"));
    }
  };

  return (
    <div className="App">
      <h1>Al-Amal System</h1>
      <div className="auth-container">
        <div className="auth-card">
          <h2>Login</h2>
          <input type="email" placeholder="Email" onChange={e => setEmail(e.target.value)} />
          <input type="password" placeholder="Password" onChange={e => setPassword(e.target.value)} />
          <button className="btn-login" onClick={() => handleAction('login')}>Login</button>
        </div>
        
        <div className="auth-card">
          <h2>New Account</h2>
          <input type="email" placeholder="Email" onChange={e => setEmail(e.target.value)} />
          <input type="password" placeholder="Password" onChange={e => setPassword(e.target.value)} />
          <button className="btn-register" onClick={() => handleAction('register')}>Register</button>
        </div>
      </div>
    </div>
  );
}

function App() {
  return (
    <AuthForm /> 
  );
}

export default App;


