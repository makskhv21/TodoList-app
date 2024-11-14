import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faSave, faTrash, faStar } from '@fortawesome/free-solid-svg-icons';
import { faStar as faStarEmpty } from '@fortawesome/free-regular-svg-icons';
import "./Task"



function Task({ 
    task, 
    toggleTaskCompletion, 
    onEdit, 
    onDelete, 
    isEditing, 
    editingTaskText, 
    setEditingTaskText, 
    handleSaveEdit, 
    toggleImportant, 
    onClick 
}) {
    return (
        <div className="task-container" style={{ textDecoration: task.completed ? 'line-through' : 'none' }} onClick={onClick}>
            <input 
                className="input-check"
                type="checkbox"
                checked={task.completed} 
                onChange={() => toggleTaskCompletion(task.id)} 
            />
            {isEditing ? (
                <input
                    style={{ width: '65%', marginLeft: '5px', marginBottom: '8px', marginRight: '10px'}}
                    type="text"
                    value={editingTaskText}
                    onChange={(e) => setEditingTaskText(e.target.value)}
                />
            ) : (                
                <span onDoubleClick={onEdit} >
                    {task.text}
                </span>
            )}
            <div className="btn-container-task">
                <button onClick={() => toggleImportant(task.id)}>
                    <FontAwesomeIcon icon={task.important ? faStar : faStarEmpty} />
                </button>
                {isEditing ? (
                    <button onClick={handleSaveEdit}>
                        <FontAwesomeIcon icon={faSave} className='btn-task-icon' />
                    </button>
                ) : (
                    <button onClick={onEdit}>
                        <FontAwesomeIcon icon={faEdit} className='btn-task-icon'/> 
                    </button> 
                )}
                <button onClick={onDelete}>
                    <FontAwesomeIcon icon={faTrash} className='btn-task-icon' /> 
                </button>
            </div>
        </div>
    );
}

export default Task;