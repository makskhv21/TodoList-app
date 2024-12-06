import React, { useState } from 'react';

import avatar from "../img/avatar.png";


import ProfileTab from './ProfileTab/ProfileTab';
import SecurityTab from './SecurityTab/SecurityTab';
import SettingsTab from './SettingsTab/SettingsTab';
import HelpTab from './HelpTab/HelpTab';

const AccountModal = ({ isOpen, onClose, onLogout,activeTasksCount }) => {
    if (!isOpen) return null;

    const [activeTab, setActiveTab] = useState("profile");
    const [avatarImage, setAvatarImage] = useState(avatar);
    const [formData, setFormData] = useState({
        username: "My name",
        email: "myemail@example.com",
    });
    const [emailError, setEmailError] = useState("");
    const [is2FAEnabled, setIs2FAEnabled] = useState(false);

    const handleLogout = () => {
        const confirmed = window.confirm("Are you sure you want to log out?");
        if (confirmed) {
            onLogout();
            onClose(); 
        }
    };

    const renderContent = () => {
        switch (activeTab) {
            case "profile":
                return <ProfileTab avatarImage={avatarImage} setAvatarImage={setAvatarImage} formData={formData} setFormData={setFormData} activeTasksCount={activeTasksCount}/>;
            case "security":
                return <SecurityTab is2FAEnabled={is2FAEnabled} setIs2FAEnabled={setIs2FAEnabled} />;
            case "settings":
                return (
                    <SettingsTab
                        formData={formData}
                        setFormData={setFormData}
                        emailError={emailError}
                        setEmailError={setEmailError}
                    />
                );
            case "help":
                return <HelpTab />;
            default:
                return <div>Select a tab to view details.</div>;
        }
    };

    return (
        <div className="modal-backdrop" onClick={onClose}>
            <div className="modal-box" onClick={(e) => e.stopPropagation()}>
                <button className="modal-close" onClick={onClose}>&times;</button>
                <h2 className="modal-title">Account Information</h2>
                <div className="tabs">
                    {["profile", "security", "settings", "help"].map((tab) => (
                        <button
                            key={tab}
                            className={`tab ${activeTab === tab ? "active" : ""}`}
                            onClick={() => setActiveTab(tab)}
                        >
                            {tab.charAt(0).toUpperCase() + tab.slice(1)}
                        </button>
                    ))}
                </div>
                <div className="tab-content">{renderContent()}</div>
                <button className="modal-logout" onClick={handleLogout}>Logout</button>
            </div>
        </div>
    );
};

export default AccountModal;