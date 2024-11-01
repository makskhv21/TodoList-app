import React from 'react';

const AccountModal = ({ isOpen, onClose }) => {
    if (!isOpen) return null;

    return (
        <div className="modal-backdrop" onClick={onClose}>
            <div className="modal-box" onClick={(e) => e.stopPropagation()}>
                <button className="button-close" onClick={onClose}>
                    &times;
                </button>
                <h2 className="dialog-title">Account Information</h2>
                <p className="dialog-description">Here you can add more information about your account.</p>
            </div>
        </div>
    );
};

export default AccountModal;
