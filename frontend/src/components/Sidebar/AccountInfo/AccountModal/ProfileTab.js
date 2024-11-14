import React from 'react';

const ProfileTab = ({ avatarImage, setAvatarImage, formData }) => {
    const handleAvatarChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => setAvatarImage(reader.result);
            reader.readAsDataURL(file);
        }
    };

    return (
        <div className="account-profile">
            <div className="account-avatar">
                <img src={avatarImage} alt="User Avatar" className="avatar-image" />
                <input type="file" accept="image/*" onChange={handleAvatarChange} className="avatar-input" />
            </div>
            <div className="account-details">
                <p><strong>Username:</strong> {formData.username}</p>
                <p><strong>Email:</strong> {formData.email}</p>
                <p><strong>Registered on:</strong> January 1, 2023</p>
                <p><strong>Last login:</strong> October 31, 2024</p>
            </div>
        </div>
    );
};

export default ProfileTab;