import React, { useState } from 'react';

import "./AccountInfo"
import avatar from "./img/avatar.png";
import AccountModal from './AccountModal/AccountModal';

const AccountInfo = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleOpenModal = () => {
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    return (
        <div className="account-info-container" onClick={handleOpenModal}>
            <img src={avatar} alt='avatar' className="account-photo" />
            <div className='account-description'>
                <h2 className="account-name">Username</h2>
                <p className="account-email">myemail@example.com</p>
            </div>
            <AccountModal isOpen={isModalOpen} onClose={handleCloseModal} />
        </div>
    );
};

export default AccountInfo;
