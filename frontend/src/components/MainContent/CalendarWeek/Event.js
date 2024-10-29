import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faSave, faTrash } from '@fortawesome/free-solid-svg-icons';

const Event = ({ event, onEdit, onDelete, isEditing, onSave, editingText, onTextChange }) => (
    <li style={{ textDecoration: event.completed ? 'line-through' : 'none' }}>
        <input
            type="checkbox"
            checked={event.completed}
            onChange={event.toggleCompletion}
        />
        {isEditing ? (
            <>
                <input
                    type="text"
                    value={editingText}
                    onChange={onTextChange}
                />
                <button onClick={onSave}>
                    <FontAwesomeIcon icon={faSave} />
                </button>
            </>
        ) : (
            <>
                {event.text}
                <div className="group-task">
                    <button onClick={onEdit}>
                        <FontAwesomeIcon icon={faEdit} />
                    </button>
                    <button onClick={onDelete}>
                        <FontAwesomeIcon icon={faTrash} />
                    </button>
                </div>
            </>
        )}
    </li>
);

export default Event;
