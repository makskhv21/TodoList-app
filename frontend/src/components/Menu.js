import React from 'react';
import './Menu.css'; 
import themes from './themes.js';

const Menu = ({ isOpen, onClose, onThemeChange }) => {

    const handleThemeSelect = (themeName) => {
        onThemeChange(themeName); 
        onClose();
    };

    return (
        <div className={`menu ${isOpen ? 'open' : ''}`}>
            <button onClick={onClose} className="close-button">✖</button>
            <ul className='optionMenu'>
                <li onClick={onClose}>Сортування</li>
                <li>Тема:</li>
                <div className="theme-selector">
                    {Object.keys(themes).map((themeName) => (
                        <div 
                            key={themeName}
                            className="theme-square"
                            style={{ background: themes[themeName].background }}
                            onClick={() => handleThemeSelect(themeName)}
                        />
                    ))}
                </div>
                <li onClick={onClose}>Друк списку</li>
                <li onClick={onClose}>Надіслати поштою</li>
            </ul>
        </div>
    );
};

export default Menu;