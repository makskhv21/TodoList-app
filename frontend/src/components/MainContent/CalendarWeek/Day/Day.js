import React from 'react';
import EventList from './EventList/EventList';
import './Day';

function Day({
  date,
  events,
  newEventText,
  onNewEventChange,
  onAddEvent,
  onEdit,
  onDelete,
  isEditing,
  onSave,
  editingText,
  onTextChange,
  onToggleCompletion,
  onToggleImportant,
  onDeleteAllTasks,
}) {
  const sortedEvents = events.sort((a, b) => {
    if (a.completed === b.completed) return 0;
    return a.completed ? 1 : -1;
  });

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      onAddEvent();
    }
  };

  return (
    <div className="dayWeek">
      <h4>
        {date.toDateString()} <button onClick={onDeleteAllTasks}>🗑️</button>
      </h4>
      <EventList
        events={sortedEvents}
        onEdit={onEdit}
        onDelete={onDelete}
        onToggleCompletion={onToggleCompletion}
        isEditing={isEditing}
        onSave={onSave}
        editingText={editingText}
        onTextChange={onTextChange}
        onToggleImportant={onToggleImportant}
      />
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <input
          type="text"
          value={newEventText}
          onChange={onNewEventChange}
          placeholder="New event"
          style={{ flex: 1, marginRight: '10px' }}
          onKeyDown={handleKeyDown}
        />
        <button
          style={{ position: 'relative', bottom: '5px' }}
          onClick={onAddEvent}
        >
          Add Task
        </button>
      </div>
    </div>
  );
}

export default Day;
