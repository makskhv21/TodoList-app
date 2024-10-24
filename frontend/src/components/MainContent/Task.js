import React from "react";

function Task({ task, toggleTaskCompletion, onEdit, onDelete, isEditing, editingTaskText, setEditingTaskText, handleSaveEdit }) {
    return(
        <div style={{ textDecoration: task.completed ? 'line-through' : 'none' }}>
            <input 
                type="checkbox"
                checked={task.completed} 
                onChange={() => toggleTaskCompletion(task.id)} 
            />
            {isEditing ? (
                <input
                    type="text"
                    value={editingTaskText}
                    onChange={(e) => setEditingTaskText(e.target.value)}
                    onBlur={handleSaveEdit}
                    onKeyDown={(e) => e.key === "Enter" && handleSaveEdit()}
                />
            ) : (
                <span onDoubleClick={onEdit}>
                    {task.text}
                </span>
            )}
            <button onClick={onDelete}>Delete</button>
        </div>
    )
};

export default Task;