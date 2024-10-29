import React from 'react';
import Event from './Event';

const EventList = ({ events, onEdit, onDelete, isEditing, onSave, editingText, onTextChange }) => (
    <ul>
        {events.map(event => (
            <Event
                key={event.id}
                event={event}
                onEdit={() => onEdit(event.id)}
                onDelete={() => onDelete(event.id)}
                isEditing={isEditing === event.id}
                onSave={onSave}
                editingText={editingText}
                onTextChange={onTextChange}
            />
        ))}
    </ul>
);

export default EventList;