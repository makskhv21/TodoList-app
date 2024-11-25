import React, { useState, useEffect } from 'react';
import "./Sidebar"

import ProjectItem from './ProjectItem/ProjectItem';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLightbulb, faPlus } from '@fortawesome/free-solid-svg-icons';
import QuoteModal from './QuoteModal/QuoteModal';
import AccountInfo from './AccountInfo/AccountInfo';

const quotes = [
    "Цитата 1: Секрет успіху – це вміння приймати невдачі.",
    "Цитата 2: Ваша робота заповнить велику частину вашого життя.",
    "Цитата 3: Успіх – це не ключ до щастя. Щастя – це ключ до успіху.",
    "Цитата 4: Не бійся зробити перший крок. Не має значення, наскільки малим він буде.",
    "Цитата 5: Ваша єдина межа – це ви самі.",
];

function Sidebar({ projects, setSelectedProject, addProject, editProject, deleteProject, user, onLogout, activeTasksCount }) {
    const [newProject, setNewProject] = useState('');
    const [isDarkTheme, setIsDarkTheme] = useState(false);
    const [quote, setQuote] = useState(null);
    const [isQuoteModalOpen, setIsQuoteModalOpen] = useState(false);

    useEffect(() => {
        const today = new Date();
        const dayOfYear = today.getDate() % quotes.length;
        setQuote(quotes[dayOfYear]);
    }, []);

    const handleAddProject = () => {
        addProject(newProject);
        setNewProject('');
    };

    const toggleTheme = () => {
        setIsDarkTheme(prev => !prev);
        document.documentElement.setAttribute('data-theme', isDarkTheme ? 'light' : 'dark');
    };

    const generateQuote = () => {
        setIsQuoteModalOpen(true);
    };

    const closeModal = () => {
        setIsQuoteModalOpen(false); 
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            handleAddProject();
        }
    };

    return (
        <div className="sidebar">
            <div className='container-header'>            
                <AccountInfo user={user} onLogout={onLogout} activeTasksCount={activeTasksCount} />
                <div className='btn-container'>
                    <button 
                        className={`btn-quote`} 
                        onClick={generateQuote}>
                        <FontAwesomeIcon icon={faLightbulb} style={{ width: '20px', color: 'yellow' }} />
                    </button>
                    <button 
                        className={`btn-theme`} 
                        onClick={toggleTheme}>
                        {isDarkTheme ? '🌞' : '🌜'}
                    </button>
                </div>
            </div>
            <hr />
            <div className="sidebar-item large" onClick={() => setSelectedProject('Today')}>⏳ Today</div>
            <div className="sidebar-item large" onClick={() => setSelectedProject('Important')}>⭐ Important</div>
            <div className="sidebar-item large" onClick={() => setSelectedProject('Next 7 days')}>📆 Next 7 days</div>
            <div className="sidebar-item large" onClick={() => setSelectedProject('Calendar')}>📖 Calendar</div>
            <div className="sidebar-item large" onClick={() => setSelectedProject('Tasks')}>📝 Missed goals</div>
            <hr />
            <div className="projects">
                {projects.map((project, index) => (
                    <ProjectItem
                        key={index}
                        project={project}
                        onSelect={setSelectedProject}
                        onEdit={editProject}
                        onDelete={deleteProject}
                    />
                ))}
                <div className="sidebar-item newProject">
                    <input
                        type="text"
                        value={newProject}
                        onChange={(e) => setNewProject(e.target.value)}
                        placeholder="New list"
                        onKeyDown={handleKeyDown}
                    />
                    <button onClick={handleAddProject}>
                        <FontAwesomeIcon icon={faPlus}  />
                    </button>
                </div>
            </div>
            <QuoteModal quote={quote} onClose={closeModal} isOpen={isQuoteModalOpen} />
        </div>
    );
}

export default Sidebar;