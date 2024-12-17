import React, { useState } from 'react';
import './AccountInfo';
import avatar from './img/avatar.png';
import AccountModal from './AccountModal/AccountModal';

const AccountInfo = ({ onLogout, activeTasksCount }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [username, setUsername] = useState('Username');

  return (
    <div
      className="account-info-container"
      onClick={() => setIsModalOpen(true)}
    >
      <img src={avatar} alt="avatar" className="account-photo" />
      <div className="account-description">
        <h2 className="account-name">{username}</h2>
        <p className="account-email">myemail@example.com</p>
      </div>
      <AccountModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onLogout={onLogout}
        activeTasksCount={activeTasksCount}
        setUsername={setUsername}
      />
    </div>
  );
};

export default AccountInfo;
