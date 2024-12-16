import React, { useState, useEffect } from 'react';
import './Sidebar';

import ProjectItem from './ProjectItem/ProjectItem';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLightbulb, faPlus } from '@fortawesome/free-solid-svg-icons';
import QuoteModal from './QuoteModal/QuoteModal';
import AccountInfo from './AccountInfo/AccountInfo';

function Sidebar({
  projects,
  setSelectedProject,
  addProject,
  editProject,
  deleteProject,
  user,
  onLogout,
  activeTasksCount,
}) {
  const [newProject, setNewProject] = useState('');
  const [isDarkTheme, setIsDarkTheme] = useState(false);
  const [quote, setQuote] = useState(null);
  const [isQuoteModalOpen, setIsQuoteModalOpen] = useState(false);

  const fetchRandomQuote = async () => {
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
  };

  const loadDailyQuote = async () => {
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
  };

  useEffect(() => {
    loadDailyQuote();
  }, []);

  const generateQuote = () => setIsQuoteModalOpen(true);
  const closeModal = () => setIsQuoteModalOpen(false);

  const toggleTheme = () => {
    setIsDarkTheme((prev) => !prev);
    document.documentElement.setAttribute(
      'data-theme',
      isDarkTheme ? 'light' : 'dark'
    );
  };

  const handleAddProject = () => {
    addProject(newProject);
    setNewProject('');
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleAddProject();
    }
  };

  return (
    <div className="sidebar">
      <div className="container-header">
        <AccountInfo
          user={user}
          onLogout={onLogout}
          activeTasksCount={activeTasksCount}
        />
        <div className="btn-container">
          <button className={`btn-quote`} onClick={generateQuote}>
            <FontAwesomeIcon
              icon={faLightbulb}
              style={{ width: '20px', color: 'yellow' }}
            />
          </button>

          <button className={`btn-theme`} onClick={toggleTheme}>
            {isDarkTheme ? '🌞' : '🌜'}
          </button>
        </div>
      </div>
      <hr />
      <div
        className="sidebar-item large"
        onClick={() => setSelectedProject('Today')}
      >
        ⏳ Today
      </div>
      <div
        className="sidebar-item large"
        onClick={() => setSelectedProject('Important')}
      >
        ⭐ Important
      </div>
      <div
        className="sidebar-item large"
        onClick={() => setSelectedProject('Next 7 days')}
      >
        📆 Next 7 days
      </div>
      <div
        className="sidebar-item large"
        onClick={() => setSelectedProject('Calendar')}
      >
        📖 Calendar
      </div>
      <div
        className="sidebar-item large"
        onClick={() => setSelectedProject('Missed goals')}
      >
        📝 Missed goals
      </div>
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
