import React, { useState, useEffect } from 'react';
import AvatarSection from './AvatarSection/AvatarSection';
import ProfileDetails from './ProfileDetails/ProfileDetails';
import './ProfileTab.css';

const ProfileTab = ({
  avatarImage,
  setAvatarImage,
  formData,
  setFormData,
  activeTasksCount,
  setUsername,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);

  const handleUsernameChange = (e) => {
    const newUsername = e.target.value;
    setFormData({
      ...formData,
      username: newUsername,
    });
    setUsername(newUsername);
  };

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      setIsDarkMode(savedTheme === 'dark');
      document.body.classList.toggle('dark-mode', savedTheme === 'dark');
    }
  }, []);

  const toggleTheme = () => {
    setIsDarkMode((prevMode) => {
      const newMode = !prevMode;
      const theme = newMode ? 'dark' : 'light';
      localStorage.setItem('theme', theme);
      document.body.classList.toggle('dark-mode', newMode);
      return newMode;
    });
  };

  const toggleEditing = () => setIsEditing((prevState) => !prevState);

  const handleInputChange = (e, field) => {
    setFormData({
      ...formData,
      [field]: e.target.value,
    });
  };

  return (
    <div className="profile-container">
      <AvatarSection
        setAvatarImage={setAvatarImage}
        isDarkMode={isDarkMode}
        toggleTheme={toggleTheme}
        toggleEditing={toggleEditing}
      />
      <ProfileDetails
        avatarImage={avatarImage}
        formData={formData}
        isEditing={isEditing}
        handleInputChange={handleInputChange}
        handleUsernameChange={handleUsernameChange}
        activeTasksCount={activeTasksCount}
      />
    </div>
  );
};

export default ProfileTab;
