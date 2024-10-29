import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faSave, faTrash } from '@fortawesome/free-solid-svg-icons'; 

function Task({ task, toggleTaskCompletion, onEdit, onDelete, isEditing, editingTaskText, setEditingTaskText, handleSaveEdit }) {
    return (
        <div className="task-container" 
            style={{ textDecoration: task.completed ? 'line-through' : 'none' }}>
            <input 
                className="input-check"
                type="checkbox"
                checked={task.completed} 
                onChange={() => toggleTaskCompletion(task.id)} 
            />
            {isEditing ? (
                <input
                    style={{ width: '85%', marginLeft: '15px', marginBottom: '13px'}}
                    type="text"
                    value={editingTaskText}
                    onChange={(e) => setEditingTaskText(e.target.value)}
                />
            ) : (
                <span onDoubleClick={onEdit}>
                    {task.text}
                </span>
            )}
            <div className="btn-conteiner-task">
                {isEditing ? (
                    <button onClick={handleSaveEdit}>
                        <FontAwesomeIcon icon={faSave} />
                    </button>
                ) : (
                    <button onClick={onEdit}>
                        <FontAwesomeIcon icon={faEdit} /> 
                    </button> 
                )}
                <button onClick={onDelete}>
                    <FontAwesomeIcon icon={faTrash} /> 
                </button>
            </div>
        </div>
    );
}

export default Task;
