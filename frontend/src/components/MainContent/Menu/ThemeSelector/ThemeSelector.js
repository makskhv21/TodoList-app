import React from 'react';
import themes from '../utils/themes';

const ThemeSelector = ({ onThemeChange, onClose }) => {
  const handleThemeSelect = (themeName) => {
    onThemeChange(themeName);
    onClose();
  };

  return (
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
  );
};

export default ThemeSelector;
