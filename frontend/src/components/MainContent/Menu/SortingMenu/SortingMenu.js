import React from 'react';

const SortingMenu = ({ toggleSortingOption, sortOptions }) => {
  const sortingOptions = [
    { id: 'alphabetically', label: 'алфавітом', icon: '🔤' },
    { id: 'byLength', label: 'довжиною', icon: '📏' },
    { id: 'byDate', label: 'датою', icon: '⏰' },
    { id: 'byImportance', label: 'важливістю', icon: '🔔' },
  ];

  return (
    <div className="sorting-menu">
      <ul>
        {sortingOptions.map((option) => (
          <li key={option.id} onClick={() => toggleSortingOption(option.id)}>
            <span className="icon">{option.icon}</span>{' '}
            {sortOptions[option.id] ? 'Скасувати' : `За ${option.label}`}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SortingMenu;
