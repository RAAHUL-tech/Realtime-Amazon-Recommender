import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const SignUpPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSignUp = async () => {
    try {
      const res = await axios.post('http://localhost:8000/api/signup', { email, password });
      localStorage.setItem('userId', res.data.user_id);
      navigate('/home');
    } catch (err) {
      alert('Signup failed');
    }
  };

  return (
    <div className="auth-container">
      <h2>Sign Up</h2>
      <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" />
      <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" />
      <button onClick={handleSignUp}>Sign Up</button>
    </div>
  );
};

export default SignUpPage;