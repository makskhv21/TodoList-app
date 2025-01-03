import React from 'react';

const EventActions = ({ onToggleImportant, onDelete, important }) => (
  <div
    style={{
      display: 'flex',
      flexDirection: 'column',
      position: 'relative',
      top: '-10px',
    }}
  >
    <button
      style={{
        backgroundColor: 'transparent',
        border: 'none',
        color: 'blue',
        cursor: 'pointer',
        margin: '0',
        width: '10px',
        height: '10px',
      }}
      onClick={onToggleImportant}
    >
      {important ? '★' : '☆'}
    </button>
    <button
      onClick={onDelete}
      style={{
        backgroundColor: 'transparent',
        border: 'none',
        color: '#ff4d4d',
        cursor: 'pointer',
        fontSize: '18px',
        marginLeft: 'auto',
        width: '10px',
        height: '10px',
      }}
      aria-label="Delete"
    >
      ×
    </button>
  </div>
);

export default EventActions;
