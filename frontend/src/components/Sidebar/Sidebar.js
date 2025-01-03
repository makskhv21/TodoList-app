import React, { useState, useEffect } from 'react';

import SidebarHeader from './componentSidebar/SidebarHeader';
import SidebarProjects from './componentSidebar/SidebarProjects';
import QuoteModal from './QuoteModal/QuoteModal';
import { useDailyQuote } from './hooks/useDailyQuote';
import { useTheme } from './hooks/useTheme';

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
  const { quote, loadDailyQuote } = useDailyQuote();
  const { isDarkTheme, toggleTheme } = useTheme();
  const [isQuoteModalOpen, setIsQuoteModalOpen] = useState(false);

  const generateQuote = () => setIsQuoteModalOpen(true);
  const closeModal = () => setIsQuoteModalOpen(false);

  useEffect(() => {
    loadDailyQuote();
  }, [loadDailyQuote]);

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
      <SidebarHeader
        onLogout={onLogout}
        activeTasksCount={activeTasksCount}
        onGenerateQuote={generateQuote}
        isDarkTheme={isDarkTheme}
        onToggleTheme={toggleTheme}
      />
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
      <SidebarProjects
        projects={projects}
        onSelectProject={setSelectedProject}
        onEditProject={editProject}
        onDeleteProject={deleteProject}
        newProject={newProject}
        setNewProject={setNewProject}
        onAddProject={handleAddProject}
        onKeyDown={handleKeyDown}
      />
      <QuoteModal
        quote={quote}
        onClose={closeModal}
        isOpen={isQuoteModalOpen}
      />
    </div>
  );
}

export default Sidebar;
