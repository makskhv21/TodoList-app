import React, { useState } from 'react';
import './SignUp.css';

import iconEyeOpen from './img/iconEyeOpen.png';
import iconEyeClose from './img/iconEyeClose.png';

const SignUp = () => {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
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

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);

        setTimeout(() => {
        setLoading(false);
        alert('Account created successfully!');
        }, 1000);
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
              name="firstName"
              value={formData.firstName}
              onChange={handleInputChange}
              placeholder="First Name"
              required
            />
            <input
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleInputChange}
              placeholder="Last Name"
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

        <div className="social-login">
          <p>Or sign up with</p>
          <div className="social-icons">
            <button className="social-btn google-btn">Google</button>
            <button className="social-btn facebook-btn">Facebook</button>
          </div>
        </div>

        <div className="account-link">
          <p>Already have an account? <a href="/login" className="login-link">Log In</a></p>
        </div>
      </div>
    </div>
  );
};

export default SignUp;