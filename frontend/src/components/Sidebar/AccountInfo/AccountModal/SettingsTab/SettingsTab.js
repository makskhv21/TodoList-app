import React from 'react';
import './SettingsTab.css';

const SettingsTab = ({ formData, setFormData }) => {
  const handleAccountDeletion = () => {
    if (
      window.confirm(
        'Are you sure you want to delete your account? This action is irreversible.'
      )
    ) {
      alert('Account deleted!');
    }
  };

  return (
    <div className="account-settings">
      <h3>Edit Profile</h3>

      <div className="language-settings">
        <h4>Language Settings</h4>
        <select
          value={formData.language}
          onChange={(e) =>
            setFormData({ ...formData, language: e.target.value })
          }
          className="select-language"
        >
          <option value="en">English</option>
          <option value="uk">Українська</option>
          <option value="es">Spanish</option>
          <option value="fr">French</option>
        </select>
      </div>

      <div className="notification-sounds">
        <h4>Notification Preferences</h4>
        <div>
          <label>
            <input
              type="checkbox"
              checked={formData.notificationSounds}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  notificationSounds: e.target.checked,
                })
              }
              className="checkbox"
            />
            Enable Sound Notifications
          </label>
        </div>
        <div>
          <label>
            <input
              type="checkbox"
              checked={formData.pushNotifications}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  pushNotifications: e.target.checked,
                })
              }
              className="checkbox"
            />
            Enable Push Notifications
          </label>
        </div>
      </div>

      <div className="account-deletion">
        <h4>Account Deletion</h4>
        <p>
          If you want to delete your account, please click the button below.
          This action is irreversible.
        </p>
        <button onClick={handleAccountDeletion} className="delete-btn">
          Delete Account
        </button>
      </div>
    </div>
  );
};

export default SettingsTab;
