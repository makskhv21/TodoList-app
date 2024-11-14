import React, { useState } from 'react';
import './Menu.css'; 
import themes from './themes.js';

const Menu = ({ isOpen, onClose, onThemeChange, selectedProject, tasks, toggleSortingOption, sortOptions }) => {
    const [isSortingMenuOpen, setIsSortingMenuOpen] = useState(false);

    const handleThemeSelect = (themeName) => {
        onThemeChange(themeName); 
        onClose();
    };

    const handlePrint = () => {
        const printContent = Array.from(document.querySelectorAll('.task')).map(task => `
            <div class="task">
                <input type="checkbox" ${task.querySelector('input').checked ? 'checked' : ''} />
                <span>${task.querySelector('span').innerText}</span>
            </div>
        `).join('');
    
        const newWindow = window.open('', '', 'width=800,height=800');
        newWindow.document.write(`
            <html>
                <head>
                    <title>Друк завдань</title>
                    <style>
                        body {
                            font-family: Arial, sans-serif;
                            margin: 20px;
                            color: #333;
                        }
                        h1 {
                            text-align: center;
                            color: #4CAF50;
                        }
                        h2 {
                            text-align: center;
                        }
                        .task {
                            margin: 10px 0;
                            padding: 15px;
                            border: 1px solid #ccc;
                            border-radius: 8px;
                            background-color: #f9f9f9;
                            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
                        }
                        .task span {
                            display: inline-block;
                            margin-left: 10px;
                            font-size: 16px;
                        }
                        input[type='checkbox'] {
                            margin-right: 10px;
                            transform: scale(1.5);
                            cursor: pointer;
                        }
                    </style>
                </head>
                <body>
                    <h1>Список завдань</h1>
                    <h2>${selectedProject}</h2>
                    <div>
                        ${printContent}
                    </div>
                </body>
            </html>
        `);
        newWindow.document.close();
        newWindow.print();
        newWindow.close(); 
        onClose();
    };

    const handleEmailSend = () => {
        const emailBody = tasks.map(task => `${task.completed ? '[✓]' : '[ ]'} ${task.text}`).join('\n');
        const emailSubject = `Завдання для проекту: ${selectedProject}`;
        const mailtoLink = `mailto:?subject=${encodeURIComponent(emailSubject)}&body=${encodeURIComponent(emailBody)}`;
        
        window.open(mailtoLink);
        onClose();
    };

    const toggleSortingMenu = () => {
        setIsSortingMenuOpen(!isSortingMenuOpen);
    };

    return (
        <div className={`menu ${isOpen ? 'open' : ''}`}>
            <button onClick={onClose} className="close-button">✖</button>
            <ul className='optionMenu'>
                <li onClick={() => setIsSortingMenuOpen(!isSortingMenuOpen)} className="sort-button">Сортування</li>
                {isSortingMenuOpen && (
                    <div className="sorting-menu">
                        <ul>
                            {[
                                { id: 'alphabetically', label: 'алфавітом', icon: '🔤' },
                                { id: 'byLength', label: 'довжиною', icon: '📏' },
                                { id: 'byDate', label: 'датою', icon: '⏰' },
                                { id: 'byImportance', label: 'важливістю', icon: '🔔' },
                            ].map(option => (
                                <li key={option.id} onClick={() => toggleSortingOption(option.id)}>
                                    <span className="icon">{option.icon}</span>{' '}
                                    {sortOptions[option.id] ? 'Скасувати' : `За ${option.label}`}
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
                <li className='themaLi'>Тема:</li>
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
                <li onClick={handlePrint}>Друк списку</li>
                <li onClick={handleEmailSend}>Надіслати поштою</li>
            </ul>
        </div>
    );
};

export default Menu;
