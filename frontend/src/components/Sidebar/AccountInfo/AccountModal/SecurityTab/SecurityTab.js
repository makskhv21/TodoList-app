import React, { useState } from 'react';
import './SecurityTab.css';
import PasswordInput from './PasswordInput/PasswordInput';
import PasswordStrength from './PasswordStrength/PasswordStrength';
import usePasswordValidation from './hooks/usePasswordValidation';

const SecurityTab = () => {
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const { passwordStrength, passwordErrors, checkPasswordStrength } =
    usePasswordValidation();
  const [successMessage, setSuccessMessage] = useState('');

  const handleNewPasswordChange = (e) => {
    setNewPassword(e.target.value);
    checkPasswordStrength(e.target.value);
  };

  const handleConfirmPasswordChange = (e) => setConfirmPassword(e.target.value);

  const handleChangePassword = () => {
    const isPasswordMatching = newPassword === confirmPassword;
    const isPasswordValid =
      passwordErrors.length === 0 && newPassword.length >= 6;
    setSuccessMessage(
      isPasswordValid && isPasswordMatching
        ? 'Password successfully changed!'
        : 'Password change failed.'
    );
  };

  const resetFields = () => {
    setNewPassword('');
    setConfirmPassword('');
    checkPasswordStrength('');
    setSuccessMessage('');
  };

  return (
    <div className="account-security">
      <h3>Change Password</h3>
      <PasswordInput
        label="New Password"
        value={newPassword}
        onChange={handleNewPasswordChange}
      />
      <PasswordInput
        label="Confirm New Password"
        value={confirmPassword}
        onChange={handleConfirmPasswordChange}
      />
      <PasswordStrength strength={passwordStrength} errors={passwordErrors} />
      <p
        className={
          successMessage.includes('successfully')
            ? 'success-message'
            : 'error-message'
        }
      >
        {successMessage}
      </p>
      <div className="container-btn-security">
        <button className="btn-security" onClick={handleChangePassword}>
          Change Password
        </button>
        <button className="btn-security" onClick={resetFields}>
          Reset Password
        </button>
      </div>
    </div>
  );
};

export default SecurityTab;
