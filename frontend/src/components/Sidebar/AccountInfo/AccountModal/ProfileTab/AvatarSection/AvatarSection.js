import React from 'react';
import iconBot from '../../img/botTodoList.png';
import iconSetting from '../../img/iconSetting.png';
import iconRenameCamera from '../../img/iconRenameCamera.png';
import dayIcon from '../../img/dayIcon.png';
import nightIcon from '../../img/nightIcon.png';

const AvatarSection = ({
  setAvatarImage,
  isDarkMode,
  toggleTheme,
  toggleEditing,
}) => {
  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setAvatarImage(reader.result);
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="profile-avatar-section">
      <div className="avatar-actions">
        <a
          href="#"
          target="_blank"
          rel="noopener noreferrer"
          className="profile-botTodolist"
        >
          <img src={iconBot} alt="Telegram Bot" />
        </a>
        <button
          className="avatar-edit-btn"
          onClick={() => document.querySelector('#avatar-input').click()}
        >
          <img src={iconRenameCamera} alt="Change Avatar" />
        </button>
        <input
          id="avatar-input"
          type="file"
          accept="image/*"
          onChange={handleAvatarChange}
          className="avatar-input"
          style={{ display: 'none' }}
        />
        <button className="avatar-edit-btn" onClick={toggleEditing}>
          <img src={iconSetting} alt="Edit Profile" />
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
  );
};

export default AvatarSection;
