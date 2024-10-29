import React from 'react';
import './Menu.css'; 

const Menu = ({ isOpen, onClose }) => {
    return (
        <div className={`menu ${isOpen ? 'open' : ''}`}>
            <button onClick={onClose} className="close-button">✖</button>
            <ul className='optionMenu'>
                <li onClick={onClose}>Сортування</li>
                <li onClick={onClose}>Тема</li>
                <li onClick={onClose}>Друк списку</li>
                <li onClick={onClose}>Надіслати поштою</li>
            </ul>
        </div>
    );
};

export default Menu;
