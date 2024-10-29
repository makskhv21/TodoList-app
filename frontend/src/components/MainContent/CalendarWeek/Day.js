import React from 'react';
import EventList from './EventList';

const Day = ({ date, events, newEventText, onNewEventChange, onAddEvent, onEdit, onDelete, isEditing, onSave, editingText, onTextChange }) => (
    <div className="dayWeek">
        <h4>{date.toDateString()}</h4>
        <EventList
            events={events}
            onEdit={onEdit}
            onDelete={onDelete}
            isEditing={isEditing}
            onSave={onSave}
            editingText={editingText}
            onTextChange={onTextChange}
        />
        <div style={{ display: 'flex', alignItems: 'center' }}>
            <input
                type="text"
                value={newEventText}
                onChange={onNewEventChange}
                placeholder="New event"
                style={{ flex: 1, marginRight: '10px' }}
            />
            <button onClick={onAddEvent}>Add Task</button>
        </div>
    </div>
);

export default Day;