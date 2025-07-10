

import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { setUser } from '../../redux/slices/authSlice';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/users', { email, password });
      dispatch(setUser(response.data));
      alert('User Registered successfully!');
      navigate('/');
    } catch (error) {
      alert('Registration failed. Please try again.');
    }
  };

  return (
    <div className="container-fluid min-vh-100 d-flex align-items-center justify-content-center bg-light">
      <div className="card p-4 shadow-lg" style={{ maxWidth: '400px', width: '100%', borderRadius: '15px' }}>
        <h3 className="text-center text-primary mb-4">Create Your Account</h3>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="formEmail" className="form-label fw-semibold">Email Address</label>
            <input
              id="formEmail"
              type="email"
              className="form-control form-control-lg"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="formPassword" className="form-label fw-semibold">Password</label>
            <input
              id="formPassword"
              type="password"
              className="form-control form-control-lg"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="btn btn-primary w-100 fw-bold">
            Register
          </button>
        </form>
        <div className="text-center mt-3">
          <small>
            Already have an account?{' '}
            <a href="/LoginPage" className="text-decoration-none text-primary fw-semibold">Login here</a>
          </small>
        </div>
      </div>
    </div>
  );
};

export default Register;
