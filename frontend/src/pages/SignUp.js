import React, { useState } from 'react';
import './SignUp.css';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebaseConfig';

import iconEyeOpen from './img/iconEyeOpen.png';
import iconEyeClose from './img/iconEyeClose.png';

const SignUp = () => {
  const [formData, setFormData] = useState({
    phone: '',
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (formData.password !== formData.confirmPassword) {
      alert("Passwords don't match!");
      setLoading(false);
      return;
    }

    // Перевірка на коректний формат телефону
    const phoneRegex = /^\+?[1-9]\d{1,14}$/; // Формат, що дозволяє перевіряти всі міжнародні телефонні номери

    if (!phoneRegex.test(formData.phone)) {
      alert('Invalid phone number format! Please enter a valid phone number with country code.');
      setLoading(false);
      return;
    }

    try {
      await createUserWithEmailAndPassword(auth, formData.email, formData.password);
      alert('Account created successfully!');

      setFormData({
        phone: '',
        username: '',
        email: '',
        password: '',
        confirmPassword: '',
      });
    } catch (error) {
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  return (
    <div className="signup-container">
      <div className="signup-box">
        <h2 className="signup-title">Create Account</h2>

        <form onSubmit={handleSubmit} className="signup-form">
          <div className="input-group">
            <input
              type="text"
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
              placeholder="Phone Number (+1234567890)"
              style={{ width: '95%' }}
              required
            />
          </div>

          <div className="input-group">
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleInputChange}
              placeholder="Username"
              required
            />
          </div>

          <div className="input-group">
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              placeholder="Email"
              style={{ width: '95%' }}
              required
            />
          </div>

          <div className="input-group password-group">
            <input
              type={showPassword ? 'text' : 'password'}
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              placeholder="Password"
              style={{ width: '95%' }}
              required
            />
            <span className="password-toggle" onClick={togglePasswordVisibility}>
              <img
                src={showPassword ? iconEyeOpen : iconEyeClose}
                alt={showPassword ? 'Hide password' : 'Show password'}
                className="eye-icon"
              />
            </span>
          </div>

          <div className="input-group password-group">
            <input
              type={showConfirmPassword ? 'text' : 'password'}
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleInputChange}
              placeholder="Confirm Password"
              style={{ width: '95%' }}
              required
            />
            <span className="password-toggle" onClick={toggleConfirmPasswordVisibility}>
              <img
                src={showConfirmPassword ? iconEyeOpen : iconEyeClose}
                alt={showConfirmPassword ? 'Hide password' : 'Show password'}
                className="eye-icon"
              />
            </span>
          </div>

          <button type="submit" className="signup-btn" disabled={loading}>
            {loading ? 'Creating Account...' : 'Sign Up'}
          </button>
        </form>

        <div className="account-link">
          <p>Already have an account? <a href="/login" className="login-link">Log In</a></p>
        </div>
      </div>
    </div>
  );
};

export default SignUp;