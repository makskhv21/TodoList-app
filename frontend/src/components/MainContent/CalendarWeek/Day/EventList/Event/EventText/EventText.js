import React from 'react';

const EventText = ({
  isEditing,
  text,
  editingText,
  onTextChange,
  onEdit,
  onKeyDown,
  completed,
}) => {
  return isEditing ? (
    <input
      type="text"
      value={editingText}
      onChange={onTextChange}
      onKeyDown={onKeyDown}
      autoFocus
      style={{
        flex: 1,
        padding: '5px',
        border: '1px solid #ccc',
        borderRadius: '4px',
      }}
    />
  ) : (
    <span
      onDoubleClick={onEdit}
      style={{
        flex: 1,
        cursor: 'pointer',
        userSelect: 'none',
        textDecoration: completed ? 'line-through' : 'none',
        wordWrap: 'break-word',
        overflowWrap: 'break-word',
        display: 'inline-block',
        width: '80%',
      }}
    >
      {text}
    </span>
  );
};

export default EventText;
