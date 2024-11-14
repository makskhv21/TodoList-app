import React from 'react';

const SettingsTab = ({ formData, setFormData, emailError, setEmailError }) => {
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });

        if (name === "email") {
            const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            setEmailError(emailPattern.test(value) ? "" : "Invalid email format");
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
        </div>
    );
};

export default SettingsTab;
