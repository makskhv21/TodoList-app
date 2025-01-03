import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLightbulb } from '@fortawesome/free-solid-svg-icons';
import AccountInfo from '../AccountInfo/AccountInfo';

const SidebarHeader = ({
  onLogout,
  activeTasksCount,
  onGenerateQuote,
  isDarkTheme,
  onToggleTheme,
}) => (
  <div className="container-header">
    <AccountInfo onLogout={onLogout} activeTasksCount={activeTasksCount} />
    <div className="btn-container">
      <button className="btn-quote" onClick={onGenerateQuote}>
        <FontAwesomeIcon
          icon={faLightbulb}
          style={{ width: '20px', color: 'yellow' }}
        />
      </button>

      <button className="btn-theme" onClick={onToggleTheme}>
        {isDarkTheme ? '🌞' : '🌜'}
      </button>
    </div>
  </div>
);

export default SidebarHeader;
