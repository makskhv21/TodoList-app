import React from 'react';
import Menu from '../Menu/Menu';

const Header = ({
  selectedProject,
  menuOpen,
  setMenuOpen,
  handleThemeChange,
  sortedTasks,
  toggleSortingOption,
  sortOptions,
}) => (
  <div className="header">
    <h2 className="header-title">{selectedProject}</h2>
    {selectedProject !== 'Calendar' && selectedProject !== 'Next 7 days' && (
      <button onClick={() => setMenuOpen(!menuOpen)} className="menu-button">
        ...
      </button>
    )}
    <Menu
      selectedProject={selectedProject}
      isOpen={menuOpen}
      onClose={() => setMenuOpen(false)}
      onThemeChange={handleThemeChange}
      tasks={sortedTasks}
      toggleSortingOption={toggleSortingOption}
      sortOptions={sortOptions}
    />
  </div>
);

export default Header;
