import React from 'react';

const PasswordStrength = ({ strength, errors }) => (
  <div className="password-strength-container">
    <p className="password-strength-label">Password Strength:</p>
    <div className="password-strength-bar">
      <div
        className={`weak ${strength === 'Weak' ? 'active' : ''}`}
        style={{ width: strength === 'Weak' ? '100%' : '0%' }}
      ></div>
      <div
        className={`medium ${strength === 'Medium' || strength === 'Strong' ? 'active' : ''}`}
        style={{
          width: strength === 'Medium' || strength === 'Strong' ? '100%' : '0%',
        }}
      ></div>
      <div
        className={`strong ${strength === 'Strong' ? 'active' : ''}`}
        style={{ width: strength === 'Strong' ? '100%' : '0%' }}
      ></div>
    </div>
    {errors.length > 0 && (
      <ul className="password-errors">
        {errors.map((err, idx) => (
          <li key={idx}>{err}</li>
        ))}
      </ul>
    )}
  </div>
);

export default PasswordStrength;
