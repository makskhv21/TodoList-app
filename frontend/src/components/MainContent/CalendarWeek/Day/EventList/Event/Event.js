import React from 'react';

import EventCheckbox from './EventCheckbox/EventCheckbox';
import EventText from './EventText/EventText';
import EventActions from './EventActions/EventActions';

const Event = ({
  event,
  onEdit,
  onDelete,
  isEditing,
  onSave,
  editingText,
  onTextChange,
  onToggleCompletion,
  onToggleImportant,
}) => {
  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      onSave();
    }
  };

  return (
    <li
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: '1px',
        height: 'auto',
        wordWrap: 'break-word',
        overflowWrap: 'break-word',
        flexWrap: 'wrap',
        width: '90%',
      }}
    >
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          flex: 1,
          width: 'calc(100% - 100px)',
          wordWrap: 'break-word',
          overflowWrap: 'break-word',
        }}
      >
        <EventCheckbox
          completed={event.completed}
          onToggleCompletion={onToggleCompletion}
        />
        <EventText
          isEditing={isEditing}
          text={event.text}
          editingText={editingText}
          onTextChange={onTextChange}
          onEdit={onEdit}
          onKeyDown={handleKeyDown}
          completed={event.completed}
        />
      </div>
      <EventActions
        onToggleImportant={() => onToggleImportant(event.id)}
        onDelete={onDelete}
        important={event.important}
      />
    </li>
  );
};

export default Event;
