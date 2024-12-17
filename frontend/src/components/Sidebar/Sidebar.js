import React, { useState, useEffect, useCallback } from 'react';
import './Sidebar';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLightbulb, faPlus } from '@fortawesome/free-solid-svg-icons';

import ProjectItem from './ProjectItem/ProjectItem';
import QuoteModal from './QuoteModal/QuoteModal';
import AccountInfo from './AccountInfo/AccountInfo';

function Sidebar({
  projects,
  setSelectedProject,
  addProject,
  editProject,
  deleteProject,
  onLogout,
  activeTasksCount,
}) {
  const [newProject, setNewProject] = useState('');
  const [isDarkTheme, setIsDarkTheme] = useState(false);
  const [quote, setQuote] = useState(null);
  const [isQuoteModalOpen, setIsQuoteModalOpen] = useState(false);

  const fetchRandomQuote = useCallback(async () => {
    try {
      const response = await fetch('https://api.api-ninjas.com/v1/quotes', {
        headers: {
          'X-Api-Key': 'Xs82lP7RTVW4bbKb05W3BQ==6MBhoQrsq40stCdg',
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      return data[0].quote;
    } catch (error) {
      return 'Не вдалося завантажити цитату.';
    }
  }, []);

  const loadDailyQuote = useCallback(async () => {
    const savedQuote = localStorage.getItem('dailyQuote');
    const savedDate = localStorage.getItem('quoteDate');
    const today = new Date().toDateString();

    if (savedQuote && savedDate === today) {
      setQuote(savedQuote);
    } else {
      const randomQuote = await fetchRandomQuote();
      setQuote(randomQuote);
      localStorage.setItem('dailyQuote', randomQuote);
      localStorage.setItem('quoteDate', today);
    }
  }, [fetchRandomQuote]);

  useEffect(() => {
    loadDailyQuote();
  }, [loadDailyQuote]);

  const generateQuote = () => setIsQuoteModalOpen(true);
  const closeModal = () => setIsQuoteModalOpen(false);

  const toggleTheme = () => {
    setIsDarkTheme((prev) => !prev);
  };

  useEffect(() => {
    document.documentElement.setAttribute(
      'data-theme',
      isDarkTheme ? 'dark' : 'light'
    );
  }, [isDarkTheme]);

  const handleAddProject = () => {
    if (newProject.trim()) {
      addProject(newProject);
      setNewProject('');
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleAddProject();
    }
  };

  const sidebarItems = [
    { label: 'Today', icon: '⏳' },
    { label: 'Important', icon: '⭐' },
    { label: 'Next 7 days', icon: '📆' },
    { label: 'Calendar', icon: '📖' },
    { label: 'Missed goals', icon: '📝' },
  ];

  return (
    <div className="sidebar">
      <div className="container-header">
        <AccountInfo onLogout={onLogout} activeTasksCount={activeTasksCount} />
        <div className="btn-container">
          <button className="btn-quote" onClick={generateQuote}>
            <FontAwesomeIcon
              icon={faLightbulb}
              style={{ width: '20px', color: 'yellow' }}
            />
          </button>

          <button className="btn-theme" onClick={toggleTheme}>
            {isDarkTheme ? '🌞' : '🌜'}
          </button>
        </div>
      </div>
      <hr />
      {sidebarItems.map(({ label, icon }, index) => (
        <div
          key={index}
          className="sidebar-item large"
          onClick={() => setSelectedProject(label)}
        >
          {icon} {label}
        </div>
      ))}
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
            <FontAwesomeIcon icon={faPlus} />
          </button>
        </div>
      </div>
      <QuoteModal
        quote={quote}
        onClose={closeModal}
        isOpen={isQuoteModalOpen}
      />
    </div>
  );
}

export default Sidebar;
