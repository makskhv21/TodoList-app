import React, { useState } from 'react';

import './SecurityTab.css';

import iconEyeOpen from '../../../../../pages/img/iconEyeOpen.png';
import iconEyeClose from '../../../../../pages/img/iconEyeClose.png';


const SecurityTab = () => {
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [passwordStrength, setPasswordStrength] = useState(0);
    const [passwordErrors, setPasswordErrors] = useState([]);
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [successMessage, setSuccessMessage] = useState('');

    const checkPasswordStrength = (password) => {
        const errors = [];
        if (password.length < 6) errors.push("Password is too short");
        if (!/[A-Z]/.test(password)) errors.push("Password must contain at least one uppercase letter");
        if (!/\d/.test(password)) errors.push("Password must contain at least one number");
        if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) errors.push("Password must contain at least one special character");
    
        setPasswordErrors(errors);
    
        if (errors.length === 0) {
            if (password.length < 8) {
                setPasswordStrength('Weak');
            } else if (password.length < 12) {
                setPasswordStrength('Medium');
            } else {
                setPasswordStrength('Strong');
            }
        } else {
            setPasswordStrength('Weak');
        }
    };
    
    const handleNewPasswordChange = (e) => {
        setNewPassword(e.target.value);
        checkPasswordStrength(e.target.value);
    };

    const handleConfirmPasswordChange = (e) => setConfirmPassword(e.target.value);
    const toggleNewPasswordVisibility = () => setShowNewPassword(!showNewPassword);
    const toggleConfirmPasswordVisibility = () => setShowConfirmPassword(!showConfirmPassword);

    const handleChangePassword = () => {
        const isPasswordMatching = newPassword === confirmPassword;
        const isPasswordValid = passwordErrors.length === 0 && newPassword.length >= 6;
        setSuccessMessage(isPasswordValid && isPasswordMatching ? "Password successfully changed!" : "Password change failed.");
    };

    const resetFields = () => {
        setNewPassword('');
        setConfirmPassword('');
        setPasswordStrength(0);
        setPasswordErrors([]);
        setSuccessMessage('');
    };

    return (
        <div className="account-security">
            <h3>Change Password</h3>
            <div className="input-wrapper">
                <input
                    type={showNewPassword ? "text" : "password"}
                    placeholder="New Password"
                    value={newPassword}
                    onChange={handleNewPasswordChange}
                />
                <button className="toggle-visibility" onClick={toggleNewPasswordVisibility}>
                    <img
                        src={showNewPassword ? iconEyeOpen : iconEyeClose}
                        alt={showNewPassword ? "Hide Password" : "Show Password"}
                    />
                </button>
            </div>
            <div className="input-wrapper">
                <input
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="Confirm New Password"
                    value={confirmPassword}
                    onChange={handleConfirmPasswordChange}
                />
                <button className="toggle-visibility" onClick={toggleConfirmPasswordVisibility}>
                    <img
                        src={showConfirmPassword ? iconEyeOpen : iconEyeClose}
                        alt={showConfirmPassword ? "Hide Password" : "Show Password"}
                    />
                </button>
            </div>
            <div className="password-strength-container">
                <p className="password-strength-label">Password Strength:</p>
                <div className="password-strength-bar">
                    <div className={`weak ${passwordStrength === 'Weak' ? 'weak' : ''}`} style={{ width: passwordStrength === 'Weak' ? '100%' : '0%' }}></div>
                    <div className={`medium ${passwordStrength === 'Medium' || passwordStrength === 'Strong' ? 'medium' : ''}`} style={{ width: passwordStrength === 'Medium' || passwordStrength === 'Strong' ? '100%' : '0%' }}></div>
                    <div className={`strong ${passwordStrength === 'Strong' ? 'strong' : ''}`} style={{ width: passwordStrength === 'Strong' ? '100%' : '0%' }}></div>
                </div>
                {passwordErrors.length > 0 && (
                    <ul className="password-errors">
                        {passwordErrors.map((err, idx) => <li key={idx}>{err}</li>)}
                    </ul>
                )}
            </div>
            <p className={successMessage.includes("successfully") ? 'success-message' : 'error-message'}>
                {successMessage}
            </p>
            <div className='container-btn-security'>
                <button className='btn-security' onClick={handleChangePassword}>Change Password</button>
                <button className='btn-security' onClick={resetFields}>Reset Password</button>
            </div>
        </div>
    );
};

export default SecurityTab;