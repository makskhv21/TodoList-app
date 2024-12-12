import React from 'react';
import Event from './Event/Event';

const EventList = ({
  events,
  onEdit,
  onDelete,
  isEditing,
  onSave,
  editingText,
  onTextChange,
  onToggleCompletion,
  onToggleImportant,
}) => (
  <ul>
    {events.map((event) => (
      <Event
        key={event.id}
        event={event}
        onEdit={() => onEdit(event.id)}
        onDelete={() => onDelete(event.id)}
        onToggleCompletion={() => onToggleCompletion(event.id)}
        isEditing={isEditing === event.id}
        onSave={onSave}
        editingText={editingText}
        onTextChange={onTextChange}
        onToggleImportant={onToggleImportant}
      />
    ))}
  </ul>
);

export default EventList;
