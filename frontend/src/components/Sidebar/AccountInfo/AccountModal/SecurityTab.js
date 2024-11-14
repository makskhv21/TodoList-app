import React from 'react';

const SecurityTab = ({ is2FAEnabled, setIs2FAEnabled }) => {
    const toggle2FA = () => {
        setIs2FAEnabled(!is2FAEnabled);
        alert(is2FAEnabled ? "2FA Disabled" : "2FA Enabled");
    };

    return (
        <div className="account-security">
            <h3>Change Password</h3>
            <input type="password" placeholder="New Password" />
            <input type="password" placeholder="Confirm New Password" />
            <button onClick={() => alert('Change Password clicked')}>Change Password</button>
            <button onClick={() => alert('Reset Password clicked')}>Reset Password</button>
            <h3>Two-Factor Authentication</h3>
            <button onClick={toggle2FA}>{is2FAEnabled ? "Disable 2FA" : "Enable 2FA"}</button>
        </div>
    );
};

export default SecurityTab;
