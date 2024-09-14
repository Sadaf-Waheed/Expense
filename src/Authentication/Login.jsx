import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom'; // Import Link for navigation
import './Login.css'; // Make sure you have appropriate CSS for styling

const Login = () => {
  // State to manage form inputs
  const [loginData, setLoginData] = useState({
    email: '',
    password: '',
  });

  // State to manage form errors
  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState('');

  // Handle form input changes
  const handleChange = (e) => {
    setLoginData({
      ...loginData,
      [e.target.name]: e.target.value,
    });
  };

  // Form validation
  const validateForm = () => {
    const newErrors = {};
    if (!loginData.email) newErrors.email = 'Email is required';
    if (!loginData.password) newErrors.password = 'Password is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (!validateForm()) return; // Stop submission if form is not valid
  
    try {
      const response = await axios.post('http://localhost:5000/api/login', loginData);
      localStorage.setItem('token', response.data.token); // Store token in localStorage
      setSuccessMessage(response.data.message);
      setLoginData({ email: '', password: '' }); // Reset form
      setErrors({}); // Clear any errors
    } catch (error) {
      if (error.response && error.response.data) {
        setErrors({ apiError: error.response.data.message });
      }
    }
  };
  return (
    <div className="login-container">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={loginData.email}
            onChange={handleChange}
          />
          {errors.email && <p className="error">{errors.email}</p>}
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            value={loginData.password}
            onChange={handleChange}
          />
          {errors.password && <p className="error">{errors.password}</p>}
        </div>
        <button type="submit">Login</button>
        {errors.apiError && <p className="error">{errors.apiError}</p>}
        {successMessage && <p className="success">{successMessage}</p>}
      </form>
      <div className="signup-prompt">
        <p>Don't have an account? <Link to="/signup">Sign up here</Link></p>
      </div>
    </div>
  );
};

export default Login;
