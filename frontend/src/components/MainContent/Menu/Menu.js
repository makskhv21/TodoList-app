import React from 'react';
import './Menu.css';
import { useSortingMenu } from './hooks/useSortingMenu';
import {
  useHandleThemeSelect,
  useHandlePrint,
  useHandleEmailSend,
} from './hooks/useMenuActions';
import SortingMenu from './SortingMenu/SortingMenu';
import ThemeSelector from './ThemeSelector/ThemeSelector';

const Menu = ({
  isOpen,
  onClose,
  onThemeChange,
  selectedProject,
  tasks,
  toggleSortingOption,
  sortOptions,
}) => {
  const [isSortingMenuOpen, toggleSortingMenu] = useSortingMenu();
  const handleThemeSelect = useHandleThemeSelect(onThemeChange, onClose);
  const handlePrint = useHandlePrint(selectedProject, tasks, onClose);
  const handleEmailSend = useHandleEmailSend(tasks, selectedProject, onClose);

  return (
    <div className={`menu ${isOpen ? 'open' : ''}`}>
      <button onClick={onClose} className="close-button">
        ✖
      </button>
      <ul className="optionMenu">
        <li onClick={toggleSortingMenu} className="sort-button">
          Сортування
        </li>
        {isSortingMenuOpen && (
          <SortingMenu
            toggleSortingOption={toggleSortingOption}
            sortOptions={sortOptions}
          />
        )}
        <li className="themaLi">Тема:</li>
        <ThemeSelector onThemeChange={onThemeChange} onClose={onClose} />
        <li onClick={handlePrint}>Друк списку</li>
        <li onClick={handleEmailSend}>Надіслати поштою</li>
      </ul>
    </div>
  );
};

export default Menu;
