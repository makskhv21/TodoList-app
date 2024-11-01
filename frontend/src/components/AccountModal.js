import React, { useState } from 'react';
import avatar from "./avatar.png";

const AccountModal = ({ isOpen, onClose }) => {
    if (!isOpen) return null;

    const [activeTab, setActiveTab] = useState("profile");
    const [formData, setFormData] = useState({
        username: "My name",
        email: "myemail@example.com",
    });
    const [avatarImage, setAvatarImage] = useState(avatar);
    const [emailError, setEmailError] = useState("");
    const [is2FAEnabled, setIs2FAEnabled] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });

        if (name === "email") {
            const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            setEmailError(emailPattern.test(value) ? "" : "Invalid email format");
        }
    };

    const handleAvatarChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setAvatarImage(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSaveChanges = () => {
        const confirmed = window.confirm("Are you sure you want to save your changes?");
        if (confirmed) {
            alert('Changes saved successfully!');
        }
    };

    const handleResetChanges = () => {
        setFormData({
            username: "My name",
            email: "myemail@example.com",
        });
        setEmailError("");
    };

    const toggle2FA = () => {
        setIs2FAEnabled(!is2FAEnabled);
        alert(is2FAEnabled ? "2FA Disabled" : "2FA Enabled");
    };

    const renderContent = () => {
        switch (activeTab) {
            case "profile":
                return (
                    <div className="account-profile">
                        <div className="account-avatar">
                            <img src={avatarImage} alt="User Avatar" className="avatar-image" />
                            <input type="file" accept="image/*" onChange={handleAvatarChange} className="avatar-input" />
                        </div>
                        <div className="account-details">
                            <p><strong>Username:</strong> {formData.username}</p>
                            <p><strong>Email:</strong> {formData.email} {emailError && <span className="error-text">{emailError}</span>}</p>
                            <p><strong>Registered on:</strong> January 1, 2023</p>
                            <p><strong>Last login:</strong> October 31, 2024</p>
                        </div>
                    </div>
                );
            case "security":
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
            case "settings":
                return (
                    <div className="account-settings">
                        <h3>Edit Profile</h3>
                        <input
                            type="text"
                            name="username"
                            value={formData.username}
                            onChange={handleChange}
                            placeholder="Username"
                        />
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="Email"
                        />
                        <button onClick={handleSaveChanges}>Save Changes</button>
                        <button onClick={handleResetChanges}>Reset Changes</button>
                        <button onClick={handleDeleteAccount}>Delete Account</button>
                    </div>
                );
            case "help":
                return (
                    <div className="account-help">
                        <h3>Help & Support</h3>
                        <p>If you need assistance, please contact our support team at <strong>support@example.com</strong>.</p>
                        <p>You can also visit our <a href="/faq">FAQ page</a> for more information.</p>
                    </div>
                );
            default:
                return <div>Select a tab to view details.</div>;
        }
    };

    const handleDeleteAccount = () => {
        const confirmed = window.confirm("Are you sure you want to delete your account?");
        if (confirmed) {
            alert("Account deleted");
        }
    };

    const handleLogout = () => {
        const confirmed = window.confirm("Are you sure you want to log out?");
        if (confirmed) {
            alert("Logged out successfully");
        }
    };

    return (
        <div className="modal-backdrop" onClick={onClose}>
            <div className="modal-box" onClick={(e) => e.stopPropagation()}>
                <button className="modal-close" onClick={onClose}>
                    &times;
                </button>
                <h2 className="modal-title">Account Information</h2>
                <div className="tabs">
                    <button
                        className={`tab ${activeTab === "profile" ? "active" : ""}`}
                        onClick={() => setActiveTab("profile")}
                    >
                        Profile
                    </button>
                    <button
                        className={`tab ${activeTab === "security" ? "active" : ""}`}
                        onClick={() => setActiveTab("security")}
                    >
                        Security
                    </button>
                    <button
                        className={`tab ${activeTab === "settings" ? "active" : ""}`}
                        onClick={() => setActiveTab("settings")}
                    >
                        Settings
                    </button>
                    <button
                        className={`tab ${activeTab === "help" ? "active" : ""}`}
                        onClick={() => setActiveTab("help")}
                    >
                        Help
                    </button>
                </div>
                <div className="tab-content">
                    {renderContent()}
                </div>
                <button className="modal-logout" onClick={handleLogout}>Logout</button>
            </div>
        </div>
    );
};

export default AccountModal;
