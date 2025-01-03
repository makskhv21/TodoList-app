import React, { useState } from 'react';
import iconEyeOpen from '../../../../../../pages/img/iconEyeOpen.png';
import iconEyeClose from '../../../../../../pages/img/iconEyeClose.png';

const PasswordInput = ({ label, value, onChange }) => {
  const [showPassword, setShowPassword] = useState(false);

  const toggleVisibility = () => setShowPassword(!showPassword);

  return (
    <div className="input-wrapper">
      <input
        type={showPassword ? 'text' : 'password'}
        placeholder={label}
        value={value}
        onChange={onChange}
      />
      <button className="toggle-visibility" onClick={toggleVisibility}>
        <img
          src={showPassword ? iconEyeOpen : iconEyeClose}
          alt={showPassword ? 'Hide Password' : 'Show Password'}
        />
      </button>
    </div>
  );
};

export default PasswordInput;
