import React from 'react';

const Event = ({
    event,
    onEdit,
    onDelete,
    isEditing,
    onSave,
    editingText,
    onTextChange,
    onToggleCompletion,
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
                <input
                    style = {{ marginLeft: '5px'}}
                    type="checkbox"
                    checked={event.completed}
                    onChange={onToggleCompletion}
                />
                {isEditing ? (
                    <input
                        type="text"
                        value={editingText}
                        onChange={onTextChange}
                        onKeyDown={handleKeyDown}
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
                            textDecoration: event.completed ? 'line-through' : 'none',
                            wordWrap: 'break-word',
                            overflowWrap: 'break-word',
                            display: 'inline-block',
                            width: '80%',
                        }}
                    >
                        {event.text}
                    </span>
                )}
            </div>
            <button
                onClick={onDelete}
                style={{
                    backgroundColor: 'transparent',
                    border: 'none',
                    color: '#ff4d4d',
                    cursor: 'pointer',
                    fontSize: '18px',
                    marginLeft: 'auto',
                }}
                aria-label="Delete"
            >
                ×
            </button>
        </li>
    );
};

export default Event;