import React, { useState } from 'react';

import './ProfileTab.css'

import iconSetting from '../img/iconSetting.png';
import iconRenameCamera from '../img/iconRenameCamera.png';
import dayIcon from '../img/dayIcon.png';
import nightIcon from '../img/nightIcon.png';


const ProfileTab = ({ avatarImage, setAvatarImage, formData, setFormData }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [isDarkMode, setIsDarkMode] = useState(false);

    const toggleTheme = () => {
        setIsDarkMode(prevMode => !prevMode);
    };

    const handleAvatarChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => setAvatarImage(reader.result);
            reader.readAsDataURL(file);
        }
    };

    const handleInputChange = (e, field) => {
        setFormData({
            ...formData,
            [field]: e.target.value,
        });
    };

    const toggleEditing = () => {
        setIsEditing((prevState) => !prevState);
    };

    return (
        <div className="profile-container">
            <div className="profile-avatar-section">
                <div className="avatar-actions">
                    <button
                        className="avatar-edit-btn"
                        onClick={() => document.querySelector('#avatar-input').click()}
                    >
                        <img src={iconRenameCamera} alt='Change Avatar' />
                    </button>
                    <input
                        id="avatar-input"
                        type="file"
                        accept="image/*"
                        onChange={handleAvatarChange}
                        className="avatar-input"
                        style={{ display: 'none' }}
                    />
                    <button
                        className="avatar-edit-btn"
                        onClick={toggleEditing}
                    >
                        <img src={iconSetting} alt='Edit Profile' />
                    </button>
                    <div className="theme-toggle">
                        <label htmlFor="theme-switch" className="switch">
                            <input
                                type="checkbox"
                                id="theme-switch"
                                checked={isDarkMode}
                                onChange={toggleTheme}
                            />
                            <span className="slider">
                                <img
                                    src={isDarkMode ? nightIcon : dayIcon}
                                    alt={isDarkMode ? 'Night Mode' : 'Day Mode'}
                                    className="slider-icon"
                                />
                            </span>
                        </label>
                    </div>
                </div>
            </div>

            <div className="profile-details">
                <div className="profile-header">
                    <div className="avatar-container">
                        <img src={avatarImage} alt="User Avatar" className="avatar-image" />
                    </div>

                    <div className='profile-header-user-email'>
                        <div className="profile-header-item">
                            <strong>Username:</strong>
                            {isEditing ? (
                                <input
                                    type="text"
                                    value={formData.username}
                                    onChange={(e) => handleInputChange(e, 'username')}
                                    className="input-edit"
                                />
                            ) : (
                                <p>{formData.username}</p>
                            )}
                        </div>

                        <div className="profile-header-item">
                            <strong>Email:</strong>
                            <p>{formData.email}</p>
                        </div>
                    </div>
                </div>

                <div className='container-detail'>
                    <div className="profile-detail">
                        <strong>Phone Number:</strong>
                        {isEditing ? (
                            <input
                                type="text"
                                value={formData.phone}
                                onChange={(e) => handleInputChange(e, 'phone')}
                                className="input-edit"
                            />
                        ) : (
                            <p>{formData.phone || 'Not Provided'}</p>
                        )}
                    </div>

                    <div className="profile-detail">
                        <strong>Date of Birth:</strong>
                        {isEditing ? (
                            <input
                                type="date"
                                value={formData.dateOfBirth}
                                onChange={(e) => handleInputChange(e, 'dateOfBirth')}
                                className="input-edit"
                                style={{ width: '100px'}}
                            />
                        ) : (
                            <p>{formData.dateOfBirth || 'Not Provided'}</p>
                        )}
                    </div>
                </div>

                <div className="goal-container">
                    <label htmlFor="monthly-goal" className='goal-container-h1'><strong>Monthly Goal:</strong></label>
                    {isEditing ? (
                        <textarea
                            id="monthly-goal"
                            value={formData.monthlyGoal || ''}
                            onChange={(e) => handleInputChange(e, 'monthlyGoal')}
                            placeholder="Enter your goal for this month"
                            rows="4"
                            className="goal-textarea"
                        />
                    ) : (
                        <p>{formData.monthlyGoal || 'Not Provided'}</p>
                    )}
                </div>

                <div className="profile-detail-active">
                    <strong>Active tasks today:</strong> 20
                </div>
            </div>
        </div>
    );
};

export default ProfileTab;
