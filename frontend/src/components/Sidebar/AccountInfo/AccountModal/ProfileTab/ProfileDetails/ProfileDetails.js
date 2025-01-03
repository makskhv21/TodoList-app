import React from 'react';

const ProfileDetails = ({
  formData,
  isEditing,
  handleInputChange,
  handleUsernameChange,
  activeTasksCount,
  avatarImage,
}) => (
  <div className="profile-details">
    <div className="profile-header">
      <div className="avatar-container">
        <img src={avatarImage} alt="User Avatar" className="avatar-image" />
      </div>

      <div className="profile-header-user-email">
        <div className="profile-header-item">
          <strong>Username:</strong>
          {isEditing ? (
            <input
              type="text"
              value={formData.username}
              onChange={handleUsernameChange}
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

    <div className="container-detail">
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
            style={{ width: '100px' }}
          />
        ) : (
          <p>{formData.dateOfBirth || 'Not Provided'}</p>
        )}
      </div>
    </div>

    <div className="goal-container">
      <label htmlFor="monthly-goal" className="goal-container-h1">
        <strong>Monthly Goal:</strong>
      </label>
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
      <strong>Active tasks today:</strong> {activeTasksCount}
    </div>
  </div>
);

export default ProfileDetails;
